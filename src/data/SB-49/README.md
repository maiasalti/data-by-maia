# Super Bowl XLIX: Should The Seahawks Have Run The Ball?

A statistical analysis of Pete Carroll's controversial decision to pass the ball on the 1-yard line in Super Bowl XLIX, examining whether the criticism was warranted or the result of outcome bias.

## Overview

This project analyzes play-by-play data from the 2015-2024 NFL seasons to evaluate goal-to-go plays from the 1-yard line, comparing run versus pass success rates, turnover risks, and expected points added (EPA).

## Key Findings

- **Run plays (n=2,801):** 55.69% TD rate, 0.0% interception rate, 1.36% fumble rate, 1.36% turnover rate, +0.035 avg EPA
- **Pass plays (n=1,122):** 49.47% TD rate, 1.43% interception rate, 0.36% fumble rate, 1.78% turnover rate, -0.055 avg EPA
- **Win probability analysis:** Pass first (87.67%) vs Run first (87.69%) - statistically negligible difference
- **Conclusion:** Pete Carroll's decision was statistically sound given the timeout situation, despite the outcome

## Data Source

Play-by-play data from **nflfastR** covering:
- Seasons: 2015-2024
- Total plays analyzed: 3,923 (2,801 runs, 1,122 passes)
- Filters: Goal-to-go situations from the 1-yard line (all timeout situations included)

## Methodology

### Data Collection

```python
import pandas as pd
import nfl_data_py as nfl

# Import play-by-play data for 2015-2024
pbp = nfl.import_pbp_data(list(range(2015, 2025)), downcast=False)

# Filter for 1-yard goal-to-go plays
df = pbp[
    (pbp["goal_to_go"] == 1) &
    (pbp["yardline_100"] == 1) &
    ((pbp["rush"] == 1) | (pbp["pass"] == 1))
].copy()

# Classify play type
df["type"] = df["rush"].map({1: "run"}).fillna(df["pass"].map({1: "pass"}))

# Calculate outcomes
df["td"] = (df["touchdown"] == 1).astype(int)
df["turnover"] = ((df["interception"] == 1) | (df["fumble_lost"] == 1)).astype(int)

# Generate summary statistics
summary = (
    df.groupby("type")
    .agg(
        n=("type", "size"),
        td_rate=("td", lambda x: 100 * x.mean()),
        int_rate=("interception", lambda x: 100 * x.mean(skipna=True)),
        fumble_rate=("fumble_lost", lambda x: 100 * x.mean(skipna=True)),
        turnover_rate=("turnover", lambda x: 100 * x.mean(skipna=True)),
        avg_epa=("epa", "mean")
    )
    .reset_index()
)
```

### Analysis Dimensions

1. **Touchdown Success Rates:** Percentage of plays resulting in touchdowns
2. **Interception Risk:** Unique to passing plays (1.43% for passes, 0% for runs)
3. **Fumble Risk:** Present in both play types (0.54% passes, 1.36% runs)
4. **Total Turnover Risk:** Combined interception and fumble rates
5. **Expected Points Added (EPA):** Average point value added per play

### Probability Analysis

The analysis includes two scenarios based on the actual game situation (26 seconds, 1 timeout, 2nd down):

**Scenario A: Pass on 2nd down**
- Immediate TD: 49.47%
- Incomplete → Run → Timeout → Pass
- Total win probability: 87.67%

**Scenario B: Run on 2nd down**
- Immediate TD: 55.69%
- Fail → Timeout → Pass → Pass
- Total win probability: 87.69%

## Visualizations

The article includes interactive charts built with Recharts:
- **TouchdownRateChart:** Compares TD success rates
- **InterceptionRateChart:** Highlights the 0% vs 1.43% interception risk
- **FumbleRateChart:** Shows fumble rate comparison
- **TurnoverRateChart:** Total turnover risk analysis
- **EPAChart:** Expected points added comparison

## Files

- `one_yard_analysis.py` - Data collection and analysis script
- `one_yard_goal_timeout_ge1_plays.csv` - Raw filtered play data
- `one_yard_goal_timeout_ge1_summary.csv` - Summary statistics by play type
- `SuperBowl49Charts.js` - React visualization components

## Key Insights

1. **Raw statistics favor running:** Higher TD rate (55.69% vs 49.47%) and lower turnover risk
2. **Context matters:** Timeout management and play sequencing create strategic considerations
3. **Outcome bias:** The 1.43% interception risk materialized, but the decision had an 87.67% success probability
4. **Defensive alignment:** Bill Belichick's unique goal-line defense may have made running less effective than statistics suggest

## Limitations

- Analysis uses aggregate 10-year data across all timeout situations, not specific to plays with 1 timeout remaining
- Does not account for specific team matchups (Seahawks vs Patriots)
- Does not account for specific formations, personnel, or defensive schemes
- Assumes league-average performance across all teams and situations
- Win probability calculations apply league-wide success rates to the specific Super Bowl XLIX scenario

## References

- nflfastR play-by-play data: https://github.com/nflverse/nflfastR-data
- Geoff Schwartz defensive analysis: https://www.sbnation.com/nfl/2018/6/5/17426540/seahawks-patriots-super-bowl-49-malcolm-butler-interception-run-the-dang-ball

## Technologies

- **Data Collection:** Python, nfl_data_py, pandas
- **Visualization:** React, Recharts
- **Article Format:** MDX (Markdown + JSX)

## Author

Maia Salti

## License

Data sourced from nflfastR under open license. Analysis and visualizations are original work.