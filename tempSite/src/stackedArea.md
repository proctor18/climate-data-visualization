---
theme: dashboard
title: Electricity Production Stacked Area 
toc: false
---

<link rel="stylesheet" href="css/styles.css">

<!-- Navbar HTML Structure -->
<div class="navbar">
    <!-- Left-side navbar content (empty for now) -->
    <div class="logo"><a href="index"><img src="climateDataLogo.png" style="width: 50px;" alt="Logo"></a></div>
    <div>
        <a href="extremeWeather">Extreme Weather</a>
        <a href="mainMap">Surface Temperature</a>
        <a href="ozone">Ozone Layer</a>
        <a href="stackedArea">Energy Sources</a>
        <a href="otherVisualizations">Other Visualizations</a>
        <a href="action" id="action">Take Action</a>
    </div>
</div>

<div class="visualization-container" style="padding: 2% 10% 0px;">
<h2>Renewable and Non-Renewable Energy Sources</h2>
<div id="layout-container" style="display: flex; align-items: flex-start;">
  <div id="production-container" style="flex-grow: 1;"></div>
  <div id="button-container" style="margin-right: 20px;">
    <img src="imgs/energyProductionLegend.svg" alt="Legend" style="width: 180px;">
    <br>
    <h2>Continent</h2>
    <div id="toggle-button-container"><button class="continentButton" id="worldDataButton"></button><p>World Data</p></div>
    <div id="toggle-button-container"><button class="continentButton" id="asDataButton"></button><p>Asia</p></div>
    <div id="toggle-button-container"><button class="continentButton" id="afDataButton"></button><p>Africa</p></div>
    <div id="toggle-button-container"><button class="continentButton" id="naDataButton"></button><p>North America</p></div>
    <div id="toggle-button-container"><button class="continentButton" id="saDataButton"></button><p>South America</p></div>
    <div id="toggle-button-container"><button class="continentButton" id="euDataButton"></button><p>Europe</p></div>
    <div id="toggle-button-container"><button class="continentButton" id="ocDataButton"></button><p>Oceania</p></div>

  </div>
</div>

<div style="display: none;">
  <input type="checkbox" id="toggleStaticAxisButton" name="toggleAxis"/>
  <label for="toggleStaticAxisButton">Toggle Static Axis</label>
</div>

<div id="data-table-container" style="display: none;">
  <table id="data-table">
    <thead>
      <tr>
        <th>Source</th>
        <th>Production (TWh)</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>
</div>

<br>
<div class="two-column">
    <div>
    <h2>What else can be done to slow climate change?</h2>
    <br>
    <p>
      To further combat climate change, additional actions must be taken at both individual and systemic levels. One crucial step is accelerating the transition to renewable energy by investing in wind, solar, and hydroelectric power. Governments and businesses can work together to expand clean energy infrastructure, phase out coal plants, and improve energy storage technologies to ensure a reliable, sustainable power supply.<br><br>
          Improving energy efficiency in homes, buildings, and transportation can also make a significant difference. Encouraging the use of LED lighting, better insulation, and energy-efficient appliances reduces electricity consumption. Additionally, expanding public transportation, promoting cycling and walking, and increasing the adoption of electric vehicles can cut emissions from one of the largest contributing sectors—transportation.<br><br>
          Another major area of focus is sustainable agriculture and food systems. Shifting toward plant-based diets, reducing food waste, and supporting regenerative farming practices can significantly lower greenhouse gas emissions from agriculture. Practices such as crop rotation, agroforestry, and organic farming help improve soil health and increase carbon sequestration, while reducing the need for synthetic fertilizers and pesticides that contribute to emissions.<br><br>
    </p>
    </div>
    <div>
    <h2><br></h2>
    <br>
    <p>
      Corporate responsibility and sustainable business practices must also play a larger role in climate action. Companies can commit to carbon neutrality, invest in sustainable supply chains, and reduce plastic waste. Consumers can support businesses that prioritize environmental responsibility by choosing eco-friendly products and services. Additionally, banks and financial institutions can contribute by divesting from fossil fuel projects and redirecting investments toward green initiatives.<br><br>
      On a governmental level, stronger climate policies and international cooperation are essential. Stricter emission regulations, incentives for green technology, and global agreements like the Paris Agreement must be reinforced and expanded. Local governments can also lead by implementing climate-conscious urban planning, creating green spaces, and designing cities with sustainability in mind.<br><br>
      Lastly, individual action and advocacy play a crucial role. People can reduce their carbon footprints by conserving energy, supporting sustainable brands, and participating in climate activism. Raising awareness and holding policymakers accountable can drive systemic change and push for stronger climate policies.<br><br>
      By combining innovation, policy, and everyday actions, we can make significant progress in slowing climate change and protecting the planet for future generations.
    </p>
    <div>
