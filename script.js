const figureImg = document.querySelector(".figure-img");
const figures = document.querySelector("#figures");
const options = document.querySelectorAll("option");
const div = document.querySelector(".input-wrapper");
const btn = document.querySelector(".btn");
const result = document.querySelector(".result");

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
    const momentOfInertia = (3.14 * difference) / 64;
    const sectionModulus = (3.14 * difference) / (64 * D);
    const momentOfInertiaObj = {
      name: "Moment of inertia",
      result: momentOfInertia,
    };
    const sectionModulusObj = {
      name: "Section modulus",
      result: sectionModulus,
    };
    resultsArr.push(momentOfInertiaObj, sectionModulusObj);
    return resultsArr;
  },
};

const circle = {
  name: "circle",
  src: "./img/circle.png",
  values: {
    outsideDia: "D",
  },
  //temporaty equation
  calc: function (a) {
    console.log(a);
    return a;
  },
};

const elipse = {
  name: "elipse",
  src: "./img/elipse.png",
  values: {
    a: "a",
    b: "b",
  },
  //temporaty equation
  calc: function (a, b) {
    console.log(a * b);
    return a * b;
  },
};

const figureList = [ring, circle, elipse];

figureImg.setAttribute("src", "./img/ring.png");

figures.addEventListener("change", function () {
  result.innerHTML = "";
  const src = this.value;
  figureImg.setAttribute("src", src);
  displayList(this.value);
});

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

btn.addEventListener("click", function () {
  if (result.childElementCount === 1) {
    return;
  } else {
    const ul = document.querySelector("ul").getAttribute("id");
    const inputs = document.querySelectorAll('input[type="number"]');
    let arr = [];
    inputs.forEach(function (input) {
      const parsedValue = parseInt(input.value);
      arr.push(parsedValue);
    });
    calculate(ul, arr[0], arr[1]);
  }
});

function calculate(ul, val1, val2) {
  for (let i = 0; i < figureList.length; i++) {
    if (figureList[i].name.indexOf(ul) !== -1) {
      const data = figureList[i].calc(val1, val2);
      createResultsTable(data);
    }
  }
}

function createResultsTable(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj = arr[i];
  }
  if (isNaN(obj.result)) {
    console.log(obj.result);
    result.innerHTML = "";
  } else {
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
}

window.onload = function () {
  const ul = createList(ring.values);
  ul.setAttribute("id", "ring");
};

