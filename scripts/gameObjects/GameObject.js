function gameObject(id, left, bottom, width, height,
    imagePath,layer = 2) {
    this.id = id;
    this.left = left;
    this.bottom = bottom;
    this.left_screen = this.left % screen.availWidth;
    this.bottom_screen = this.bottom % screen.availWidth;
    this.width = width;
    this.height = height;
    this.imagePath = imagePath;
    this.layer = layer;
    this.im_x = 0;
    this.im_y = 0;
    this.initialize = function(){
        var objectElement = document.createElement("div")
        objectElement.id = this.id
        document.getElementById("layer"+this.layer).appendChild(objectElement)
        document.getElementById(this.id).style.position = 'absolute';
    }
    this.render = function () {
        document.getElementById(this.id).style.left = this.left + px;
        document.getElementById(this.id).style.bottom = this.bottom + px;
        document.getElementById(this.id).style.width = this.width + px;
        document.getElementById(this.id).style.height = this.height + px;
        document.getElementById(this.id).style.background = "url('" + this.imagePath + "') " + this.im_x + px + " " + this.im_y + px;
    }
    this.delete = function(){
        var Objectelement = document.getElementById(this.id);
        Objectelement.parentNode.removeChild(Objectelement);
        delete this;
    }
    this.setPosition = function(left,bottom){
        this.left = left;
        this.right = right;
    }
    this.setImagePath = function(imagePath){
        this.imagePath = imagePath;
    }
    this.setImagePathPosition = function(im_x,im_y){
        this.im_x = im_x;
        this.im_y = im_y;
    }
    this.initialize();
    this.isOverlapping = function(object,marginLeft = 0,marginRight = 0,marginTop = 0, marginBottom = 0){
        return  (this.left+this.width>=object.left+marginLeft &&
                this.left<=object.left+object.width-marginRight &&
                this.bottom+this.height>=object.bottom+marginBottom &&
                this.bottom<= object.bottom+object.height-marginTop)
    }
}