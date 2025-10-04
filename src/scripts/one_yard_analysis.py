# one_yard_analysis.py

import pandas as pd
import nfl_data_py as nfl

# 2015-2024
pbp = nfl.import_pbp_data(list(range(2015, 2025)), downcast=False)

df = pbp[
    (pbp["goal_to_go"] == 1) &
    (pbp["yardline_100"] == 1) &
    ((pbp["rush"] == 1) | (pbp["pass"] == 1))
].copy()

df["type"] = df["rush"].map({1: "run"}).fillna(df["pass"].map({1: "pass"}))

# tds + turnovers
df["td"] = (df["touchdown"] == 1).astype(int)
df["turnover"] = ((df["interception"] == 1) | (df["fumble_lost"] == 1)).astype(int)

# results by play type
summary = (
    df.groupby("type")
      .agg(
          n=("type","size"),
          td_rate=("td", lambda x: 100 * x.mean()),
          int_rate=("interception", lambda x: 100 * x.mean(skipna=True)),
          fumble_rate=("fumble_lost", lambda x: 100 * x.mean(skipna=True)),
          turnover_rate=("turnover", lambda x: 100 * x.mean(skipna=True)),
          avg_epa=("epa","mean")
      )
      .reset_index()
)

df.to_csv("one_yard_goal_timeout_ge1_plays.csv", index=False)
summary.to_csv("one_yard_goal_timeout_ge1_summary.csv", index=False)

print(summary)
