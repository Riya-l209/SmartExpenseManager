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