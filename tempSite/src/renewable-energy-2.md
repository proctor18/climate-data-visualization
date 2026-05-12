---
theme: dashboard
title: Renewable Energy 2
toc: false
---


<div class="hero">
  <h1>Renewable Energy</h1>
</div>

<!-- Year Selector and Chart Canvas -->
<label for="yearSlider">Select Year:&emsp;<span id="yearDisplay"></span></label>
<input type="range" id="yearSlider" min="2000" max="2024" step="1">
<br><br>
<canvas id="myChart"></canvas>

<br>
--------------------
<br><br>

<div>
  <h2>Understanding Renewable Energy Data</h2>
  <p>The chart above showcases the percentage of renewable energy used by various countries over time. Renewable energy includes sources like solar, wind, hydro, and geothermal, which are sustainable and produce minimal carbon emissions. This data helps us compare countries' efforts toward clean energy adoption and monitor global progress in reducing reliance on fossil fuels.</p>

  <h2>Why Renewable Energy Matters</h2>
  <p>Transitioning to renewable energy is crucial in combating climate change. Fossil fuel combustion releases greenhouse gases that contribute to global warming, while renewables provide a cleaner alternative. By increasing renewable energy use, countries can reduce air pollution, improve public health, and ensure long-term energy security. Tracking progress through data like this allows policymakers, researchers, and communities to make informed decisions.</p>

  <h2>Improving Renewable Energy Adoption</h2>
  <p>To increase renewable energy adoption, governments and organizations can implement various strategies, including:</p>
  <ul>
    <li><strong>Investment in Infrastructure:</strong> Develop solar farms, wind farms, and hydroelectric plants to generate clean energy efficiently.</li>
    <li><strong>Policy Support:</strong> Offer subsidies, tax credits, and incentives for renewable energy projects and technologies.</li>
    <li><strong>Grid Modernization:</strong> Improve energy storage solutions and update grid systems to accommodate intermittent renewable sources.</li>
    <li><strong>Public Awareness:</strong> Educate communities about the benefits of renewable energy and encourage energy-efficient practices.</li>
  </ul>
  <p>By analyzing this data and understanding trends, countries can set realistic goals for renewable energy adoption and collaborate internationally to accelerate the global clean energy transition.</p>
</div>

<!-- 
-
-
-
-->

<!-- Chart.js CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Inline JavaScript Code -->
<script>
    document.addEventListener("DOMContentLoaded", async function () {
    const ctx = document.getElementById('myChart');
    const yearSlider = document.getElementById('yearSlider');
    const yearDisplay = document.getElementById('yearDisplay');

    let energyData = [];

    async function loadCSV() {
        console.log("Fetching CSV data...");
        const response = await fetch('https://raw.githubusercontent.com/proctor18/renewable-energy-data/refs/heads/main/renewable-energy-data.csv');
        const data = await response.text();
        console.log(data);

        const rows = data.split("\n").slice(1);
        energyData = rows.map(row => {
            const [country, code, year, renewablePercent] = row.split(",");
            return {
                country: country.trim(),
                year: parseInt(year.trim(), 10),
                renewablePercent: parseFloat(renewablePercent.trim())
            };
        });

        console.log("Sample Data:", energyData.slice(0, 10));
        populateYearSlider();
    }

    function populateYearSlider() {
        const years = [...new Set(energyData.map(entry => entry.year))].sort();
        
        yearSlider.min = Math.min(...years);
        yearSlider.max = Math.max(...years);
        yearSlider.value = yearSlider.max; 
        yearDisplay.textContent = yearSlider.value;

        updateChart(yearSlider.value);
    }

    function updateChart(selectedYear) {
        console.log(`Updating chart for year: ${selectedYear}`);

        const filteredData = energyData.filter(entry => entry.year === parseInt(selectedYear));

        console.log("Filtered Data:", filteredData);

        const top10 = filteredData.sort((a, b) => b.renewablePercent - a.renewablePercent).slice(0, 10);

        const labels = top10.map(entry => entry.country);
        const values = top10.map(entry => entry.renewablePercent);

        console.log("Chart Labels:", labels);
        console.log("Chart Values:", values);

        if (!ctx) {
            console.error("Canvas context (ctx) is not found.");
            return;
        }

        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Renewable Energy %',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                animation: false, // Disable animation
                scales: {
                    x: { 
                        beginAtZero: true,
                        min: 0,
                        max: 100
                    }
                }
            }
        });

        console.log("Chart Created:", window.myChart);
    }

    yearSlider.addEventListener("input", function () {
        yearDisplay.textContent = this.value;
        updateChart(this.value);
    });

    await loadCSV();
});
</script>


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

p {
    max-width: 90%;
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 70px;
  }
}
</style>