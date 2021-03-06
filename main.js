import Canvas from './js/Canvas.js';
import {map} from './js/Math.js';

const Scene = new Canvas(800, 600);
Scene.background();
Scene.canvas.style.cursor = "none";

const data = Scene.imageData();
const pixels = data.data;

//					   [-2, 1, (y2 + (x2 - x1) * Height / Width), -1.2]
let [x1, x2, y1, y2] = [-2, 1, (-1.2 + (3 * Scene.h / Scene.w)), -1.2];
let zoomW = 40;
let zoomH = 30;
let mx = 0;
let my = 0;
let maxIterations = 500;
const Buffer = new Canvas(Scene.w, Scene.h, false);

draw(maxIterations)
//z = z^2 + c

function render() {
	Scene.context.drawImage(Buffer.canvas, 0, 0);
	Scene.rect(mx - zoomW / 2, my - zoomH / 2, zoomW, zoomH);
	Scene.stroke(255);
}
Scene.canvas.addEventListener('mousemove', e => {
	mx = e.offsetX;
	my = e.offsetY;
	render();
});

document.addEventListener('keydown', e => {
	if(e.code == "ArrowUp") {
		zoomH += 20;
		zoomW += 20 * 4 / 3;
	}
	if(e.code == "ArrowDown") {
		if(zoomH - 20 < 0)
			return;
		zoomH -= 20;
		zoomW -= 20 * 4 / 3;
	}
	render();
});

//Zoom in
Scene.canvas.addEventListener('mousedown', e => {
	if(e.button === 2) {
		return;
	}
	let x = e.offsetX - zoomW / 2;
	let y = e.offsetY - zoomH / 2;

	let newx1 = map(x, 	 0, Scene.w, x1, x2);
	let newx2 = map(x + zoomW, 0, Scene.w, x1, x2);
	let newy1 = map(y, 	 0, Scene.h, y1, y2);
	let newy2 = map(y + zoomH, 0, Scene.h, y1, y2);
	[x1, x2, y1, y2] = [newx1, newx2, newy1, newy2];
	draw(maxIterations);
});

function draw(val) {
	for(let x = 0; x < Scene.w; x++) {
		for(let y = 0; y < Scene.h; y++) {
			let i = 4 * (y * Scene.w + x);
			let a = map(x, 0, Scene.w, x1, x2);
			let b = map(y, 0, Scene.h, y1, y2);

			let n = 0;
			let ca = a;
			let cb = b;
			let limit = val;

			while(n < limit) {
				let aa = a ** 2 - b ** 2;
				let bb = 2 * a * b;
				a = aa + ca;
				b = bb + cb;
				if(Math.abs(a + b) > 20) {
					break;
				}
				n++;
			}
			
			//If the is not growing endlessly color it black
			if(n == limit) {
				pixels[i + 0] = 0;
				pixels[i + 1] = 0;
				pixels[i + 2] = 0;
			} else {
				//If not color it based on its growing speed
				let r = map((n * 10) % limit, limit, 0, 255, 0);
				let g = map((n * 1) % limit, limit, 0, 255, 0);
				let b = map((n * 1) % limit, limit, 0, 255, 0);

				pixels[i + 0] = r;
				pixels[i + 1] = g;
				pixels[i + 2] = b;
			}
		}
	}
	Scene.putImageData(data);
	Buffer.context.drawImage(Scene.canvas, 0, 0);
}
