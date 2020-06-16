import { getNotationsArr } from "./script.js";

export const ring = {
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

export const circle = {
  name: "circle",
  src: "./img/circle.png",
  values: {
    outsideDia: "D",
  },
  calc: function (D) {
    let resultsArr = [];
    const raisedPower = Math.pow(D, 3);
    const multiPi = 3.14 * raisedPower;
    const momentOfInertia = (multiPi * D) / 64;
    const sectionModulus = multiPi / 32;
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};

export const elipse = {
  name: "elipse",
  src: "./img/elipse.png",
  values: {
    a: "a",
    b: "b",
  },
  calc: function (a, b) {
    let resultsArr = [];
    const raisedPower = Math.pow(a, 2);
    const multiPiandB = 3.14 * b * raisedPower;
    const momentOfInertia = (multiPiandB * a) / 4;
    const sectionModulus = multiPiandB / 4;
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};

export const square = {
  name: "square",
  src: "./img/square.png",
  values: {
    H: "H",
  },
  calc: function (H) {
    let resultsArr = [];
    const raisedPower = Math.pow(H, 3);
    const momentOfInertia = (raisedPower * H)/12;
    const sectionModulus = raisedPower/6;
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};

export const hollowSquare = {
  name: "hollow square",
  src: "./img/hollow-square.png",
  values: {
    H: "H",
    h: "h",
  },
  calc: function (H, h) {
    let resultsArr = [];
    const raisedPowerOut = Math.pow(H, 4);
    const raisedPowerIn = Math.pow(h, 4);
    const momentOfInertia = (raisedPowerOut - raisedPowerIn)/12;
    const sectionModulus = (raisedPowerOut - raisedPowerIn)/(6*H);
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};

export const rectangle = {
  name: "rectangle",
  src: "./img/rectangle.png",
  values: {
    b: "b",
    h: "h",
  },
  calc: function (b, h) {
    let resultsArr = [];
    const raisedPower = Math.pow(h, 2);
    const momentOfInertia = (b*raisedPower)*h/12;
    const sectionModulus = (b*raisedPower)/6;
    getNotationsArr(resultsArr, momentOfInertia, sectionModulus);
    return resultsArr;
  },
};
