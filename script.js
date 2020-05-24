const figureImg = document.querySelector(".figure-img");
const figures = document.querySelector("#figures");
const options = document.querySelectorAll("option");
const div = document.querySelector(".input-wrapper");
const btn = document.querySelector(".btn");
const result = document.querySelector(".result");

const notationName = {
  momOfin: "I<sub>x</sub>",
  secMod: "W<sub>x</sub>",
};

function getNotationsArr(arr, momentOfInertia, sectionModulus) {
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

const ring = {
  name: "ring",
  src: "./img/ring.png",
  values: {
    outsideDia: "D",
    insideDia: "d",
  },
  calc: function (D, d) {
    let resultsArr = [];
    const difference = Math.pow(D, 4) - Math.pow(d, 4);
    const multiPi = 3.14 * difference;
    const momentOfInertia = multiPi / 64;
    const sectionModulus = multiPi / (64 * D);
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};

const circle = {
  name: "circle",
  src: "./img/circle.png",
  values: {
    outsideDia: "D",
  },
  calc: function (D) {
    let resultsArr = [];
    const raisedPower = Math.pow(D, 3)
    const multiPi = 3.14 * raisedPower;
    const momentOfInertia = (multiPi * D) / 64;
    const sectionModulus = multiPi / 32;
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};

const elipse = {
  name: "elipse",
  src: "./img/elipse.png",
  values: {
    a: "a",
    b: "b",
  },
  calc: function (a, b) {
    let resultsArr = [];
    const raisedPower = Math.pow(a, 2)
    const multiPiandB = 3.14 * b* raisedPower;
    const momentOfInertia = (multiPiandB * a) / 4;
    const sectionModulus = multiPiandB / 4;
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};

const figureList = [ring, circle, elipse];

figureImg.setAttribute("src", "./img/ring.png");

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
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerHTML = "Notation";
  const th2 = document.createElement("th");
  th2.innerHTML = "Value";
  trHead.append(th1);
  trHead.append(th2);
  thead.append(trHead);

  const tbody = document.createElement("tbody");
  arr.forEach(function (el) {
    const trBody = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerHTML = el.name;
    const td2 = document.createElement("td");
    td2.innerHTML = el.result;
    trBody.append(td1);
    trBody.append(td2);
    tbody.append(trBody);
  });

  table.append(thead);
  table.append(tbody);
  result.append(table);
}

function clearResult() {
  result.innerHTML = "";
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
  }
});

window.onload = function () {
  const ul = createList(ring.values);
  ul.setAttribute("id", "ring");
};
