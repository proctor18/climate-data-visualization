---
theme: dashboard
title: Ozone Visualization
toc: false
---

```js
const ozoneData = FileAttachment("data/cfc_data.csv").csv()
```

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

<!--
<div class="hero">
  <h1>Ozone Hole Visualization</h1>
</div>
-->

<br><br><br>
<h1 style="font-size: 4em; width: 100%; text-align: center;">Ozone Hole Visualization</h1>
<br><br>

<div class="text-container">
<p style="padding: 0 10%;">This interactive visualization allows you to explore the ozone hole over time. <br>Use the slider below to select a year and view the corresponding image. <br>(images from <a href="https://earthobservatory.nasa.gov/world-of-change/Ozone/show-all">https://earthobservatory.nasa.gov/world-of-change/Ozone/show-all</a>)</p>
</div>

<div class="visualization-container">
<div style="display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: auto auto; gap: 20px;">
  <!-- Top Left: Ozone Image and Slider -->
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img id="ozoneImage" src="https://raw.githubusercontent.com/proctor18/renewable-energy-data/main/ozone_images/2000.png" width="600">
    <div style="text-align: center; margin-top: 20px;">
      <label for="ozoneYearSlider">Year: <span id="yearLabel">2000</span></label><br>
      <input type="range" id="ozoneYearSlider" min="1979" max="2019" value="2000" step="1">
    </div>
  </div>

  <!-- Top Right: Ozone Dobson Unit Legend -->
  <div style="display: flex; justify-content: center; align-items: center;">
    <img src="imgs/dobson_legend.png" alt="Ozone Dobson Unit Legend" style="width: 150px;">
  </div>

  <!-- Bottom Left: CFC Graph -->
  <div style="grid-column: 1; grid-row: 2; width: 120%;">
    <div class="card" style="">${
      Plot.plot({
        title: "CFC Levels in Northern and Southern Hemisphere",
        subtitle: "1979-2019",
        width,
        x: { label: "Year", type: "linear" },
        y: { label: "CFC Concentration (ppt)", type: "linear", domain: [0, 600] },
        marks: [
          Plot.ruleY([0]),
          Plot.dot(ozoneData, { x: "YEAR", y: "CFC11_NH", stroke: "#4a90e2", fill: "#4a90e2", tip: true }),
          Plot.dot(ozoneData, { x: "YEAR", y: "CFC11_SH", stroke: "#9b59b6", fill: "#9b59b6", tip: true }),
          Plot.dot(ozoneData, { x: "YEAR", y: "CFC12_NH", stroke: "#50b848", fill: "#50b848", tip: true }),
          Plot.dot(ozoneData, { x: "YEAR", y: "CFC12_SH", stroke: "#ffcc00", fill: "#ffcc00", tip: true }),
          Plot.dot(ozoneData, { x: "YEAR", y: "CFC113_NH", stroke: "#f07a59", fill: "#f07a59", tip: true }),
          Plot.dot(ozoneData, { x: "YEAR", y: "CFC113_SH", stroke: "#f62626", fill: "#f62626", tip: true }),
        ]
      })
    }</div>
  </div>

  <!-- Bottom Right: CFC Legend (One per Row) -->
  <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; margin-left: 40%;">
    <div style="display: flex; align-items: center; margin-bottom: 10px; font-weight: bold; font-size: 20px;">
      Clorofluorocarbons
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="width: 15px; height: 15px; background-color: #4a90e2; margin-right: 10px;"></div> CFC-11 NH
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="width: 15px; height: 15px; background-color: #9b59b6; margin-right: 10px;"></div> CFC-11 SH
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="width: 15px; height: 15px; background-color: #50b848; margin-right: 10px;"></div> CFC-12 NH
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="width: 15px; height: 15px; background-color: #ffcc00; margin-right: 10px;"></div> CFC-12 SH
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="width: 15px; height: 15px; background-color: #f07a59; margin-right: 10px;"></div> CFC-113 NH
    </div>
    <div style="display: flex; align-items: center;">
      <div style="width: 15px; height: 15px; background-color: #f62626; margin-right: 10px;"></div> CFC-113 SH
    </div>
  </div>
</div>
</div>

<br><br>
<div class="two-column" style="padding: 0px 20%;">
    <div>
    <h2>What has been done to slow the progression of climate change?</h2>
    <br>
    <p>
      In response to the growing threat of climate change, global efforts have been made to reduce greenhouse gas emissions and promote sustainability. One of the most significant achievements is the Paris Agreement, an international treaty adopted in 2015, in which nearly 200 countries committed to limiting global temperature rise to well below 2°C above pre-industrial levels. This agreement has led nations to set ambitious targets for reducing carbon emissions and transitioning to cleaner energy sources.<br><br>
      Governments around the world have implemented policies to cut reliance on fossil fuels and encourage the use of renewable energy. Wind, solar, and hydroelectric power have been expanding rapidly, providing cleaner alternatives to coal and oil. Many countries have also introduced carbon pricing mechanisms, such as carbon taxes and cap-and-trade systems, to incentivize businesses to lower their emissions. Additionally, regulations on vehicle emissions and investments in electric vehicle infrastructure have aimed to reduce pollution from the transportation sector.<br><br>
      Reforestation and conservation initiatives have played a crucial role in absorbing carbon dioxide from the atmosphere. Large-scale tree-planting programs, such as the Great Green Wall project in Africa and reforestation efforts in the Amazon, aim to restore ecosystems and improve carbon sequestration. Efforts to protect and restore wetlands, peatlands, and mangroves have also contributed to climate mitigation by preserving natural carbon sinks.<br><br>
    </p>
    </div>
    <div>
    <h2><br><br></h2>
    <p>
      Advancements in technology have led to more energy-efficient solutions across industries. Innovations in sustainable agriculture, such as precision farming and regenerative practices, have helped reduce carbon footprints while maintaining food production. Additionally, businesses and cities have been investing in green buildings, smart grids, and waste reduction strategies to cut emissions and improve sustainability.<br><br>
      Public awareness and activism have also played a vital role in pushing for stronger climate policies. Organizations, scientists, and environmental advocates continue to educate people on the importance of reducing carbon footprints. As a result, individuals and corporations have taken steps toward sustainability by adopting renewable energy, reducing waste, and supporting climate-friendly initiatives.<br><br>
      Although much progress has been made, continued action is necessary to prevent the worst effects of climate change. By strengthening climate policies, investing in sustainable technologies, and promoting global cooperation, humanity can work toward a more sustainable future for generations to come.
    </p>
    <div>
</div>


<!--
<br>
<br>

<div class="text-container">
    <h2>Ozone and CFC Data</h2> 
      <p> This visualization provides an insightful look at the state of the ozone layer over time. The interactive slider above allows you to view satellite images of the ozone hole over Antarctica from 1979 to 2019. These images use color representations to show ozone concentrations, with warmer colours like oranges and reds indicating lower ozone levels. This gives a clear visual representation of how the ozone hole has changed over the decades. </p> 
      <p> Additionally, the plot graph visualizes the atmospheric concentration of chlorofluorocarbons (CFCs) in parts per trillion (ppt). The data distinguishes between the northern and southern hemispheres for three specific CFCs: CFC-11, CFC-12, and CFC-113. These chemicals were once widely used in refrigeration, air conditioning, and aerosol propellants. When released into the atmosphere, CFCs break down the ozone layer, contributing to its depletion. </p><br>
    <h2>Why is This Important?</h2> 
      <p> The ozone layer serves as a protective shield, blocking most of the sun's harmful ultraviolet (UV) radiation. Without it, increased UV radiation would reach Earth's surface, posing severe health risks like skin cancer, cataracts, and weakened immune systems. Moreover, excess UV radiation can harm ecosystems by damaging crops, reducing agricultural productivity, and impacting marine life by harming phytoplankton — a critical part of the food chain. </p><br>
    <h2>What Can Be Done?</h2> 
      <p> While the Montreal Protocol, an international agreement signed in 1987, has significantly reduced the production of CFCs, continued vigilance is necessary to ensure the ozone layer’s recovery. To further reduce CFC emissions and minimize the size of the ozone hole, we can: 
        <ul> 
          <li><b>Strengthen Regulations:</b> Governments should strictly enforce laws that prohibit the production and use of CFCs while monitoring compliance through global cooperation.</li> 
          <li><b>Promote Alternatives:</b> Support the development and adoption of eco-friendly refrigerants and propellants that are safer for the environment.</li> 
          <li><b>Ensure Proper Disposal:</b> Appliances containing CFCs should be recycled or disposed of through certified programs to prevent emissions.</li> 
          <li><b>Increase Awareness:</b> Educating the public about the impact of CFCs and the importance of the ozone layer encourages responsible choices and sustainable practices.</li> 
        </ul> 
      </p> 
      <p> By maintaining these efforts and supporting international cooperation, we can aid in the recovery of the ozone layer and protect the planet for future generations. </p>
</div>
<br><br><br>
-->

<!--
--
--
-->

<script>
    document.getElementById("ozoneYearSlider").addEventListener("input", function() {
        const year = this.value;
        document.getElementById("yearLabel").innerText = year;

        const imageUrl = `https://raw.githubusercontent.com/proctor18/renewable-energy-data/main/ozone_images/${year}.png`;

        document.getElementById("ozoneImage").src = imageUrl;
    });
</script>

<!--
--
--
-->

<style>

* {
    box-sizing: border-box;  /* Makes padding and borders part of the element's total width/height */
    margin: 0;
    padding: 0;
    /*outline: 1px solid red; /* Highlights all elements */
    align-items: center;
    justify-content: center;
}

html {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

body {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

.main {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

h1 {
  margin: 0 auto;
  padding: 1rem 0;
  width: 100%;
  max-width: 90%;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  text-align: center;
}

.visualization-container {
    width: 70%; /* Makes the container take up 80% of the screen width */
    margin: 0 auto; /* Centers the container */
    display: flex;
    flex-direction: column;
    align-items: center; /* Ensures everything inside is centered horizontally */
    justify-content: center;
}

ul {
    padding-left: 40px; /* Indents the whole list */
}


.text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Keeps h2 and p left-aligned */
    text-align: left;
    max-width: 80%; /* Adjust width as needed */
    margin: 0 auto; /* Centers the container */
}


.h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

p {
  max-width: 90%;
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>