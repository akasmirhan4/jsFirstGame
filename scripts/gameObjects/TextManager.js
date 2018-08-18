px = "px"

class TextManager {
    constructor(id, left, bottom, ObjectWidth, ObjectHeight, isStatic = false) {
        this.textbox = new gameObject(id, left-2.25*pixelSize, bottom+pixelSize, 4.5 * pixelSize, 1.5 * pixelSize, 'assets/textbox4_12_3.png', 0, 0, 1);
        this.id = id;
        this.fontPath = "url('assets/font.png') "
        this.left = 0
        this.bottom = 0
        this.width = ObjectWidth;
        this.height = ObjectHeight;
        this.message = null;        //Hold the message
        this.isStatic = isStatic;   //Keep the message static forever
        this.textIndex = 0;         //Keep track of the characters in a line
        this.isReady = true;        //ready for next message
        this.lineSpacing = 5        //padding between lines
        this.lineCounter = 0        //Keep track of lines in the textbox
        this.textoffsetX = 24        //padding from left
        this.textoffsetY = 0        //padding from top
        this.characterSize = 24     //Pixel size of each character
        this.textboxMaxWidth = 33   //How many characters can a line hold in the textbox
        this.textboxMaxHeight = 4   //How many lines can the textbox hold
        this.frequency = 10;        //Characters/second
        this.char = null            //Keep track of the current character
        this.index = 0              //Keep track of the index from the message
        this.interval = null        //Keep track of the setInterval() function

        //Play audio with text
        this.audiopath = "assets/sans voice.mp3";
        this.audio = new Audio(this.audiopath);
    }
    write() {
        var im_x, im_y
        //Get the location of each character in the font picture
        switch (this.char) {
            case 'A': case 'a':
                im_x = 0;
                im_y = 0;
                break;
            case 'B': case 'b':
                im_x = -this.characterSize * 1;
                im_y = 0;
                break;
            case 'C': case 'c':
                im_x = -this.characterSize * 2;
                im_y = 0;
                break;
            case 'D': case 'd':
                im_x = -this.characterSize * 3;
                im_y = 0;
                break;
            case 'E': case 'e':
                im_x = -this.characterSize * 4;
                im_y = 0;
                break;
            case 'F': case 'f':
                im_x = -this.characterSize * 5;
                im_y = 0;
                break;
            case 'G': case 'g':
                im_x = -this.characterSize * 6;
                im_y = 0;
                break;
            case 'H': case 'h':
                im_x = -this.characterSize * 7;
                im_y = 0;
                break;
            case 'I': case 'i':
                im_x = -this.characterSize * 8;
                im_y = 0;
                break;
            case 'J': case 'j':
                im_x = -this.characterSize * 9;
                im_y = 0;
                break;
            case 'K': case 'k':
                im_x = -this.characterSize * 10;
                im_y = 0;
                break;
            case 'L': case 'l':
                im_x = -this.characterSize * 11;
                im_y = 0;
                break;
            case 'M': case 'm':
                im_x = 0;
                im_y = -this.characterSize * 1;
                break;
            case 'N': case 'n':
                im_x = -this.characterSize * 1;
                im_y = -this.characterSize * 1;
                break;
            case 'O': case 'o':
                im_x = -this.characterSize * 2;
                im_y = -this.characterSize * 1;
                break;
            case 'P': case 'p':
                im_x = -this.characterSize * 3;
                im_y = -this.characterSize * 1;
                break;
            case 'Q': case 'q':
                im_x = -this.characterSize * 4;
                im_y = -this.characterSize * 1;
                break;
            case 'R': case 'r':
                im_x = -this.characterSize * 5;
                im_y = -this.characterSize * 1;
                break;
            case 'S': case 's':
                im_x = -this.characterSize * 6;
                im_y = -this.characterSize * 1;
                break;
            case 'T': case 't':
                im_x = -this.characterSize * 7;
                im_y = -this.characterSize * 1;
                break;
            case 'U': case 'u':
                im_x = -this.characterSize * 8;
                im_y = -this.characterSize * 1;
                break;
            case 'V': case 'v':
                im_x = -this.characterSize * 9;
                im_y = -this.characterSize * 1;
                break;
            case 'W': case 'w':
                im_x = -this.characterSize * 10;
                im_y = -this.characterSize * 1;
                break;
            case 'X': case 'x':
                im_x = -this.characterSize * 11;
                im_y = -this.characterSize * 1;
                break;
            case 'Y': case 'y':
                im_x = 0;
                im_y = -this.characterSize * 2;
                break;
            case 'Z': case 'z':
                im_x = -this.characterSize * 1;
                im_y = -this.characterSize * 2;
                break;
            case '0':
                im_x = -this.characterSize * 2;
                im_y = -this.characterSize * 2;
                break;
            case '1':
                im_x = -this.characterSize * 3;
                im_y = -this.characterSize * 2;
                break;
            case '2':
                im_x = -this.characterSize * 4;
                im_y = -this.characterSize * 2;
                break;
            case '3':
                im_x = -this.characterSize * 5;
                im_y = -this.characterSize * 2;
                break;
            case '4':
                im_x = -this.characterSize * 6;
                im_y = -this.characterSize * 2;
                break;
            case '5':
                im_x = -this.characterSize * 7;
                im_y = -this.characterSize * 2;
                break;
            case '6':
                im_x = -this.characterSize * 8;
                im_y = -this.characterSize * 2;
                break;
            case '7':
                im_x = -this.characterSize * 9;
                im_y = -this.characterSize * 2;
                break;
            case '8':
                im_x = -this.characterSize * 10;
                im_y = -this.characterSize * 2;
                break;
            case '9':
                im_x = -this.characterSize * 11;
                im_y = -this.characterSize * 2;
                break;
            case '.':
                im_x = 0;
                im_y = -this.characterSize * 3;
                break;
            case ',':
                im_x = -this.characterSize * 1;
                im_y = -this.characterSize * 3;
                break;
            case '!':
                im_x = -this.characterSize * 2;
                im_y = -this.characterSize * 3;
                break;
            case '?':
                im_x = -this.characterSize * 3;
                im_y = -this.characterSize * 3;
                break;
            case '\'':
                im_x = -this.characterSize * 4;
                im_y = -this.characterSize * 3;
                break;
            case '"':
                im_x = -this.characterSize * 5;
                im_y = -this.characterSize * 3;
                break;
            case "-":
                im_x = -this.characterSize * 7;
                im_y = -this.characterSize * 3;
                break;
            case "(":
                im_x = -this.characterSize * 8;
                im_y = -this.characterSize * 3;
                break;
            case ")":
                im_x = -this.characterSize * 9;
                im_y = -this.characterSize * 3;
                break;
            case " ":
                this.textIndex++;
                if (this.textIndex >= this.textboxMaxWidth) {
                    this.textIndex = 0;
                    this.lineCounter++;
                }
                else if (this.textIndex + 1 >= this.textboxMaxWidth) {
                    this.textIndex = 0;
                    this.lineCounter++;
                }
                return;
            case "\n":
                this.textIndex = 0
                this.lineCounter++;
                return;
            default:
                im_x = -this.characterSize * 6;
                im_y = -this.characterSize * 3;
        }

        //if the next position is at the end of the line,
        //instead put a '-' and wrap the letter at the next line
        if ((this.textIndex + 1) >= this.textboxMaxWidth) {

            var charElement = document.createElement("div")
            charElement.style.position = "absolute";

            //minus eight for the character spacing
            charElement.style.left = this.textIndex * (this.characterSize - 8) + this.textoffsetX + px;
            charElement.style.bottom = this.lineCounter * -(this.characterSize + this.lineSpacing) + (this.textboxHeight - 2 * this.characterSize + this.textoffsetY) + px;
            charElement.style.width = this.characterSize + px;
            charElement.style.height = this.characterSize + px;

            //add the - minus sign
            charElement.style.background = this.fontPath + (-this.characterSize * 7) + px + " " + (-this.characterSize * 3) + px;
            document.getElementById(this.id).appendChild(charElement);
            this.textIndex = 0;
            this.lineCounter++;
        }

        //If end of line
        else if (this.textindex % this.textboxMaxWidth == 0) {
            this.textIndex = 0;
            this.lineCounter++;
        }

        //If end of textbox
        if (this.lineCounter >= this.textboxMaxHeight) {
            var tempIndex = this.index;
            this.clearText();
            this.index = tempIndex;
        }
        var charElement = document.createElement("div")
        charElement.style.position = "absolute";
        //minus eight for the character spacing
        charElement.style.left = this.textIndex * (this.characterSize - 8) + this.textoffsetX + px;
        charElement.style.bottom = this.lineCounter * -(this.characterSize + this.lineSpacing) + (this.textbox.height - 2 * this.characterSize + this.textoffsetY) + px;
        charElement.style.width = this.characterSize + px;
        charElement.style.height = this.characterSize + px;
        charElement.style.background = this.fontPath + im_x + px + " " + im_y + px;
        document.getElementById(this.id).appendChild(charElement);
        this.textIndex++;
    }

