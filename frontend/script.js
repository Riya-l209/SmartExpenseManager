// ===============================
// FinPersona Student Mode Script
// ===============================

// ---------- Budget Data ----------
let totalBudget = 10000;
let spentAmount = 3000;

// ---------- Update Budget Ring ----------
function updateBudgetRing() {

    const percentage = Math.round((spentAmount / totalBudget) * 100);

    const ring = document.querySelector(".ring");

    ring.style.background =
        `conic-gradient(#c084fc ${percentage}%, #eee 0%)`;

    ring.innerHTML = `<span>${percentage}%</span>`;
}

// ---------- Floating Button Click ----------
const addBtn = document.querySelector(".floating-btn");

addBtn.addEventListener("click", () => {
    showExpensePopup();
});

// ---------- Create Popup Dynamically ----------
function showExpensePopup() {

    const popup = document.createElement("div");
    popup.classList.add("popup");

    popup.innerHTML = `
        <div class="popup-content">
            <h2>Add Expense 💸</h2>

            <input type="text" id="category" placeholder="Category">
            <input type="number" id="amount" placeholder="Amount">

            <button onclick="addExpense()">Add</button>
            <button onclick="closePopup()">Cancel</button>
        </div>
    `;

    document.body.appendChild(popup);
}

// ---------- Close Popup ----------
function closePopup() {
    document.querySelector(".popup").remove();
}

// ---------- Add Expense Logic ----------
function addExpense() {

    const amount = Number(document.getElementById("amount").value);

    if (!amount || amount <= 0) {
        alert("Enter valid amount 😤");
        return;
    }

    spentAmount += amount;

    updateBudgetRing();

    closePopup();

    alert("Expense added successfully ✨");
}

// ---------- Initial Load ----------
updateBudgetRing();
document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("expenseForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

let title = document.getElementById("title").value;
let amount = document.getElementById("amount").value;
let category = document.getElementById("category").value;

let expense = {
title: title,
amount: amount,
category: category
};

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

expenses.push(expense);

localStorage.setItem("expenses", JSON.stringify(expenses));

alert("Expense Added Successfully ✅");

window.location.href = "student.html";

});

}

});
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function goToAddExpense(){
    window.location.href = "add-expense.html";
}

function addTransaction(){

    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    let transaction = {
        title:title,
        amount:amount,
        category:category
    };

    transactions.push(transaction);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    window.location.href = "student.html";
}

function loadTransactions(){

    let list = document.getElementById("transaction-list");

    if(!list) return;

    list.innerHTML="";

    let income=0;
    let expense=0;

    transactions.forEach(function(t){

        let row = `
        <tr>
        <td>${t.title}</td>
        <td>₹${t.amount}</td>
        <td>${t.category}</td>
        </tr>
        `;

        list.innerHTML += row;

        expense += Number(t.amount);

    });

    document.getElementById("expense").innerText="₹"+expense;
    document.getElementById("income").innerText="₹0";
    document.getElementById("balance").innerText="₹"+(-expense);

}

loadTransactions();