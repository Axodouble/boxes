const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resizeCanvas();

const emojis = ["👨‍🦱"];
const boxes = [];
let luigiIndex = -1; // Tracks the index of Luigi
let speed = 2;
let boxesToSpawn = Math.floor((window.innerWidth * window.innerHeight) / 5184); // Adjust for screen size

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

respawnCubes();

canvas.addEventListener("click", (event) => {
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
      alert("You lost! Click on Luigi next time!");
      respawnCubes();
    }
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boxes.forEach((box) => {
    ctx.font = "48px serif";
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
