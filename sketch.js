let stars = [];
let colors = [
  "#fbf8cc", "#fde4cf", "#ffcfd2", "#f1c0e8", "#cfbaf0",
  "#a3c4f3", "#90dbf4", "#8eecf5", "#98f5e1", "#b9fbc0"
];
let sparks = []; // 儲存火花的陣列
let colorIndex = 0; // 用於控制漸變的顏色索引

function setup() {
  createCanvas(windowWidth, windowHeight); // 設置全螢幕大小
  background(255); // 背景為白色

  // 隨機生成40個星星
  for (let i = 0; i < 40; i++) {
    let x = random(width);
    let y = random(height);
    let color = random(colors);
    stars.push({ x, y, size: 25, color });
  }
}

function draw() {
  background(255); // 每次重繪背景為白色

  // 更新顏色索引以實現漸變
  colorIndex = (colorIndex + 0.01) % colors.length;

  // 繪製星星
  for (let star of stars) {
    let d = dist(mouseX, mouseY, star.x, star.y);
    let size = map(d, 0, 200, 40, 25); // 根據滑鼠距離調整大小
    size = constrain(size, 25, 40); // 限制大小範圍

    // 計算漸變顏色
    let nextColorIndex = (floor(colorIndex) + 1) % colors.length;
    let lerpedColor = lerpColor(
      color(colors[floor(colorIndex)]),
      color(colors[nextColorIndex]),
      colorIndex % 1
    );

    drawStar(star.x, star.y, size, lerpedColor);
  }

  // 繪製火花
  for (let i = sparks.length - 1; i >= 0; i--) {
    let spark = sparks[i];
    fill("#ffd670");
    noStroke();
    ellipse(spark.x, spark.y, spark.size);
    spark.size -= 0.5; // 火花逐漸縮小
    if (spark.size <= 0) {
      sparks.splice(i, 1); // 移除消失的火花
    }
  }
}

// 繪製五角星的函數
function drawStar(x, y, radius, color) {
  push();
  translate(x, y);
  fill(color);
  noStroke();
  beginShape();
  for (let i = 0; i < 10; i++) {
    let angle = TWO_PI / 10 * i;
    let r = i % 2 === 0 ? radius : radius / 2;
    let sx = cos(angle) * r;
    let sy = sin(angle) * r;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}

// 滑鼠移動時產生火花
function mouseMoved() {
  for (let i = 0; i < 5; i++) { // 每次滑鼠移動產生5個火花
    let x = mouseX + random(-10, 10);
    let y = mouseY + random(-10, 10);
    sparks.push({ x, y, size: random(5, 10) });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
}
