const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
const range = document.getElementById('range');
const fillBtn = document.querySelector('.fill-btn');
const paintBtn = document.querySelector('.paint-btn');
const currentColor = document.querySelector('.current-btn');
const saveBtn = document.querySelector('.save-btn');
const active = document.querySelector('.active');
const INITIAL_COLOR = '#2c2c2c';

let painting = false;
let filling = false;

// pixel modifier : you have to give your canvas size here!
canvas.width = 1000;
canvas.height = 550;

// canvas defalut style
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5.0;

// painting mode
const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

// mouse event handler
const onMouseMove = (event) => {
  let x = event.offsetX;
  let y = event.offsetY;
  if (!painting || filling) {
    // when moving mouse WITHOUT clicking
    // creating PATH
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // when moving mouse while clicking
    // creating LINE
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleCanvasClick = (event) => {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const handlePaintClick = () => {
  filling = false;
  paintBtn.classList.add('active');
  fillBtn.classList.remove('active');
};

const handleFillClick = () => {
  filling = true;
  fillBtn.classList.add('active');
  paintBtn.classList.remove('active');
};

const handelSaveClick = () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'Painter-JS';
  link.click();
};

const handleRangeChange = (event) => {
  const targetSize = event.target.value;
  ctx.lineWidth = targetSize;
};

const handleColorClick = (event) => {
  const targetColor = event.target.style.backgroundColor;
  ctx.strokeStyle = targetColor;
  ctx.fillStyle = targetColor;
  currentColor.style.color = targetColor;
};

// event listener
if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  // canvas.addEventListener('contextmenu', handleCM); // prevent clicking mouse right button
}

paintBtn.addEventListener('click', handlePaintClick);
fillBtn.addEventListener('click', handleFillClick);
saveBtn.addEventListener('click', handelSaveClick);
range.addEventListener('input', handleRangeChange);
colors.forEach((color) => color.addEventListener('click', handleColorClick));
