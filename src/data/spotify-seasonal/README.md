# Spotify Seasonal Music Analysis

This project analyzes how musical preferences vary seasonally between countries with distinct seasons versus tropical countries.

## Dataset Sources

This analysis combines two Kaggle datasets:

1. **Spotify Chart Data** - [https://www.kaggle.com/datasets/jfreyberg/spotify-chart-data](https://www.kaggle.com/datasets/jfreyberg/spotify-chart-data)
   - Contains Spotify chart rankings by country and date
   - Used to track which songs are popular when and where

2. **Spotify Tracks Dataset** - [https://www.kaggle.com/datasets/maharshipandya/-spotify-tracks-dataset](https://www.kaggle.com/datasets/maharshipandya/-spotify-tracks-dataset)
   - Contains audio features for tracks (valence, energy, danceability, acousticness, etc.)
   - Used to analyze the musical characteristics of popular songs

## Analysis Overview

The project examines whether countries with distinct seasons show different musical preferences throughout the year compared to tropical countries. Key metrics analyzed include:

- **Valence**: Musical happiness/positivity
- **Energy**: Intensity and power of tracks
- **Danceability**: How suitable tracks are for dancing
- **Acousticness**: Whether tracks are acoustic

## Countries Analyzed

**Seasonal Countries**: US, UK, Sweden, Germany, Canada, France, Netherlands, Norway, Poland, Switzerland, Denmark, Finland

**Tropical Countries**: Singapore, Brazil, Philippines, Thailand, Malaysia, Indonesia, Mexico, Venezuela, Colombia

## Files

- `analyze-spotify-seasonal-data.js` - Main analysis script
- `charts.csv` - Spotify chart data
- `dataset.csv` - Track audio features
- Results visualization components for seasonal patterns

## Key Findings

The analysis reveals interesting patterns in how musical preferences shift with seasons, particularly showing differences in valence (musical happiness) between winter and spring months in seasonal countries versus more stable patterns in tropical regions.