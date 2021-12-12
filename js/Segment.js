import {Vector2} from './Math.js';

export default class Segment {
	constructor(x, y, len, angle) {
		this.a = new Vector2(x, y);
		this.b = new Vector2(0, 0);
		this.len = len;
		this.angle = -angle;
	}

	initEnd() {
		const rad = this.angle * Math.PI / 180;
		this.b.x = this.a.x + this.len * Math.cos(rad);
		this.b.y = this.a.y + this.len * Math.sin(rad);
	}

	initStart() {
		const rad = this.angle * Math.PI / 180;
		this.a.x = this.b.x - this.len * Math.cos(rad);
		this.a.y = this.b.y - this.len * Math.sin(rad);
	}
	
	copy() {
		let seg = new Segment(
			this.a.x,
			this.a.y,
			this.len,
			this.angle
		);
		seg.b = this.b.copy();
		return seg;
	}
}
