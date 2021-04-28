const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode_button = document.getElementById("jsMode");
const save_button = document.getElementById("jsSave");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.width);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let filling = false;
let painting = false;

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown() {
  if (filling === false) {
    painting = true;
  }
}

function onMouseUp() {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleLineWidth(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}

function handleMode() {
  if (filling === false) {
    filling = true;
    mode_button.innerText = "PAINT";
  } else {
    filling = false;
    mode_button.innerText = "FILL";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.width);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handelSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleLineWidth);
}

if (mode_button) {
  mode_button.addEventListener("click", handleMode);
}

if (save_button) {
  save_button.addEventListener("click", handelSaveClick);
}