    read(message, left, bottom, isAnimated = true, isStatic = false) {
        this.isStatic = isStatic;
        this.isReady = false
        this.textbox.setPosition(left, bottom);

        this.index = 0;
        this.message = message;
        self = this;

        if (isAnimated) {
            this.interval = setInterval(function () { self.getChar() }, 1000 / this.frequency);
        }
        else {
            while (this.index < this.message.length) {
                self.getChar();
            }
        }
    }
    getChar() {
        if (this.index < this.message.length) {
            this.char = this.message.charAt(this.index);
            this.write();
            this.index++;
        }
        else if (!isStatic) {
            clearInterval(this.interval)
            this.index = 0;
            //delete text after a few second
            var self = this;
            setTimeout(function () { self.clearText() }, 2000)
            this.isReady = true;
        }
    }
    setPosition(left, bottom) {
        this.textbox.setPosition(left-this.textbox.width/2+this.width, bottom+this.height-this.textbox.height/8);
    }
    setText(str) {
        this.clearText();
        this.message = str;
        while (this.index < this.message.length) {
            self.getChar();
        }
    }
    clearText() {
        this.index = 0;
        this.textIndex = 0;
        this.lineCounter = 0;
        if (this.interval) {
            clearInterval(this.interval);
        }
        var myNode = document.getElementById(self.id)
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }
    delete() {
        this.textbox.delete();
        delete this.textbox;
    }

    render(){
        this.textbox.render();
    }
}
