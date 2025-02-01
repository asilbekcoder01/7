let userBalance = 0;
let amountInput = document.querySelector("input");
let table = document.querySelector("table tbody");
let transactions = [];

let showBalance = () => {
  let span = document.querySelector("#userBalance");
  span.innerText = userBalance;
};

let depositBalance = () => {
  let amount = +amountInput.value;
  if (amount > 0) {
    let transaction = {
      balanceBefore: userBalance,
      transactionAmount: amount,
      transactionType: "Deposit",
      balanceAfter: userBalance + amount,
    };
    transactions.push(transaction);
    userBalance += amount;
    showTransactions();
    showBalance();
  } else {
    alert("Please enter a valid amount for deposit");
  }
};

let withdrawBalance = () => {
  let amount = +amountInput.value;
  if (amount > 0 && userBalance >= amount) {
    let transaction = {
      balanceBefore: userBalance,
      transactionAmount: amount,
      transactionType: "Withdraw",
      balanceAfter: userBalance - amount,
    };
    transactions.push(transaction);
    userBalance -= amount;
    showTransactions();
    showBalance();
  } else {
    alert("Insufficient balance or invalid amount");
  }
};

let showTransactions = () => {
  table.innerHTML = "";
  transactions.forEach((el, index) => {
    table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${el.balanceBefore}</td>
            <td>${el.transactionAmount}</td>
            <td><span class="${
              el.transactionType === "Deposit" ? "bg-success" : "bg-danger"
            } p-1 rounded">${el.transactionType}</span></td>
            <td>${el.balanceAfter}</td>
            ${
              index === transactions.length - 1
                ? `<td><button class="btn btn-danger" onclick="deleteLastTransaction()">Delete Last Transaction</button></td>`
                : `<td></td>`
            }
        </tr>
        `;
  });
  amountInput.value = "";
};

let deleteLastTransaction = () => {
  if (transactions.length > 0) {
    let lastTransaction = transactions.pop();
    if (lastTransaction.transactionType === "Deposit") {
      userBalance -= lastTransaction.transactionAmount;
    } else {
      userBalance += lastTransaction.transactionAmount;
    }
    showTransactions();
    showBalance();
  } else {
    alert("No transactions to delete");
  }
};

showBalance();