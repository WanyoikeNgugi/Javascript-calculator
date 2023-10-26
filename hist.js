let historyButton = document.getElementById("historybutton"); // Change to "historybutton"
let history = document.getElementById("history");
let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let dis = document.getElementById("answer");

function showhistory() {
  let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
  let len = calcHistory.length;

  history.innerHTML = "";

  bar1.style.display = "block";
  bar2.style.display = "block";

  if (len === 0) {
    let historyItem = document.createElement("div");
    historyItem.innerHTML = "There's no history yet.";
    historyItem.className = "historyelement his"; // Add "Item" to class name
    historyItem.style.fontSize = "25px"; // Change to "historyItem"
    history.appendChild(historyItem);
  } else {
    for (let index = len - 1; index >= 0; index--) {
      const element = calcHistory[index];
      let historyItem = document.createElement("div");
      historyItem.className = "historyelement";
      historyItem.innerHTML = `${
        element.lastScreenValue
      } = <span style ='color: ${element.result < 0 ? "red" : "green"}'>${
        element.result
      }</span>`;
      history.appendChild(historyItem);
      if (index > 0) history.appendChild(document.createElement("hr"));
    }
  }
  history.style.display = "block";
}
historyButton.addEventListener("click", showhistory);

function clearall() {
  dis.value = "";
}

function hide() {
  history.style.display = "none";
  bar1.style.display = "none";
  bar2.style.display = "none";
}

bar1.addEventListener("click", hide);
bar2.addEventListener("click", hide);
