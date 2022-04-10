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
function toggleDrawing() {
  const currentGridItems = document.querySelectorAll(".grid");
  drawing = drawing === true ? false : true;
  return enableDrawing(currentGridItems);
}
enableDrawing(gridItems);

gridContainer.addEventListener("click", toggleDrawing);
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

const resetGridBtn = document.querySelector(".reset-grid");
resetGridBtn.addEventListener("click", () => {
  const currentGridItems = document.querySelectorAll(".grid");
  currentGridItems.forEach((gridItem) => {
    gridItem.style.cssText = "background-color: white";
  });
});
function eraseColor(e) {
  e.target.style.backgroundColor = "white";
}
const eraseButton = document.querySelector(".erase");
eraseButton.addEventListener("click", (e) => {
  const currentGridItems = document.querySelectorAll(".grid");
  if (e.target.textContent === "Erase") {
    gridContainer.removeEventListener("click", toggleDrawing);
    e.target.classList.add("selected");
    currentGridItems.forEach((gridItem) => {
      if (drawing) {
        gridItem.removeEventListener("mouseover", setColor);
      }
      gridItem.addEventListener("mouseover", eraseColor);
    });
    e.target.textContent = "Done";
  } else {
    gridItems.forEach((gridItem) => {
      gridItem.removeEventListener("mouseover", eraseColor);
    });
    gridContainer.addEventListener("click", toggleDrawing);
    e.target.classList.remove("selected");
    e.target.textContent = "Erase";
  }
});
