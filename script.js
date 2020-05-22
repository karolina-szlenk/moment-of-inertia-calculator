const figureImg = document.querySelector(".figure-img");
const figures = document.querySelector("#figures");
const options = document.querySelectorAll("option");

const ring = {
  src: "./img/ring.png",
};

const circle = {
  src: "./img/circle.png",
};

const elipse = {
  src: "./img/elipse.png",
};

figureImg.setAttribute("src", "./img/ring.png");

figures.addEventListener("change", function () {
  const src = this.value;
  figureImg.setAttribute("src", src);
});
