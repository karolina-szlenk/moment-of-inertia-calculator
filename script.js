const figureImg = document.querySelector(".figure-img");
const figures = document.querySelector("#figures");
const options = document.querySelectorAll("option");
const div = document.querySelector(".input-wrapper");

const ring = {
  src: "./img/ring.png",
  values: {
    outsideDia: "D",
    insideDia: "d",
  },
};

const circle = {
  src: "./img/circle.png",
  values: {
    outsideDia: "D",
  },
};

const elipse = {
  src: "./img/elipse.png",
  values: {
    a: "a",
    b: "b",
  },
};

const figureList = [ring, circle, elipse];

figureImg.setAttribute("src", "./img/ring.png");

figures.addEventListener("change", function () {
  const src = this.value;
  figureImg.setAttribute("src", src);
  displayList(this.value);
});

function displayList(value) {
  for (let i = 0; i < figureList.length; i++) {
    if (value === figureList[i].src) {
      div.firstChild.remove();
      const values = figureList[i].values;
      createList(values);
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

window.onload = function () {
    createList(ring.values);
};