function calculateProjection({
  currentAge,
  targetAge,
  currentCorpus,
  monthlyInvestment,
  monthlyExpenses,
  annualReturn,
  inflation,
  withdrawalRate
}) {
  const annualReturnRate = annualReturn / 100;
  const inflationRate = inflation / 100;
  const withdrawalRateDecimal = withdrawalRate / 100;

  const annualExpensesNow = monthlyExpenses * 12;
  const currentFireNumber = annualExpensesNow / withdrawalRateDecimal;

  let corpus = currentCorpus;
  let age = currentAge;
  let fiAge = null;
  const points = [];

  while (age <= 80) {
    const yearsPassed = age - currentAge;
    const inflatedAnnualExpenses =
      annualExpensesNow * Math.pow(1 + inflationRate, yearsPassed);

    const fireTargetAtAge =
      inflatedAnnualExpenses / withdrawalRateDecimal;

    points.push({
      age,
      corpus,
      target: fireTargetAtAge
    });

    if (fiAge === null && corpus >= fireTargetAtAge) {
      fiAge = age;
    }

    corpus =
      corpus * (1 + annualReturnRate) +
      monthlyInvestment * 12;

    age++;
  }

  const targetPoint =
    points.find(point => point.age === targetAge) || points[points.length - 1];

  const projectedCorpus = targetPoint.corpus;
  const projectedTarget = targetPoint.target;

  const currentProgress = Math.min(
    (currentCorpus / currentFireNumber) * 100,
    100
  );

  const passiveIncome =
    currentCorpus * withdrawalRateDecimal / 12;

  return {
    fireNumber: currentFireNumber,
    projectedCorpus,
    projectedTarget,
    fiAge,
    yearsRemaining: fiAge ? Math.max(fiAge - currentAge, 0) : null,
    currentProgress,
    passiveIncome,
    leanFire: currentFireNumber * 0.75,
    fatFire: currentFireNumber * 1.5,
    points
  };
}

function formatINR(value) {
  if (!Number.isFinite(value)) return "₹0";

  const abs = Math.abs(value);

  if (abs >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (abs >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
