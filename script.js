import { ring, circle, elipse } from "./figures.js";
const figureList = [ring, circle, elipse];

//variables
const figureImg = document.querySelector(".figure-img");
const figures = document.querySelector("#figures");
const div = document.querySelector(".input-wrapper");
const unitsWrapper = document.querySelector(".units-wrapper");
const btn = document.querySelector(".btn");
const result = document.querySelector(".result");
const selector = document.querySelector(".unit-selector");

//input data
figureImg.setAttribute("src", "./img/ring.png");

export const notationName = {
  momOfin: "I<sub>x</sub>",
  secMod: "W<sub>x</sub>",
};

//functions
export function getNotationsArr(arr, momentOfInertia, sectionModulus) {
  const momentOfInertiaObj = {
    name: notationName.momOfin,
    result: momentOfInertia.toFixed(2),
  };
  const sectionModulusObj = {
    name: notationName.secMod,
    result: sectionModulus.toFixed(2),
  };
  arr.push(momentOfInertiaObj, sectionModulusObj);
  return arr;
}

function displayList(value) {
  for (let i = 0; i < figureList.length; i++) {
    if (value === figureList[i].src) {
      div.firstChild.remove();
      const values = figureList[i].values;
      const ul = createList(values);
      ul.setAttribute("id", figureList[i].name);
    }
  }
}

function createList(obj) {
  const ul = document.createElement("ul");
  for (let value of Object.values(obj)) {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    const label = document.createElement("label");
    label.innerHTML = value;
    ul.append(label);
    ul.append(input);
    div.append(ul);
  }
  return ul;
}

function createUnitOptions() {
  const select = document.createElement("select");
  select.setAttribute("class", "unit-selector");
  const units = ["m", "cm", "mm"];
  units.forEach(function (unit) {
    const option = document.createElement("option");
    option.setAttribute("class", "unit-option");
    option.setAttribute("id", unit);
    option.value = unit;
    option.innerHTML = unit;
    select.append(option);
  });
  unitsWrapper.append(select);
}

function getUnitInTable() {
  const selector = document.querySelector(".unit-selector");
  const res = selector.options[selector.selectedIndex].value;
  return res;
}

function calculateResults(ul, val1, val2) {
  for (let i = 0; i < figureList.length; i++) {
    if (figureList[i].name.indexOf(ul) !== -1) {
      const data = figureList[i].calc(val1, val2);
      checkInputContent(data);
    }
  }
}

function checkInputContent(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj = arr[i];
  }
  if (isNaN(obj.result)) {
    clearResult();
  } else {
    getResultsTable(arr);
  }
}

function getResultsTable(arr) {
  const unit = getUnitInTable();
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerHTML = "Notation";
  const th2 = document.createElement("th");
  th2.innerHTML = "Value";
  const th3 = document.createElement("th");
  th3.innerHTML = "Unit";
  trHead.append(th1);
  trHead.append(th2);
  trHead.append(th3);
  thead.append(trHead);

  const tbody = document.createElement("tbody");
  arr.forEach(function (el, index) {
    const trBody = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerHTML = el.name;
    const td2 = document.createElement("td");
    td2.innerHTML = el.result;
    const td3 = document.createElement("td");
    td3.innerHTML = unit;
    td3.setAttribute("id", `unit${index}`);
    trBody.append(td1);
    trBody.append(td2);
    trBody.append(td3);
    tbody.append(trBody);
  });

  table.append(thead);
  table.append(tbody);
  result.append(table);
}

function clearResult() {
  result.innerHTML = "";
}

function changeUnit() {
  const selector = document.querySelector(".unit-selector");
  selector.addEventListener("change", clearResult);
}

function addRaisedPower() {
  const unit0 = document.querySelector("#unit0");
  const txt0 = unit0.innerHTML;
  const raisedPowerValue0 = txt0 + "<sup>4<sup>";
  unit0.innerHTML = raisedPowerValue0;
  const unit1 = document.querySelector("#unit1");
  const txt1 = unit1.innerHTML;
  const raisedPowerValue1 = txt1 + "<sup>3<sup>";
  unit1.innerHTML = raisedPowerValue1;
}

figures.addEventListener("change", function () {
  clearResult();
  const src = this.value;
  figureImg.setAttribute("src", src);
  displayList(this.value);
});

btn.addEventListener("click", function () {
  if (result.childElementCount === 1) {
    return;
  } else {
    const ul = document.querySelector("ul").getAttribute("id");
    const inputs = document.querySelectorAll('input[type="number"]');
    let arr = [];
    inputs.forEach(function (input) {
      input.addEventListener("keypress", clearResult);
      const parsedValue = parseInt(input.value);
      arr.push(parsedValue);
    });
    calculateResults(ul, arr[0], arr[1]);
    addRaisedPower();
    changeUnit();
  }
});

window.onload = function () {
  const ul = createList(ring.values);
  ul.setAttribute("id", "ring");
  createUnitOptions();
};
