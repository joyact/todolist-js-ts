const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
const range = document.getElementById('range');

const INITIAL_COLOR = '#2c2c2c';
let painting = false;

// pixel modifier : you have to give your canvas size here!
canvas.width = 1000;
canvas.height = 550;

// brush defalut style
ctx.strokeStyle = INITIAL_COLOR;
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
  if (!painting) {
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

const handleRangeChange = (event) => {
  let targetSize = event.target.value;
  ctx.lineWidth = targetSize;
};

const handleColorClick = (event) => {
  let targetColor = event.target.style.backgroundColor;
  ctx.strokeStyle = targetColor;
};

// mouse event
if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

if (range) {
  range.addEventListener('input', handleRangeChange);
}

colors.forEach((color) => color.addEventListener('click', handleColorClick));