</div>


```js
const worldData = await FileAttachment("data/electricity-prod-source-stacked.csv").text();
const afData = await FileAttachment("data/shareElecBySourceAF.csv").text();
const asData = await FileAttachment("data/shareElecBySourceAS.csv").text();
const euData = await FileAttachment("data/shareElecBySourceEU.csv").text();
const naData = await FileAttachment("data/shareElecBySourceNA.csv").text();
const saData = await FileAttachment("data/shareElecBySourceSA.csv").text();
const ocData = await FileAttachment("data/shareElecBySourceOC.csv").text();

const totalElec = d3.csvParse(worldData, d3.autoType);
const afElec = d3.csvParse(afData, d3.autoType);
const asElec = d3.csvParse(asData, d3.autoType);
const euElec = d3.csvParse(euData, d3.autoType);
const naElec = d3.csvParse(naData, d3.autoType);
const saElec = d3.csvParse(saData, d3.autoType);
const ocElec = d3.csvParse(ocData, d3.autoType);

const keyMapping = {
  "Electricity from coal - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Coal",
  "Electricity from gas - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Gas",
  "Electricity from hydro - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Hydro",
  "Electricity from solar - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Solar",
  "Electricity from wind - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Wind",
  "Electricity from oil - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Oil",
  "Electricity from nuclear - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Nuclear",
  "Other renewables excluding bioenergy - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Other Renewables",
  "Electricity from bioenergy - TWh (adapted for visualization of chart electricity-prod-source-stacked)": "Bioenergy"
};

const continentKeyMapping = {
  "Other.renewables.excluding.bioenergy...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Other Renewables",
  "Electricity.from.bioenergy...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Bioenergy",
  "Electricity.from.solar...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Solar",
  "Electricity.from.wind...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Wind",
  "Electricity.from.hydro...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Hydro",
  "Electricity.from.nuclear...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Nuclear",
  "Electricity.from.oil...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Oil",
  "Electricity.from.gas...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Gas",
  "Electricity.from.coal...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.": "Coal"
};

  
const colorMapping = {
  "Other Renewables": "#fff",
  "Bioenergy": "#C4F86F",
  "Solar": "#F7CD1B",
  "Wind": "#FF63E3",
  "Hydro": "#46C6B8",
  "Nuclear": "#C69D63",
  "Oil": "#9E9D9D",
  "Gas": "#C68982",
  "Coal": "#7280B2"
};

function renderTotalAreaPlot(elec) {
  const areaContainer = document.getElementById("production-container");
  
  // Clear the container to avoid overlapping elements
  areaContainer.innerHTML = "";

  // Dynamically calculate dimensions
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const width = areaContainer.clientWidth - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select(areaContainer)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
    .domain(staticAxis && globalXDomain ? globalXDomain : [
      d3.min(elec, d => new Date(d.Year, 0, 1)),
      d3.max(elec, d => new Date(d.Year, 11, 31))
    ])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain(staticAxis && globalYDomain ? globalYDomain : [
      0,
      d3.max(elec, d => d3.sum(Object.values(d).slice(1)))
    ])
    .range([height, 0]);

  const color = d => colorMapping[keyMapping[d]] || "#000000";

  const stack = d3.stack()
    .keys(Object.keys(keyMapping))
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  const area = d3.area()
    .x(d => x(new Date(d.data.Year, 0, 1)))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]));

  const layers = stack(elec);

  svg.selectAll(".layer")
    .data(layers)
    .enter().append("path")
    .attr("class", "layer")
    .attr("d", area)
    .style("fill", d => color(d.key))
    .style("stroke", d => color(d.key))
    .style("stroke-width", 2)
    .style("fill-opacity", 0.5)
    .on("mouseover", function(event, d) {
      d3.select(this).style("fill-opacity", 0.9);
      const year = Math.min(Math.max(Math.round(x.invert(d3.pointer(event, this)[0]).getFullYear()), d3.min(elec, d => d.Year)), d3.max(elec, d => d.Year));
      showTooltip(event, d, year);
      updateHoverLine(year);
    })
    .on("mousemove", function(event, d) {
      const year = Math.min(Math.max(Math.round(x.invert(d3.pointer(event, this)[0]).getFullYear()), d3.min(elec, d => d.Year)), d3.max(elec, d => d.Year));
      moveTooltip(event, d, year);
      updateHoverLine(year);
    })
    .on("mouseout", function(event, d) {
      d3.select(this).style("fill-opacity", 0.5);
      hideTooltip();
      hideHoverLine();
    })
    .on("click", function(event, d) {
      const year = Math.min(Math.max(Math.round(x.invert(d3.pointer(event, this)[0]).getFullYear()), d3.min(elec, d => d.Year)), d3.max(elec, d => d.Year));
      updateTable(year);
      updateClickLine(year);
    });

  // Add x-axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(d3.timeYear.every(10)).tickFormat(d3.timeFormat("%Y")));
  
  // Add x-axis label
  svg.append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 5)
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .text("Year");
  
  // Add y-axis
  svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format(".2s")));
  
  // Add y-axis label
  svg.append("text")
    .attr("class", "y-axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90)`)
    .attr("x", -height / 2)
    .attr("y", -margin.left + 15)
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .text("Electricity Production (TWh)"); // Replace with your desired label text

  // Add hover line
  const hoverLine = svg.append("line")
    .attr("class", "hover-line")
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4")
    .style("display", "none");

  // Add click line
  const clickLine = svg.append("line")
    .attr("class", "click-line")
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "grey")
    .attr("stroke-width", 3)
    .style("display", "none");

  // Tooltip functions
  function showTooltip(event, d, year) {
    const tooltip = d3.select("#tooltip");
    const layerData = d.find(layer => layer.data.Year === year);
    const value = layerData ? layerData[1] - layerData[0] : 0;
    const source = keyMapping[d.key] || d.key;
    tooltip
      .style("display", "block")
      .style("background-color", "black")
      .style("border", "1px solid white")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("color", color(d.key))
      .style("text-align", "center")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("font-size", "16px")
      .html(`${year}<br>${source}<br>${value.toFixed(2)} TWh`);
  }

  function moveTooltip(event, d, year) {
    const tooltip = d3.select("#tooltip");
    tooltip
      .style("left", `${event.pageX - 50}px`)
      .style("top", `${event.pageY - 100}px`);
  }

  function hideTooltip() {
    const tooltip = d3.select("#tooltip");
    tooltip.style("display", "none");
  }

  // Update hover line function
  function updateHoverLine(year) {
    hoverLine.attr("x1", x(new Date(year, 0, 1)))
      .attr("x2", x(new Date(year, 0, 1)))
      .style("display", "block");
  }

  function hideHoverLine() {
    hoverLine.style("display", "none");
  }

  // Update click line function
  function updateClickLine(year) {
    clickLine.attr("x1", x(new Date(year, 0, 1)))
      .attr("x2", x(new Date(year, 0, 1)))
      .style("display", "block");
  }

  // Update table function
  function updateTable(year) {
    const tableBody = d3.select("#data-table tbody");
    tableBody.html("");
    
    const filteredData = elec.filter(d => d.Year === year);
    filteredData.forEach(d => {
      Object.keys(d).forEach(key => {
        if (key !== "Year" && key !== "Entity" && key !== "Code") {
          tableBody.append("tr")
            .html(`<td>${keyMapping[key] || key}</td><td>${d[key]}</td>`);
        }
      });
    });
  }
}

