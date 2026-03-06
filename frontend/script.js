let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Go to Add Expense Page
function goToAddExpense(){
    window.location.href = "add-expense.html";
}


// Add Transaction
function addTransaction(){

    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if(title === "" || amount === ""){
        alert("Please fill all fields");
        return;
    }

    let transaction = {
        title: title,
        amount: Number(amount),
        category: category
    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    window.location.href = "student.html";
}


// Load Transactions
function loadTransactions(){

    let list = document.getElementById("transaction-list");

    if(!list) return;

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(function(t){

        let row = `
        <tr>
            <td>${t.title}</td>
            <td>₹${t.amount}</td>
            <td>${t.category}</td>
        </tr>
        `;

        list.innerHTML += row;

        expense += t.amount;
    });

    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("income").innerText = "₹0";
    document.getElementById("balance").innerText = "₹" + (-expense);
}


// Run when page loads
window.onload = loadTransactions;