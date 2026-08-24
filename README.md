# FreedomPath — FIRE Calculator

FreedomPath is a browser-based **Financial Independence / FIRE calculator** built using **HTML, CSS, and vanilla JavaScript**.

The project helps users estimate:

- how much money they may need to become financially independent
- the age at which they may reach financial independence
- how their current investments could grow over time
- how changes in expenses, returns, inflation, and monthly investing affect the result

The calculator runs entirely in the browser and does not require a backend, framework, npm setup, or database.

---

## Project Preview

### Dashboard Overview

![FreedomPath Dashboard](./screenshot/fire-home.png)

### Financial Inputs

![FreedomPath Inputs](./screenshot/fire-inputs.png)

### FIRE Results & Projection

![FreedomPath Results](./screenshot/fire-results.png)

### Scenario Comparison

![FreedomPath Scenarios](./screenshot/fire-scenarios.png)

---

## Features

- FIRE / Financial Independence target calculation
- Estimated FI age
- Current FIRE progress percentage
- Projected portfolio value
- Estimated monthly passive income
- Lean FIRE calculation
- Freedom FIRE calculation
- Fat FIRE calculation
- Conservative scenario
- Balanced scenario
- Aggressive scenario
- Wealth growth visualization
- Freedom Accelerator comparison
- Inflation-adjusted projections
- Adjustable safe withdrawal rate
- Indian lakh and crore formatting
- Automatic recalculation when values change
- LocalStorage support
- Reset Plan functionality
- Responsive desktop layout

---

## How the Project Works

The user enters a set of financial assumptions such as:

- Current age
- Target retirement age
- Current investments
- Monthly investment
- Monthly expenses
- Expected annual return
- Inflation
- Safe withdrawal rate

The application then calculates a FIRE target and simulates portfolio growth year by year.

A simplified FIRE calculation is:

```text
FIRE Number = Annual Expenses / Safe Withdrawal Rate
