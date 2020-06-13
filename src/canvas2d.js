export function getCanvas2dRender() {
  let canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 50;

  let ctx = canvas.getContext("2d");

  ctx.font = "21.5px Arial";
  ctx.fillText("😉", 0, 20);

  ctx.font = "15.7px serif";
  ctx.fillText("abcdefghijklmnopqrtsuvwxyz", 0, 40);

  ctx.font = "20.5px Arial";
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "red");
  gradient.addColorStop(0.5, "green");
  gradient.addColorStop(1.0, "blue");
  ctx.fillStyle = gradient;
  ctx.fillText("Lorem ipsum!", 30, 20);

  ctx.beginPath();
  ctx.moveTo(170, 5);
  ctx.lineTo(160, 25);
  ctx.lineTo(185, 20);
  ctx.fill();

  return canvas.toDataURL();
}