// Add a resize event listener
window.addEventListener("resize", () => renderTotalAreaPlot(totalElec));


function renderContinentAreaPlot(elec) {
  const areaContainer = document.getElementById("production-container");
  areaContainer.innerHTML = "";
  
  // Clear the container to avoid overlapping elements
  areaContainer.innerHTML = "";

  // Dynamically calculate dimensions
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const width = areaContainer.clientWidth - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select(areaContainer)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
    .domain(staticAxis && globalXDomain ? globalXDomain : [
      d3.min(elec, d => new Date(d.Year, 0, 1)),
      d3.max(elec, d => new Date(d.Year, 11, 31))
    ])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain(staticAxis && globalYDomain ? globalYDomain : [
      0,
      d3.max(elec, d => d3.sum(Object.values(d).slice(4))) // Adjusted for continent data
    ])
    .range([height, 0]);
  
  const color = d => colorMapping[continentKeyMapping[d]] || "#000000";

  const keys = Object.keys(continentKeyMapping);

  const stack = d3.stack()
    .keys(keys)
    .order(series => d3.range(series.length).reverse())
    .offset(d3.stackOffsetNone);

  const area = d3.area()
    .x(d => x(new Date(d.data.Year, 0, 1)))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]));

  const layers = stack(elec);

  // Add the layers
  svg.selectAll(".layer")
    .data(layers)
    .enter().append("path")
    .attr("class", "layer")
    .attr("d", area)
    .style("fill", d => color(d.key))
    .style("stroke", d => color(d.key))
    .style("stroke-width", 2)
    .style("fill-opacity", 0.5)
    .on("mouseover", function(event, d) {
      d3.select(this).style("fill-opacity", 0.9);
      const year = Math.min(Math.max(Math.round(x.invert(d3.pointer(event, this)[0]).getFullYear()), d3.min(elec, d => d.Year)), d3.max(elec, d => d.Year));
      showTooltip(event, d, year);
      updateHoverLine(year);
    })
    .on("mousemove", function(event, d) {
      const year = Math.min(Math.max(Math.round(x.invert(d3.pointer(event, this)[0]).getFullYear()), d3.min(elec, d => d.Year)), d3.max(elec, d => d.Year));
      moveTooltip(event, d, year);
      updateHoverLine(year);
    })
    .on("mouseout", function(event, d) {
      d3.select(this).style("fill-opacity", 0.5);
      hideTooltip();
      hideHoverLine();
    })
    .on("click", function(event, d) {
      const year = Math.min(Math.max(Math.round(x.invert(d3.pointer(event, this)[0]).getFullYear()), d3.min(elec, d => d.Year)), d3.max(elec, d => d.Year));
      updateTable(year);
      updateClickLine(year);
    });

  // Add x-axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(d3.timeYear.every(10)).tickFormat(d3.timeFormat("%Y")));
  
  // Add x-axis label
  svg.append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 5)
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .text("Year");
  
  // Add y-axis
  svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format(".2s")));
  
  // Add y-axis label
  svg.append("text")
    .attr("class", "y-axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90)`)
    .attr("x", -height / 2)
    .attr("y", -margin.left + 15)
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .text("Electricity Production (TWh)"); // Replace with your desired label text

  // Add hover line
  const hoverLine = svg.append("line")
    .attr("class", "hover-line")
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4")
    .style("display", "none");

  // Add click line
  const clickLine = svg.append("line")
    .attr("class", "click-line")
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "grey")
    .attr("stroke-width", 3)
    .style("display", "none");

  // Tooltip functions
  function showTooltip(event, d, year) {
    const tooltip = d3.select("#tooltip");
    const layerData = d.find(layer => layer.data.Year === year);
    const value = layerData ? layerData[1] - layerData[0] : 0;
    const source = continentKeyMapping[d.key] || d.key; // Use shorthand names
    tooltip
      .style("display", "block")
      .style("background-color", "black")
      .style("border", "1px solid white")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("color", color(d.key))
      .style("text-align", "center")
      .style("padding", "5px")
      .style("font-size", "16px")
      .html(`${year}<br>${source}<br>${value.toFixed(2)} TWh`);
  }

  function moveTooltip(event, d, year) {
    const tooltip = d3.select("#tooltip");
    tooltip
      .style("left", `${event.pageX - 50}px`)
      .style("top", `${event.pageY - 100}px`);
  }

  function hideTooltip() {
    const tooltip = d3.select("#tooltip");
    tooltip.style("display", "none");
  }

  // Update hover line function
  function updateHoverLine(year) {
    hoverLine.attr("x1", x(new Date(year, 0, 1)))
      .attr("x2", x(new Date(year, 0, 1)))
      .style("display", "block");
  }

  function hideHoverLine() {
    hoverLine.style("display", "none");
  }

  // Update click line function
  function updateClickLine(year) {
    clickLine.attr("x1", x(new Date(year, 0, 1)))
      .attr("x2", x(new Date(year, 0, 1)))
      .style("display", "block");
  }

  // Update table function
  function updateTable(year) {
    const tableBody = d3.select("#data-table tbody");
    tableBody.html(""); // Clear existing content

    const filteredData = elec.filter(d => d.Year === year);
    filteredData.forEach(d => {
      keys.forEach(key => {
        tableBody.append("tr")
          .html(`<td>${continentKeyMapping[key] || key}</td><td>${d[key]}</td>`); // Use shorthand names
      });
    });
  }
}

