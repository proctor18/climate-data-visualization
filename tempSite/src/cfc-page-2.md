---
theme: dashboard
title: CFC 2
toc: false
---

```js
const ozoneData = FileAttachment("data/cfc_data.csv").csv()
```

<div class="card">${
  Plot.plot({
    title: "CFC-11 Levels in Northern and Southern Hemisphere",
    subtitle: "1979-2019",
    width,
    x: {
        label: "Year",
        type: "linear"
    },
    y: {
        label: "CFC Concentration (ppt)",
        type: "linear",
        domain: [0, 600] // Adjust based on min/max values in the dataset
    },
    marks: [
        Plot.ruleY([0]),
        // CFC 11 Northern Hemisphere (Light Blue)
        Plot.dot(ozoneData, {
          x: "YEAR",
          y: "CFC11_NH",
          stroke: "#4a90e2",
          fill: "#4a90e2",
          tip: true,
        }),
        // CFC 11 Southern Hemisphere (Light Red/Coral)
        Plot.dot(ozoneData, {
          x: "YEAR",
          y: "CFC11_SH",
          stroke: "#9b59b6",
          fill: "#9b59b6",
          tip: true,
        }),
        // CFC 12 Northern Hemisphere (Light Blue)
        Plot.dot(ozoneData, {
          x: "YEAR",
          y: "CFC12_NH",
          stroke: "#50b8482",
          fill: "#50b848",
          tip: true,
        }),
        // CFC 12 Southern Hemisphere (Light Red/Coral)
        Plot.dot(ozoneData, {
          x: "YEAR",
          y: "CFC12_SH",
          stroke: "#ffcc00",
          fill: "#ffcc00",
          tip: true,
        }),
        // CFC 113 Northern Hemisphere (Light Blue)
        Plot.dot(ozoneData, {
          x: "YEAR",
          y: "CFC113_NH",
          stroke: "#f07a59",
          fill: "#f07a59",
          tip: true,
        }),
        // CFC 113 Southern Hemisphere (Light Red/Coral)
        Plot.dot(ozoneData, {
          x: "YEAR",
          y: "CFC113_SH",
          stroke: " #f62626",
          fill: "#f62626",
          tip: true,
        }),
    ]
})
}</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
  <div style="width: 15px; height: 15px; background-color: #4a90e2;"></div> CFC-11 NH
  <div style="width: 15px; height: 15px; background-color: #9b59b6;"></div> CFC-11 SH
  <div style="width: 15px; height: 15px; background-color: #50b848;"></div> CFC-12 NH
  <div style="width: 15px; height: 15px; background-color: #ffcc00;"></div> CFC-12 SH
  <div style="width: 15px; height: 15px; background-color:#f07a59;"></div> CFC-113 NH
  <div style="width: 15px; height: 15px; background-color:#f62626;"></div> CFC-113 SH
</div>

