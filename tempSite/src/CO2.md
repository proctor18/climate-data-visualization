---
toc: false
title: CO2 Data
---

<link rel="stylesheet" href="css/styles.css">

```js
const co2 = FileAttachment("data/CO2_monthly_mean_data.csv").csv()
```

<div class="hero">
  <h1>Monthly Mean CO<sub>2</sub></h1>
</div>

<div class="card">${
  Plot.plot({
    title: "Monthly Mean CO2",
    subtitle: "1958-2024",
    width,
    x: {
        type: "linear"
    },
    y: {
        label: "Atmospheric Concentration of CO2 (PPM)",
        type: "linear",
        domain: [300, 430]
    },
    marks: [
        Plot.ruleY([0]),
        Plot.dot(co2, {
          x: "decimal date", 
          y: "average", 
          tip: true,
        })
    ]
})
}</div>

<div class="card">${
Plot.plot({
    title: "Monthly Mean CO2 (Deseasonalized)",
    subtitle: "1958-2024",
    width,
    x: {
        type: "linear"
    },
    y: {
        label: "Atmospheric Concentration of CO2 (PPM)",
        type: "linear",
        domain: [300, 430]
    },
    marks: [
        Plot.ruleY([0]),
        Plot.dot(co2, {
          x: "decimal date", 
          y: "deseasonalized", 
          tip: true
        })
    ]
})
}</div>


<h1>Monthly Mean CO<sub>2</sub></h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacus massa. Etiam tincidunt, purus a hendrerit commodo, libero est rhoncus erat, sollicitudin semper lorem libero sit amet libero. Sed non est sed elit suscipit lobortis. Pellentesque nec eleifend risus, at euismod diam. Curabitur ut risus malesuada, dictum tortor vel, rutrum est. Morbi est velit, vehicula congue tincidunt ac, convallis ut sem. Nulla porta eleifend efficitur. Fusce dapibus justo in sem dictum, nec commodo est suscipit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra metus in enim pretium faucibus. Nullam eu pharetra mi. Aliquam erat volutpat. Ut ultrices ullamcorper nulla, eu interdum nisl tempus a. Fusce est dolor, tincidunt ut fringilla ut, varius non nunc. Nullam turpis urna, congue eu eleifend at, condimentum non ex. Nulla egestas auctor mi, quis laoreet mi rutrum quis. Sed congue, odio ac aliquet tempus, arcu dolor scelerisque ante, eget vestibulum erat diam eu nibh. Pellentesque at massa neque.

</p>

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
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
    font-size: 90px;
  }
}

</style>


