// ─────────────────────────────────────────────────────────────
// PROJECTS — the one place projects live.
// The home page shows the first 3 (plus a faded 4th that links to
// projects.html); projects.html shows all of them. Order = priority.
//
// Each project:
//   title, date, text                     (required)
//   badge   – small pill next to the date (optional)
//   metrics – [["0.948", "AUC"], …]        (optional)
//   links   – [{ label, href, icon: "github" | "paper" | "link" }]   (optional)
//   tags    – ["Python", …]                (optional)
// ─────────────────────────────────────────────────────────────

window.PROJECTS = [
  {
    title: "GritML",
    date: "Apr 2026",
    badge: "Where my two worlds meet",
    text: "A multi-task ML system that predicts injury risk and training load on a 1,000-athlete wearable dataset, then runs on live Garmin, WHOOP, and Strava data. Baseline and deep-learning models are benchmarked with grouped cross-validation on a 24-feature, 337K-row pipeline.",
    metrics: [["0.948", "AUC"], ["0.988", "R²"], ["337K", "rows"]],
    links: [
      { label: "Read the paper", href: "https://github.com/wfquiroz/GritML/blob/main/docs/GritML_Paper.pdf", icon: "paper" },
      { label: "Code", href: "https://github.com/wfquiroz/GritML", icon: "github" },
    ],
    tags: ["Python", "PyTorch", "Scikit-Learn", "Pandas"],
  },
  {
    title: "Kalshi BTC Arbitrage",
    date: "Apr 2026",
    text: "Finds mispriced Kalshi Bitcoin contracts by comparing market prices to a Black-Scholes fair value, then uses Logistic Regression, Random Forest, and XGBoost on 23 features to predict which gaps actually pay off. Backtested out of sample, with a live Streamlit signal dashboard.",
    metrics: [["58.3%", "win rate"], ["3.81%", "avg profit / trade"]],
    links: [{ label: "Code", href: "https://github.com/wfquiroz/kalshi-btc-arbitrage", icon: "github" }],
    tags: ["Python", "XGBoost", "SciPy", "DuckDB"],
  },
  {
    title: "FlightStrain",
    date: "May 2026 · ASI Hackathon",
    text: "Eight AI agents on a shared event bus drive a 4D avoidance engine for in-flight risk. A Random Forest trained on 162K flights and 9 features scores risk across 11 scenarios in real time.",
    metrics: [["64%", "predicted fuel burn avoided"], ["8", "agents"]],
    links: [{ label: "Code", href: "https://github.com/wfquiroz/FlightStrain", icon: "github" }],
    tags: ["Python", "FastAPI", "Scikit-Learn", "Claude"],
  },
  {
    title: "Forex Relationships",
    date: "Jul 2024",
    text: "I stored 8M+ rows of forex data in AWS S3 and queried and cleaned it with Athena. Then I built neural networks, regression trees, and SHAP analyses to explain how each trading feature drives P&L.",
    metrics: [["98.3%", "accuracy"], ["8M+", "rows"]],
    tags: ["Python", "SQL", "AWS S3", "Athena"],
  },
];
