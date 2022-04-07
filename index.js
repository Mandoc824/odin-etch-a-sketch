const gridContainer = document.querySelector(".grid-container");
const body = document.querySelector("body");

function createGrid(squares = 50) {
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
createGrid();

//initial grid items
const gridItems1 = document.querySelectorAll(".grid");
const randomRGB = () => {
  const blue = Math.floor(Math.random() * 255) + 1;
  const red = Math.floor(Math.random() * 255) + 1;
  const green = Math.floor(Math.random() * 255) + 1;
  return `rgb(${red}, ${green}, ${blue})`;
};
gridItems1.forEach((gridItem) => {
  gridItem.addEventListener("mouseover", () => {
    gridItem.style.cssText = `background-color: ${randomRGB()}`;
  });
});

//reset grid
const resetGridButton = document.createElement("button");
resetGridButton.classList.add("reset-btn");
resetGridButton.textContent = "Reset Grid and Resize";
body.prepend(resetGridButton);

resetGridButton.addEventListener("click", (e) => {
  const gridItemsOld = document.querySelectorAll(".grid");
  gridItemsOld.forEach((gridItem) => gridItem.remove());
  const squaresPerSide = prompt(
    "Please specify the amount of squares you want per side"
  );
  if (typeof Number(squaresPerSide) === "number") {
    createGrid(squaresPerSide);
    const gridItemsNew = document.querySelectorAll(".grid");
    gridItemsNew.forEach((gridItem) => {
      gridItem.addEventListener("mouseover", () => {
        gridItem.style.cssText = `background-color: ${randomRGB()}`;
      });
    });
  } else {
    alert("please provide a number");
  }
});
