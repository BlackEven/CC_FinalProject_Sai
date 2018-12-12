class Ripple {
	constructor(x = 0, y = 0, v = 1, r = 0, t = 0) {
		this.x = x;
		this.y = y;
		this.v = v;
		this.r = r;
		this.t = t;
	}

	move() {
		//radius is changed by velocity
		this.r += this.v;
		//time increase
		this.t++;
	}

	display() {
		//the transparency of the stroke is inversely proportional to the time
		stroke(255, 255 * sq((LIFE_TIME - this.t) / LIFE_TIME));
		strokeWeight(4);
		noFill();
		ellipse(this.x, this.y, 2 * this.r);
	}

	reflect(b) {
		let ripples = [];
		//get sprites' location and size
		var rx = b.position.x;
		var ry = b.position.y;
		var rw = b.originalWidth;
		var rh = b.originalHeight;
		//Wall
		// //left
		// if (abs(this.x - this.r) < this.v)
		// 	ripples.push(new Ripple(-this.r, this.y, this.v, this.r, this.t));
		// //right
		// if (abs(this.x + this.r - width) < this.v)
		// 	ripples.push(new Ripple(width + this.r, this.y, this.v, this.r, this.t));
		// //up
		// if (abs(this.y - this.r) < this.v)
		// 	ripples.push(new Ripple(this.x, -this.r, this.v, this.r, this.t));
		// //buttom
		// if (abs(this.y + this.r - height) < this.v)
		// 	ripples.push(new Ripple(this.x, height + this.r, this.v, this.r, this.t));

		//Sprites
		//right side
		if (this.x > rx + rw/2) {
			if (this.y > ry - rh/2 && this.y < ry + rh/2) {
				if (abs(this.x - this.r - rx - rw/2) < this.v)
					ripples.push(new Ripple(rx + rw/2, this.y, this.v, 0, this.t))
			}
		}
		//left side
		if (this.x < rx - rw/2) {
			if (this.y > ry - rh/2 && this.y < ry + rh/2) {
				if (abs(this.x + this.r - rx + rw/2 ) < this.v)
					ripples.push(new Ripple(rx - rw/2, this.y, this.v, 0, this.t))
			}
		}
		//up
		if (this.y < ry - rh/2) {
			if (this.x > rx -rw/2 && this.x < rx + rw/2) {
				if (abs(this.y + this.r - ry + rh/2) < this.v)
					ripples.push(new Ripple(this.x, ry - rh/2, this.v, 0, this.t))
			}
		}
		//buttom
		if (this.y > ry + rh/2) {
			if (this.x > rx -rw/2 && this.x < rx + rw/2) {
				if (abs(this.y - this.r - ry - rh/2) < this.v)
					ripples.push(new Ripple(this.x, ry + rh/2, this.v, 0, this.t))
			}
		}
		return ripples
	}
}