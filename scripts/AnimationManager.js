class Animate {
    constructor(object) {
        this.object = object;
        this.left_to_be = null;
        this.bottom_to_be = null;
        this.interval = null;
        this.speed = null;
    }
    translate(dx, dy, fps = 60, speed = 32) {
        this.speed = speed;
        this.left_to_be = this.object.left + dx;
        this.bottom_to_be = this.object.bottom + dy;
        var self = this;
        this.interval = window.setInterval(function () {
            dx = self.left_to_be - self.object.left;
            dy = self.bottom_to_be - self.object.bottom;
            if (Math.abs(self.object.left - self.left_to_be +
                self.object.bottom - self.bottom_to_be) < 0.01) {
                clearInterval(self.interval);
                self.object.setPosition(self.left_to_be, self.bottom_to_be);
            }
            else {
                if (dx > 0) {
                    self.object.setPosition(self.object.left + self.speed, self.object.bottom);
                    //if the object surpass the destination
                    if (self.object.left > self.left_to_be) {
                        self.object.setPosition(self.left_to_be, self.bottom_to_be);
                    }
                }
                else if (dx < 0) {
                    self.object.setPosition(self.object.left - self.speed, self.object.bottom);
                    //if the object surpass the destination
                    if (self.object.left < self.left_to_be) {
                        self.object.setPosition(self.left_to_be, self.object.bottom);
                    }
                }
                if (dy > 0) {
                    self.object.setPosition(self.object.left, self.object.bottom + self.speed);
                    //if the object surpass the destination
                    if (self.object.bottom > self.bottom_to_be) {
                        self.object.setPosition(self.object.left, self.bottom_to_be);
                    }
                }
                else if (dy < 0) {
                    self.object.setPosition(self.object.left, self.object.bottom - self.speed);
                    //if the object surpass the destination
                    if (self.object.bottom < self.bottom_to_be) {
                        self.object.setPosition(self.object.left, self.bottom_to_be);
                    }
                }
            }
        }, 1000 / fps);
    };
}