// Global variable to track the currently active dataset
let currentDataset = "world"; // Default to "world"

// Add event listeners to buttons
document.getElementById("worldDataButton").addEventListener("click", () => {
  currentDataset = "world"; // Update the active dataset
  renderTotalAreaPlot(totalElec);
});
document.getElementById("afDataButton").addEventListener("click", () => {
  currentDataset = "africa"; // Update the active dataset
  renderContinentAreaPlot(afElec);
});
document.getElementById("asDataButton").addEventListener("click", () => {
  currentDataset = "asia"; // Update the active dataset
  renderContinentAreaPlot(asElec);
});
document.getElementById("euDataButton").addEventListener("click", () => {
  currentDataset = "europe"; // Update the active dataset
  renderContinentAreaPlot(euElec);
});
document.getElementById("naDataButton").addEventListener("click", () => {
  currentDataset = "northAmerica"; // Update the active dataset
  renderContinentAreaPlot(naElec);
});
document.getElementById("ocDataButton").addEventListener("click", () => {
  currentDataset = "oceania"; // Update the active dataset
  renderContinentAreaPlot(ocElec);
});
document.getElementById("saDataButton").addEventListener("click", () => {
  currentDataset = "southAmerica"; // Update the active dataset
  renderContinentAreaPlot(saElec);
});

