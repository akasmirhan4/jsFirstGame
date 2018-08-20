var gameObjects = [];
var sceneGameObjects = [];

function deleteGameObjects() {
    //TODO: delete all gameObject
    gameObjects.forEach(function (gameObject) {
        gameObject.delete();
        gameObjects = [];
        sceneGameObjects = [];
    })
}


class gameObject {
    constructor(id, left, bottom, width, height, imagePath, im_x = 0, im_y = 0, layerElement = null) {
        this.id = id;
        this.element = null;
        this.left = left;
        this.bottom = bottom;
        this.left_screen = this.left % screen.availWidth;
        this.bottom_screen = this.bottom % screen.availWidth;
        this.width = width;
        this.height = height;
        this.imagePath = imagePath;
        this.layerElement = layerElement;
        this.im_x = im_x;
        this.im_y = im_y;
        this.interval = null;
        this.states = [];
        this.state = null;
        this.isAnimating = false;
        this.imageInterval = 0;
        this.animate = null;

        gameObjects.push(this);

        this.initialize();

    }
    initialize() {
        var objectElement = document.createElement("div");
        objectElement.id = this.id;

        if (this.layerElement) {
            this.layerElement.appendChild(objectElement);
        }
        else {
            document.body.appendChild(objectElement);
        }
        this.element = document.getElementById(this.id);
        this.element.style.position = 'absolute';
    }
    render() {
        if (this.element) {
            this.element.style.left = this.left + px;
            this.element.style.bottom = this.bottom + px;
            this.element.style.width = this.width + px;
            this.element.style.height = this.height + px;
            if (this.imagePath) {
                this.element.style.background = "url('" + this.imagePath + "') " + this.im_x + px + " " + this.im_y + px;
            }
        }
    }
    delete() {
        this.element.parentNode.removeChild(this.element);
        gameObjects.pop(this);
    }
    setPosition(left, bottom) {
        this.left = left;
        this.bottom = bottom;
        this.left_screen = this.left % screen.availWidth;
        this.bottom_screen = this.bottom % screen.availWidth;
    }
    setImagePath(imagePath) {
        this.imagePath = imagePath;
    }
    setImagePathPosition(im_x, im_y) {
        this.im_x = im_x;
        this.im_y = im_y;
    }
    setLayerElement(layerElement){
        //remove old element
        this.element.parentNode.removeChild(this.element);
        this.layerElement = layerElement;
        this.layerElement.appendChild(this.element)
    }
    isOverlapping(object, marginLeft = 0, marginRight = 0, marginTop = 0, marginBottom = 0) {
        return (this.left + this.width >= object.left + marginLeft &&
            this.left <= object.left + object.width - marginRight &&
            this.bottom + this.height >= object.bottom + marginBottom &&
            this.bottom <= object.bottom + object.height - marginTop);
    }
    setInterval(fps) {
        this.isAnimating = true;
        if (this.interval) {
            clearInterval(this.interval);
        }
        var self = this;
        switch (this.getState(this.state)) {
            case this.getState(0):
                this.isAnimating = false;
                break;
            case this.getState(1):
                this.interval = setInterval(function () {
                    self.Move();
                }, 1000 / fps);
                break;
            case this.getState(2):
                this.interval = setInterval(function () {
                    self.Turn();
                }, 1000 / fps);
                break;
            case this.getState(3):
                this.interval = setInterval(function () {
                    self.Enter();
                }, 1000 / fps);
                break;
            default:
                this.state = 0;
                break;

        }

    }
    clearInterval() {
        this.imageInterval = 0;
        this.isAnimating = false;
        this.setState("IDLE");
        clearInterval(this.interval);
    }
    setStates(...states) {
        for (var n = this.states.length; n < states.length; n++) {
            this.states[n] = states[n];
        }
    }
    setState(state) {
        var index = this.getStateIndex(state);
        if (index != -1)
            this.state = index;
        else
            console.log("the state does not exist");
    }
    getState(index) {
        return this.states[index];
    }
    getStateIndex(state) {
        return this.states.indexOf(state);
    }
}

function getBackgroundPosition(imagePath, tile_x, tile_y, pixelSize) {
    return ("url(" + imagePath + ") " + (-pixelSize * tile_x) + px + " " + (-pixelSize * tile_y) + px);
}
