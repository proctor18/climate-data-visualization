---
theme: dashboard
title: Global Temperature Anomalies
toc: false
---

<link rel="stylesheet" href="css/styles.css">

```js
const co2 = FileAttachment("data/CO2_monthly_mean_data.csv").csv()
const anom = FileAttachment("data/GlobalAvgTempAnom.csv").csv()
```

<div class="hero">
  <h1>Global Temperature Anomalies</h1>
</div>


<div class="card">${
Plot.plot({
    title: "Global Temperature Anomalies",
    width,
    x: {
        type: "linear"
    },
    y: {
        grid: true,
        label: "Surface temperature anomaly (°C)",
        tickFormat: "+C",
        type: "linear"
    },
    color: {
        scheme: "BuRd"
    },
    marks: [
        Plot.ruleY([0]),
        Plot.dot(anom, {
            x: "Year", 
            y: "Anomaly", 
            stroke: "Anomaly", 
            tip: true,
            channels: { Year: "Year"},
            title: (d) => "Date: ${d.Year} \nTemp Anomaly: ${d.Anomaly}"
        })
    ]
})
}</div>

<br>
--------------------
<br><br>

<div>
    <h2>Global Temperature Anomalies</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 70px;
  }
}

</style>
