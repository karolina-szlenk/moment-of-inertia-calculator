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
  //temporaty equation
  calc: function (a, b) {
    // console.log(a + b);
    return a + b;
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
  const ul = document.querySelector("ul").getAttribute("id");
  const inputs = document.querySelectorAll('input[type="number"]');
  let arr = [];
  inputs.forEach(function (input) {
    const parsedValue = parseInt(input.value);
    arr.push(parsedValue);
  });
  calculate(ul, arr[0], arr[1]);
});

function calculate(ul, val1, val2) {
  for (let i = 0; i < figureList.length; i++) {
    if (figureList[i].name.indexOf(ul) !== -1) {
      const res = figureList[i].calc(val1, val2);
      if (isNaN(res)) {
        result.innerHTML = ""  
      } else {
        result.append(res)
      }
    }
  }
}

window.onload = function () {
  const ul = createList(ring.values);
  ul.setAttribute("id", "ring");
};
