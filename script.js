const form = document.getElementById("fireForm");
const resetBtn = document.getElementById("resetBtn");
const scenarioButtons = document.querySelectorAll(".scenario-btn");

const fields = [
  "currentAge",
  "targetAge",
  "currentCorpus",
  "monthlyInvestment",
  "monthlyExpenses",
  "annualReturn",
  "inflation",
  "withdrawalRate"
];

const defaults = {
  currentAge: 25,
  targetAge: 45,
  currentCorpus: 1000000,
  monthlyInvestment: 50000,
  monthlyExpenses: 60000,
  annualReturn: 11,
  inflation: 6,
  withdrawalRate: 4
};

const scenarios = {
  conservative: {
    annualReturn: 8,
    inflation: 6.5,
    withdrawalRate: 3.5
  },
  balanced: {
    annualReturn: 11,
    inflation: 6,
    withdrawalRate: 4
  },
  aggressive: {
    annualReturn: 13,
    inflation: 5.5,
    withdrawalRate: 4
  }
};

function readInputs() {
  return fields.reduce((acc, id) => {
    acc[id] = Number(document.getElementById(id).value) || 0;
    return acc;
  }, {});
}

function setInputs(values) {
  Object.entries(values).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el) el.value = value;
  });
}

function renderChart(points) {
  const chart = document.getElementById("wealthChart");
  chart.innerHTML = "";

  const maxValue = Math.max(
    ...points.map(point => Math.max(point.corpus, point.target)),
    1
  );

  points.forEach((point, index) => {
    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.height = `${Math.max((point.corpus / maxValue) * 100, 1)}%`;

    if (index % 5 === 0 || index === points.length - 1) {
      bar.dataset.label = `Age ${point.age}: ${formatINR(point.corpus)}`;
    } else {
      bar.dataset.label = formatINR(point.corpus);
    }

    chart.appendChild(bar);
  });
}

function buildAccelerator(inputs, result) {
  const title = document.getElementById("acceleratorTitle");
  const text = document.getElementById("acceleratorText");

  const boosted = calculateProjection({
    ...inputs,
    monthlyInvestment: inputs.monthlyInvestment + 10000
  });

  if (result.fiAge && boosted.fiAge && boosted.fiAge < result.fiAge) {
    const yearsSaved = result.fiAge - boosted.fiAge;
    title.textContent = `₹10,000 more per month could save about ${yearsSaved} year${yearsSaved === 1 ? "" : "s"}.`;
    text.textContent =
      `Your estimated FI age moves from ${result.fiAge} to ${boosted.fiAge} under the same return and inflation assumptions.`;
    return;
  }

  if (!result.fiAge && boosted.fiAge) {
    title.textContent = `₹10,000 more per month could put FI within reach.`;
    text.textContent =
      `With the higher monthly investment, your projected FI age becomes ${boosted.fiAge}.`;
    return;
  }

  title.textContent = "Your current plan is already moving in the right direction.";
  text.textContent =
    "Try adjusting expenses, monthly investments, return assumptions, or retirement age to compare alternate paths.";
}

function updateDashboard() {
  const inputs = readInputs();
  const result = calculateProjection(inputs);

  document.getElementById("fireNumber").textContent =
    formatINR(result.fireNumber);

  document.getElementById("projectedCorpus").textContent =
    formatINR(result.projectedCorpus);

  document.getElementById("passiveIncome").textContent =
    formatINR(result.passiveIncome);

  document.getElementById("leanFire").textContent =
    formatINR(result.leanFire);

  document.getElementById("standardFire").textContent =
    formatINR(result.fireNumber);

  document.getElementById("fatFire").textContent =
    formatINR(result.fatFire);

  document.getElementById("fiAge").textContent =
    result.fiAge ?? "80+";

  document.getElementById("yearsRemaining").textContent =
    result.yearsRemaining ?? "Not reached";

  const progress = Math.round(result.currentProgress);
  document.getElementById("progressBar").style.width = `${progress}%`;
  document.getElementById("progressLabel").textContent =
    `${progress}% funded today`;

  document.getElementById("chartSummary").textContent =
    `At age ${inputs.targetAge}: ${formatINR(result.projectedCorpus)}`;

  renderChart(result.points);
  buildAccelerator(inputs, result);

  localStorage.setItem("freedomPathPlan", JSON.stringify(inputs));
}

form.addEventListener("input", updateDashboard);

resetBtn.addEventListener("click", () => {
  setInputs(defaults);
  localStorage.removeItem("freedomPathPlan");

  scenarioButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.scenario === "balanced");
  });

  updateDashboard();
});

scenarioButtons.forEach(button => {
  button.addEventListener("click", () => {
    const scenario = scenarios[button.dataset.scenario];

    setInputs(scenario);

    scenarioButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    updateDashboard();
  });
});

const saved = localStorage.getItem("freedomPathPlan");

if (saved) {
  try {
    setInputs(JSON.parse(saved));
  } catch (error) {
    console.warn("Could not restore saved plan.", error);
  }
}

updateDashboard();
