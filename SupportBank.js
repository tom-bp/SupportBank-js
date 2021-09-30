// const logs = log4js.getLogger("parsing");

// log4js.configure({
//   appenders: {
//       bank: { type: "file", filename: "logs/latest.log" },
//       parsing: { type: "file", filename: "logs/latest.log" },
//       accounts: { type: "file", filename: "logs/latest.log" },
//   },
//   categories: {
//       default: { appenders: ["parsing"], level: "debug" },
//   },
// });

const fs = require("fs");
const readlineSync = require("readline-sync");
const transactions = [];
const accountNames = [];
const accounts = [];
const transactionsFileContents = fs.readFileSync(
  "./Transactions2014.csv",
  "utf8"
);

class Account {
  constructor(name) {
    this.name = name;
    this.money = 0;
  }
}
class Transaction {
  constructor(date, from, to, narrative, amount) {
    this.date = date;
    this.from = from;
    this.to = to;
    this.narrative = narrative;
    this.amount = amount;
  }
}
const transactionsAsStrings = transactionsFileContents.split("\n");
removeHeader(transactionsAsStrings);

for (let i = 0; i < transactionsAsStrings.length; i++) {
  const transactionsAsArray = transactionsAsStrings[i].split(",");
  transactions.push(
    new Transaction(
      transactionsAsArray[0],
      transactionsAsArray[1],
      transactionsAsArray[2],
      transactionsAsArray[3],
      parseFloat(transactionsAsArray[4])
    )
  );
}
// console.log(myTransactions);
createAccounts();
function createAccounts() {
  for (let i = 0; i < transactions.length; i++) {
    const name = transactions[i].to;
    if (accountNames.indexOf(name) === -1) {
      accountNames.push(name);
      accounts.push(new Account(name));
    }
  }
}
calculateMoney();
function calculateMoney() {
  for (let i = 0; i < transactions.length; i++) {
    const money = transactions[i].amount;
    for (let x = 0; x < accounts.length; x++) {
      if (accounts[x].name === transactions[i].from) {
        accounts[x].money -= money;
      } else if (accounts[x].name === transactions[i].to) {
        accounts[x].money += money;
      }
    }
  }
}
// console.log(myAccounts);

// for (const Account of myAccounts) {
//   console.log(Account.name + " has £" + Account.money.toFixed(2));
// }

let sum = 0;
for (let i = 0; i < transactions.length; i++) {
  const bank = parseFloat(transactions[i].amount);
  sum += bank;
}
// console.log("£" + sum.toFixed(2));

function StartUp() {
  const Accounts = [
    "Ben B",
    "Chris W",
    "Dan W",
    "Gergana I",
    "Jon A",
    "Laura B",
    "Rob S",
    "Sam N",
    "Sarah T",
    "Stephan S",
    "Tim L",
    "Todd",
    "ALL",
  ];
  const index = readlineSync.keyInSelect(Accounts, "Which Account?");
  console.log("Ok, loading  " + Accounts[index] + "'s transactions now.");
  const choice = Accounts[index];

  if (choice === "ALL") {
    console.log(transactions);
  } else {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].from === choice || transactions[i].to === choice) {
        console.log(transactions[i]);
      }
    }
    for (let x = 0; x < accounts.length; x++) {
      if (accounts[x].name === choice) {
        console.log(
          accounts[x].name + " has £" + accounts[x].money.toFixed(2) + "\n"
        );
      }
    }
  }

  if (readlineSync.keyInYN("Do you want to see another account? ")) {
    StartUp();
  } else {
    console.log("Thank you, Goodbye :) ");
  }
}
function removeHeader(transactionAsStrings) {
  transactionAsStrings.shift();
}
StartUp();
