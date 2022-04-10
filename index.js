const gridContainer = document.querySelector(".grid-container");
const body = document.querySelector("body");
let drawing = true;

function createGrid(squares) {
  let squaresPerSide;
  if (squares > 100) {
    squaresPerSide = 16;
    alert("Grid can not have more than 100 squares per side!");
  } else {
    squaresPerSide = squares;
  }
  gridContainer.style.cssText = `grid-template-columns: repeat(${squaresPerSide}, 1fr)`;
  for (let i = 0; i < squaresPerSide ** 2; i++) {
    const div = document.createElement("div");
    div.classList.add("grid");
    gridContainer.appendChild(div);
  }
}
const setGrid = document.querySelector("input");
createGrid(setGrid.value);
//set color function
function setColor(e) {
  const selectColor = document.querySelector(".colors");
  console.log(selectColor.value);
  let value = selectColor.value === "random" ? randomRGB() : selectColor.value;
  e.target.style.cssText = `background-color: ${value}`;
}
//initial grid items
const gridItems = document.querySelectorAll(".grid");
const randomRGB = () => {
  const blue = Math.floor(Math.random() * 255) + 1;
  const red = Math.floor(Math.random() * 255) + 1;
  const green = Math.floor(Math.random() * 255) + 1;
  return `rgb(${red}, ${green}, ${blue})`;
};

function enableDrawing(gridItems) {
  if (drawing) {
    gridItems.forEach((gridItem) => {
      gridItem.addEventListener("mouseover", setColor);
    });
  } else {
    gridItems.forEach((gridItem) => {
      gridItem.removeEventListener("mouseover", setColor);
    });
  }
}
enableDrawing(gridItems);
gridContainer.addEventListener("click", () => {
  console.log("hi");
  const currentGridItems = document.querySelectorAll(".grid");
  drawing = drawing === true ? false : true;
  return enableDrawing(currentGridItems);
});
//reset grid
const resetGridButton = document.createElement("button");

//slider
const slider = document.querySelector(".slider");

const sliderValue = document.querySelector(".slider-value");
sliderValue.textContent = slider.value;

slider.addEventListener("input", (e) => {
  const gridItemsOld = document.querySelectorAll(".grid");
  gridItemsOld.forEach((gridItem) => {
    gridItem.remove();
  });

  const value = e.target.value;
  createGrid(value);
  sliderValue.textContent = slider.value;
});
