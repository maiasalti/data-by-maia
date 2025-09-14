const fs = require('fs');
const csv = require('csv-parser');
const Papa = require('papaparse');
const path = require('path');

function readSmallCSV(filePath) {
  console.log(`Reading small file: ${filePath}`);
  const csvFile = fs.readFileSync(filePath, 'utf8');
  return Papa.parse(csvFile, { 
    header: true, 
    dynamicTyping: true,
    skipEmptyLines: true 
  }).data;
}

function streamLargeCSV(filePath, maxRows = 100000) {
  return new Promise((resolve, reject) => {
    const results = [];
    let rowCount = 0;
    
    console.log(`Streaming large file: ${filePath}, max rows: ${maxRows}`);
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const year = new Date(data.date).getFullYear();
        if (year >= 2022 && year <= 2024 && rowCount < maxRows) {
          results.push(data);
          rowCount++;
          
          if (rowCount % 10000 === 0) {
            console.log(`Processed ${rowCount} rows...`);
          }
        }
      })
      .on('end', () => {
        console.log(`Finished streaming. Collected ${results.length} rows from 2022-2024`);
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

async function analyzeSpotifyData() {
  console.log('Starting Spotify seasonal analysis...');
  
  try {
    console.log('Loading chart data (streaming)...');
    const chartData = await streamLargeCSV(
      path.join(__dirname, '../data/spotify-seasonal/charts.csv'), 
      100000
    );
    
    console.log('Loading track features...');
    const trackFeatures = readSmallCSV(
      path.join(__dirname, '../data/spotify-seasonal/dataset.csv')
    );
    
    console.log(`Chart data loaded: ${chartData.length} rows`);
    console.log(`Track features loaded: ${trackFeatures.length} rows`);
    
    const cleanedChartData = chartData
      .filter(row => row.date && row.country && row.track_id)
      .map(row => {
        const date = new Date(row.date);
        return {
          ...row,
          date: date,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          season: getSeason(date.getMonth() + 1)
        };
      });

    console.log(`Cleaned chart data: ${cleanedChartData.length} rows`);

    console.log('Creating track features lookup using track_id...');
    const featuresLookup = {};
    trackFeatures.forEach((track, index) => {
      if (track.track_id) {
        featuresLookup[track.track_id] = track;
      }
      
      if (index < 3) {
        console.log(`Track ${index}: id="${track.track_id}", name="${track.track_name}"`);
      }
    });

    console.log(`Features lookup created: ${Object.keys(featuresLookup).length} tracks`);

    console.log('Joining datasets using track_id...');
    const joinedData = cleanedChartData
      .map(row => ({
        ...row,
        features: featuresLookup[row.track_id]
      }))
      .filter(row => row.features && row.features.valence !== undefined);

    console.log(`Joined data: ${joinedData.length} rows`);
    console.log(`Match rate: ${(joinedData.length / cleanedChartData.length * 100).toFixed(1)}%`);

    if (joinedData.length === 0) {
      console.log('No matching data found. Check track_id alignment.');
      return;
    }

    const seasonalCountries = ['us', 'gb', 'se', 'de', 'ca', 'fr', 'nl', 'no', 'pl', 'ch', 'dk', 'fi'];
    const nonSeasonalCountries = ['sg', 'br', 'ph', 'th', 'my', 'id', 'mx', 've', 'co'];

    const seasonalData = joinedData.filter(row => seasonalCountries.includes(row.country));
    const nonSeasonalData = joinedData.filter(row => nonSeasonalCountries.includes(row.country));

    console.log(`Seasonal countries data: ${seasonalData.length} rows`);
    console.log(`Non-seasonal countries data: ${nonSeasonalData.length} rows`);

    console.log('Calculating seasonal averages...');
    const seasonalAnalysis = calculateSeasonalAverages(seasonalData);
    const nonSeasonalAnalysis = calculateSeasonalAverages(nonSeasonalData);
    
    // monthly trends
    const monthlyTrends = calculateMonthlyTrends(seasonalData, nonSeasonalData);

    const results = {
      seasonal: seasonalAnalysis,
      nonSeasonal: nonSeasonalAnalysis,
      monthlyTrends: monthlyTrends,
      summary: {
        totalTracks: joinedData.length,
        seasonalTracks: seasonalData.length,
        nonSeasonalTracks: nonSeasonalData.length,
        matchRate: (joinedData.length / cleanedChartData.length * 100).toFixed(1),
        seasonalCountries: seasonalCountries,
        nonSeasonalCountries: nonSeasonalCountries,
        dateRange: '2022-2024'
      }
    };

    const outputPath = path.join(__dirname, '../data/spotify-seasonal/analysis_results.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    console.log('Analysis complete!');
    console.log(`Results saved to: ${outputPath}`);
    
    if (Object.keys(seasonalAnalysis).length > 0 && Object.keys(nonSeasonalAnalysis).length > 0) {
      console.log('Quick Summary:');
      console.log(`- Seasonal countries average valence: ${Object.values(seasonalAnalysis).reduce((sum, season) => sum + season.valence, 0) / Object.keys(seasonalAnalysis).length}`);
      console.log(`- Non-seasonal countries average valence: ${Object.values(nonSeasonalAnalysis).reduce((sum, season) => sum + season.valence, 0) / Object.keys(nonSeasonalAnalysis).length}`);
    }
    
    return results;
  } catch (error) {
    console.error('Error during analysis:', error);
    throw error;
  }
}

function getSeason(month) {
  if (month >= 12 || month <= 2) return 'Winter';
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  return 'Fall';
}

function calculateSeasonalAverages(data) {
  const grouped = data.reduce((acc, row) => {
    if (!acc[row.season]) acc[row.season] = [];
    acc[row.season].push(row.features);
    return acc;
  }, {});

  const averages = {};
  Object.keys(grouped).forEach(season => {
    const tracks = grouped[season];
    averages[season] = {
      valence: average(tracks, 'valence'),
      energy: average(tracks, 'energy'),
      danceability: average(tracks, 'danceability'),
      acousticness: average(tracks, 'acousticness'),
      count: tracks.length
    };
  });

  return averages;
}

function calculateMonthlyTrends(seasonalData, nonSeasonalData) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const seasonalByMonth = groupByMonth(seasonalData);
  const nonSeasonalByMonth = groupByMonth(nonSeasonalData);
  
  return months.map((month, index) => ({
    month,
    seasonal: seasonalByMonth[index + 1] ? average(seasonalByMonth[index + 1], 'valence') : 0,
    nonSeasonal: nonSeasonalByMonth[index + 1] ? average(nonSeasonalByMonth[index + 1], 'valence') : 0
  }));
}

function groupByMonth(data) {
  return data.reduce((acc, row) => {
    if (!acc[row.month]) acc[row.month] = [];
    acc[row.month].push(row.features);
    return acc;
  }, {});
}

function average(array, property) {
  const values = array.map(item => item[property]).filter(val => typeof val === 'number' && !isNaN(val));
  return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

if (require.main === module) {
  analyzeSpotifyData().catch(console.error);
}

module.exports = { analyzeSpotifyData };