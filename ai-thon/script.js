
let expenses = [];
let budget = 500;
let goals = [];
let reports = 0;
let costSavings = 0;
let timeSavings = 0;

// Categorization
function categorize(desc) {
  desc = desc.toLowerCase();
  if (desc.includes("pizza") || desc.includes("food") || desc.includes("burger")) return "Food";
  if (desc.includes("bus") || desc.includes("train") || desc.includes("uber")) return "Transport";
  if (desc.includes("book") || desc.includes("pen") || desc.includes("stationary")) return "Study";
  return "Other";
}

// Predictive spending
function predictSpending() {
  if (expenses.length === 0) return 0;
  let avg = expenses.reduce((a,b) => a+b.amount,0) / expenses.length;
  return Math.round(avg * 30); // daily avg * 30
}

// Update Finance Dashboard
function updateFinanceDashboard() {
  let total = expenses.reduce((a,b)=>a+b.amount,0);
  document.getElementById("total-spent").textContent = total;
  let predicted = predictSpending();
  document.getElementById("predicted-spend").textContent = predicted;

  let alertBox = document.getElementById("alert");
  if (total > budget) {
    alertBox.textContent = "🚨 Budget exceeded!";
  } else if (predicted > budget) {
    alertBox.textContent = "⚠️ Predicted spending will exceed budget!";
  } else {
    alertBox.textContent = "";
  }
}

// Update Reports Dashboard
function updateReportsDashboard() {
  document.getElementById("reports-count").textContent = reports;
  document.getElementById("cost-savings").textContent = "$" + costSavings.toFixed(2);
  document.getElementById("time-savings").textContent = timeSavings;
}

// Add Expense
document.getElementById("expense-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let desc = document.getElementById("expense-desc").value;
  let amount = parseFloat(document.getElementById("expense-amount").value);
  let category = categorize(desc);

  expenses.push({desc, amount, category});
  document.getElementById("expense-list").innerHTML += `<li>${desc} - $${amount} (${category})</li>`;
  document.getElementById("category-output").textContent = "Categorized as: " + category;

  // Simulate report generation
  reports++;
  costSavings += amount * 0.1; // assume 10% saving insight
  timeSavings += 1; // +1 min saved
  let activity = document.getElementById("activity-list");
  if (activity.innerHTML.includes("No data")) activity.innerHTML = "";
  activity.innerHTML += `<li>Report generated for: ${desc} ($${amount})</li>`;

  document.getElementById("expense-desc").value = "";
  document.getElementById("expense-amount").value = "";

  updateFinanceDashboard();
  updateReportsDashboard();
});

// Add Goal
document.getElementById("goal-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("goal-name").value;
  let amount = parseFloat(document.getElementById("goal-amount").value);
  goals.push({name, amount});

  document.getElementById("goals-list").innerHTML += `<li>${name} - Target: $${amount}</li>`;
  document.getElementById("goal-name").value = "";
  document.getElementById("goal-amount").value = "";
});
