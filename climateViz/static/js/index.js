/*
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
*/

document.addEventListener("DOMContentLoaded", async function () {
    const ctx = document.getElementById('myChart');
    const yearSelect = document.getElementById('yearSelect');

    let energyData = [];

    // Function to load CSV data
    async function loadCSV() {
        console.log("Fetching CSV data...");
        const response = await fetch('/static/data/renewable-energy-data.csv');
        const data = await response.text();

        // Parse CSV data
        const rows = data.split("\n").slice(1); // Remove headers
        energyData = rows.map(row => {
            const [country, code, year, renewablePercent] = row.split(",");
            return {
                country: country.trim(),
                year: parseInt(year.trim(), 10),
                renewablePercent: parseFloat(renewablePercent.trim())
            };
        });

        console.log("Sample Data:", energyData.slice(0, 10)); // Debug CSV data

        // Populate dropdown with unique years
        populateYearDropdown();
    }

    // Function to populate the dropdown with years
    function populateYearDropdown() {
        const years = [...new Set(energyData.map(entry => entry.year))].sort(); // Get unique years, sorted
        yearSelect.innerHTML = years.map(year => `<option value="${year}">${year}</option>`).join("");

        // Set default year to latest available
        const latestYear = years[years.length - 1];
        yearSelect.value = latestYear;
        updateChart(latestYear);
    }

    function updateChart(selectedYear) {
        console.log(`Updating chart for year: ${selectedYear}`);
    
        // Filter data for the selected year
        const filteredData = energyData.filter(entry => entry.year === parseInt(selectedYear));
    
        console.log("Filtered Data:", filteredData); // Debug filtered data
    
        // Sort by renewable energy percentage (highest first) and take the top 10
        const top10 = filteredData.sort((a, b) => b.renewablePercent - a.renewablePercent).slice(0, 10);
    
        const labels = top10.map(entry => entry.country);
        const values = top10.map(entry => entry.renewablePercent);
    
        console.log("Chart Labels:", labels); // Debug labels
        console.log("Chart Values:", values); // Debug values
    
        // Ensure ctx is valid
        if (!ctx) {
            console.error("Canvas context (ctx) is not found.");
            return;
        }
    
        // Destroy previous chart instance if it exists
        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }
    
        // Create new horizontal bar chart
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
                indexAxis: 'y', // Horizontal bar chart
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    
        console.log("Chart Created:", window.myChart); // Debug chart creation
    }
    

    // Event listener for dropdown changes
    yearSelect.addEventListener("change", function () {
        updateChart(this.value);
    });

    // Load CSV and initialize chart
    await loadCSV();
});

