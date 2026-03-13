// Get saved transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Go to Add Expense page
function goToAddExpense(){
    window.location.href = "add-expense.html";
}


// Add transaction
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


// Load transactions
function loadTransactions(){

    let list = document.getElementById("transaction-list");

    if(!list) return;

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(function(t,index){

        let row = `
        <tr>
            <td>${t.title}</td>
            <td>₹${t.amount}</td>
            <td>${t.category}</td>
            <td>
                <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
            </td>
        </tr>
        `;

        list.innerHTML += row;

        expense += t.amount;

    });

    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("income").innerText = "₹0";
    document.getElementById("balance").innerText = "₹" + (-expense);
}


// Delete transaction
function deleteTransaction(index){

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.splice(index,1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    location.reload();
}


// Run when page loads
window.onload = loadTransactions;