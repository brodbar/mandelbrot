export default class Canvas {
	constructor(w, h, append = true) {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.canvas.width = w;
		this.canvas.height = h;
		this.w = w;
		this.h = h;
		if(append) {
			document.body.appendChild(this.canvas);
		}
	}

	imageData() {
		return this.context.getImageData(
			0, 0,
			this.w, this.h
		);
	}

	pixels() {
		return this.imageData().data;
	}

	putImageData(data) {
		this.context.putImageData(data, 0, 0);
	}
	
	noSmooth() {
		this.canvas.style = "image-rendering: pixelated";
	}

	border() {
		const ctx = this.context;
		ctx.save();
			this.line(0, 0, this.w, 0, "red");
			this.line(this.w, 0, this.w, this.h, "red");
			this.line(this.w, this.h, 0, this.h, "red");
			this.line(0, this.h, 0, 0, "red");
		ctx.restore();
	}

	line(x1, y1, x2, y2, color = null) {
		const ctx = this.context;
		ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			if(color) {
				this.stroke(color);
			}
		ctx.closePath();
	}

	arc(x, y, r) {
		const ctx = this.context;
		ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.closePath();
	}

	rect(x, y, w, h) {
		const ctx = this.context;
		ctx.beginPath();
			ctx.rect(x, y, w, h);
		ctx.closePath();
	}

	background(color) {
		this.context.beginPath();
			this.rect(0, 0, this.w, this.h);
		this.context.closePath();
		this.fill(color);
	}

	stroke(r, g = null, b = null) {
		const ctx = this.context;
		ctx.save();
			g |= r;
			b |= r;
			ctx.strokeStyle = isNaN(r) ? r : `rgb(${r}, ${g}, ${b}`;
			ctx.stroke();
		ctx.restore();
	}

	fill(r, g = null, b = null) {
		const ctx = this.context;
		ctx.save();
			g |= r;
			b |= r;
			ctx.fillStyle = isNaN(r) ? r : `rgb(${r}, ${g}, ${b}`;
			ctx.fill();
		ctx.restore();
	}

	clear() {
		this.context.clearRect(0, 0, this.w, this.h);
	}
}
