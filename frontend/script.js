let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


function goToAddExpense(){
    window.location.href = "add-expense.html";
}


function addTransaction(){

    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if(title === "" || amount === ""){
        alert("Please fill all fields");
        return;
    }

    let transaction = {
        title:title,
        amount:Number(amount),
        category:category
    };

    transactions.push(transaction);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    window.location.href = "student.html";

}


function loadTransactions(){

    let list = document.getElementById("transaction-list");

    if(!list) return;

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    list.innerHTML="";

    let income=0;
    let expense=0;

    transactions.forEach(function(t,index){

        let row=`
        <tr>
            <td>${t.title}</td>
            <td>₹${t.amount}</td>
            <td>${t.category}</td>
            <td>
                <button class="delete-btn" onclick="deleteTransaction(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;

        list.innerHTML+=row;

        expense+=t.amount;

    });

    document.getElementById("expense").innerText="₹"+expense;
    document.getElementById("income").innerText="₹0";
    document.getElementById("balance").innerText="₹"+(-expense);

}



function deleteTransaction(index){

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.splice(index,1);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    location.reload();

}



function loadChart(){

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    let categories={};

    transactions.forEach(function(t){

        if(categories[t.category]){
            categories[t.category]+=t.amount;
        }else{
            categories[t.category]=t.amount;
        }

    });

    let labels=Object.keys(categories);
    let data=Object.values(categories);

    let ctx=document.getElementById("expenseChart");

    if(!ctx) return;

    new Chart(ctx,{
        type:'pie',
        data:{
            labels:labels,
            datasets:[{
                data:data,
                backgroundColor:[
                    '#ff9cee',
                    '#ffc8dd',
                    '#cdb4db',
                    '#bde0fe',
                    '#a2d2ff'
                ]
            }]
        }
    });

}


window.onload=function(){
    loadTransactions();
    loadChart();
};