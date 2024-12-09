const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resizeCanvas();

const emojis = ["👨‍🦱"];
const boxes = [];
let luigiIndex = -1; // Tracks the index of Luigi
let speed = 2;
let boxesToSpawn = Math.floor((window.innerWidth * window.innerHeight) / 5184); // Adjust for screen size

let disableClick = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

respawnCubes();

canvas.addEventListener("click", (event) => {
  if (disableClick) return;
  const { clientX, clientY } = event;
  const clickedBox = boxes.find(
    (box) =>
      clientX >= box.x &&
      clientX <= box.x + box.width &&
      clientY >= box.y &&
      clientY <= box.y + box.height
  );

  if (clickedBox) {
    if (clickedBox.emoji === "👨‍🦲") {
      respawnCubes(); // Found Luigi!
    } else {
      // Hide all boxes that are not luigi and pause the game for 2 seconds and then respawn
      boxes.forEach((box) => {
        if (box.emoji !== "👨‍🦲") {
          disableClick = true;

          setTimeout(() => {
            box.opacity = 0.9;
          }, 100);
          setTimeout(() => {
            box.opacity = 0.8;
          }, 200);
          setTimeout(() => {
            box.opacity = 0.7;
          }, 300);
          setTimeout(() => {
            box.opacity = 0.6;
          }, 400);
          setTimeout(() => {
            box.opacity = 0.5;
          }, 500);
          setTimeout(() => {
            box.opacity = 0.4;
          }, 600);
          setTimeout(() => {
            box.opacity = 0.3;
          }, 700);
          setTimeout(() => {
            box.opacity = 0.2;
          }, 800);
        }
      });

      setTimeout(() => {
        respawnCubes();
      }, 2000);
    }
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boxes.forEach((box) => {
    ctx.font = "48px serif";
    ctx.globalAlpha = box.opacity;
    ctx.fillText(box.emoji, box.x, box.y + box.height);
  });
}

function update() {
  boxes.forEach((box) => {
    box.x += box.dx;
    box.y += box.dy;

    if (box.x <= 0 || box.x >= canvas.width - box.width) {
      box.dx *= -1;
    }
    if (box.y <= 0 || box.y >= canvas.height - box.height) {
      box.dy *= -1;
    }
  });
}

function respawnCubes() {
  disableClick = false;
  boxes.length = 0; // Clear the array

  for (let i = 0; i < boxesToSpawn; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const box = {
      x: Math.random() * (canvas.width - 50), // Random position
      y: Math.random() * (canvas.height - 50), // Random position
      width: 40, // Fixed size
      height: 40, // Fixed size
      dx: (Math.random() - 0.5) * speed * 2, // Random speed in x direction
      dy: (Math.random() - 0.5) * speed * 2, // Random speed in y direction
      emoji: emoji,
      opacity: 1,
    };

    boxes.push(box);
  }

  // Ensure Luigi is in the boxes
  luigiIndex = Math.floor(Math.random() * boxes.length);
  boxes[luigiIndex].emoji = "👨‍🦲";
}

function loop() {
  draw();
  update();
  requestAnimationFrame(loop);
}

loop();
