class House extends gameObject{
    constructor(id, left, bottom, width, height, imagePath, im_x = 0, im_y = 0) {
        super(id, left, bottom, width, height, imagePath, im_x, im_y, document.getElementById("layer1"));
        this.parentsAwaken = false;
        this.hasChild = true;
        sceneGameObjects.push(this);
        this.setStates("UNINTERACTED","INTERACTED");
        this.setState("UNINTERACTED")
    }
    interact(){
        this.setImagePathPosition(0,-this.height);
        this.parentsAwaken = true;
        EnteringHouse();
    }
}