// Update the resize event listener
window.addEventListener("resize", () => {
  switch (currentDataset) {
    case "world":
      renderTotalAreaPlot(totalElec);
      break;
    case "africa":
      renderContinentAreaPlot(afElec);
      break;
    case "asia":
      renderContinentAreaPlot(asElec);
      break;
    case "europe":
      renderContinentAreaPlot(euElec);
      break;
    case "northAmerica":
      renderContinentAreaPlot(naElec);
      break;
    case "oceania":
      renderContinentAreaPlot(ocElec);
      break;
    case "southAmerica":
      renderContinentAreaPlot(saElec);
      break;
  }
});

// Toggle static axis
let staticAxis = false; // Global variable to track static axis state
let globalXDomain = null; // Global x-axis domain
let globalYDomain = null; // Global y-axis domain

document.getElementById("toggleStaticAxisButton").addEventListener("click", () => {
  staticAxis = !staticAxis; // Toggle the static axis state
  if (staticAxis) {
    // Set global domains based on the current data
    globalXDomain = [
      d3.min(totalElec, d => new Date(d.Year, 0, 1)),
      d3.max(totalElec, d => new Date(d.Year, 11, 31))
    ];
    globalYDomain = [
      0,
      d3.max(totalElec, d => d3.sum(Object.values(d).slice(1)))
    ];
  } else {
    globalXDomain = null;
    globalYDomain = null;
  }
});


// Create a tooltip div
d3.select("body").append("div")
  .attr("id", "tooltip")
  .style("position", "absolute")
  .style("background", "white")
  .style("border", "1px solid black")
  .style("padding", "5px")
  .style("display", "none");

renderTotalAreaPlot(totalElec);

const buttons = document.querySelectorAll(".continentButton");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove "active" class from all buttons
    buttons.forEach(btn => btn.classList.remove("active"));

    // Add "active" class to the clicked button
    button.classList.add("active");

    // Call the appropriate render function based on the button's ID
    switch (button.id) {
      case "worldDataButton":
        renderTotalAreaPlot(totalElec);
        break;
      case "afDataButton":
        renderContinentAreaPlot(afElec);
        break;
      case "asDataButton":
        renderContinentAreaPlot(asElec);
        break;
      case "euDataButton":
        renderContinentAreaPlot(euElec);
        break;
      case "naDataButton":
        renderContinentAreaPlot(naElec);
        break;
      case "ocDataButton":
        renderContinentAreaPlot(ocElec);
        break;
      case "saDataButton":
        renderContinentAreaPlot(saElec);
        break;
    }
  });
});
```
