px = "px"
function TextManager() {
    this.path = "url('assets/font.png') "
    this.textboxpath = "url('assets/textbox4_12_3.png')"
    this.textIndex = 0;
    this.lineSpacing = 5
    this.lineCounter = 0
    this.textoffsetX = 5
    this.textoffsetY = 5
    this.positionLeft = 0
    this.positionBottom = 0
    this.pixelSize = 12 * 2
    this.textboxWidth = 12 * 2 * this.pixelSize;
    this.textboxHeight = 4 * 2 * this.pixelSize;
    this.textboxMaxWidth = 33
    this.textboxMaxHeight = 4
    this.frequency = 10;
    this.char = null
    this.index = 0
    this.length = null
    this.interval = null
    this.audiopath = "assets/sans voice.mp3";
    this.audio = new Audio(this.audiopath);
    this.init_textbox = function () {
        var textboxElement = document.createElement("div")
        textboxElement.id = "textBox"
        textboxElement.style.position = "absolute";
        textboxElement.style.left = this.positionLeft + px;
        textboxElement.style.bottom = this.positionBottom + px;
        textboxElement.style.width = this.textboxWidth + px;
        textboxElement.style.height = this.textboxHeight + px;
        textboxElement.style.background = this.textboxpath;
        document.body.appendChild(textboxElement);
    }
    this.write = function () {
        var im_x, im_y
        switch (this.char) {
            case 'A': case 'a':
                im_x = 0;
                im_y = 0;
                break;
            case 'B': case 'b':
                im_x = -this.pixelSize * 1;
                im_y = 0;
                break;
            case 'C': case 'c':
                im_x = -this.pixelSize * 2;
                im_y = 0;
                break;
            case 'D': case 'd':
                im_x = -this.pixelSize * 3;
                im_y = 0;
                break;
            case 'E': case 'e':
                im_x = -this.pixelSize * 4;
                im_y = 0;
                break;
            case 'F': case 'f':
                im_x = -this.pixelSize * 5;
                im_y = 0;
                break;
            case 'G': case 'g':
                im_x = -this.pixelSize * 6;
                im_y = 0;
                break;
            case 'H': case 'h':
                im_x = -this.pixelSize * 7;
                im_y = 0;
                break;
            case 'I': case 'i':
                im_x = -this.pixelSize * 8;
                im_y = 0;
                break;
            case 'J': case 'j':
                im_x = -this.pixelSize * 9;
                im_y = 0;
                break;
            case 'K': case 'k':
                im_x = -this.pixelSize * 10;
                im_y = 0;
                break;
            case 'L': case 'l':
                im_x = -this.pixelSize * 11;
                im_y = 0;
                break;
            case 'M': case 'm':
                im_x = 0;
                im_y = -this.pixelSize * 1;
                break;
            case 'N': case 'n':
                im_x = -this.pixelSize * 1;
                im_y = -this.pixelSize * 1;
                break;
            case 'O': case 'o':
                im_x = -this.pixelSize * 2;
                im_y = -this.pixelSize * 1;
                break;
            case 'P': case 'p':
                im_x = -this.pixelSize * 3;
                im_y = -this.pixelSize * 1;
                break;
            case 'Q': case 'q':
                im_x = -this.pixelSize * 4;
                im_y = -this.pixelSize * 1;
                break;
            case 'R': case 'r':
                im_x = -this.pixelSize * 5;
                im_y = -this.pixelSize * 1;
                break;
            case 'S': case 's':
                im_x = -this.pixelSize * 6;
                im_y = -this.pixelSize * 1;
                break;
            case 'T': case 't':
                im_x = -this.pixelSize * 7;
                im_y = -this.pixelSize * 1;
                break;
            case 'U': case 'u':
                im_x = -this.pixelSize * 8;
                im_y = -this.pixelSize * 1;
                break;
            case 'V': case 'v':
                im_x = -this.pixelSize * 9;
                im_y = -this.pixelSize * 1;
                break;
            case 'W': case 'w':
                im_x = -this.pixelSize * 10;
                im_y = -this.pixelSize * 1;
                break;
            case 'X': case 'x':
                im_x = -this.pixelSize * 11;
                im_y = -this.pixelSize * 1;
                break;
            case 'Y': case 'y':
                im_x = 0;
                im_y = -this.pixelSize * 2;
                break;
            case 'Z': case 'z':
                im_x = -this.pixelSize * 1;
                im_y = -this.pixelSize * 2;
                break;
            case '0':
                im_x = -this.pixelSize * 2;
                im_y = -this.pixelSize * 2;
                break;
            case '1':
                im_x = -this.pixelSize * 3;
                im_y = -this.pixelSize * 2;
                break;
            case '2':
                im_x = -this.pixelSize * 4;
                im_y = -this.pixelSize * 2;
                break;
            case '3':
                im_x = -this.pixelSize * 5;
                im_y = -this.pixelSize * 2;
                break;
            case '4':
                im_x = -this.pixelSize * 6;
                im_y = -this.pixelSize * 2;
                break;
            case '5':
                im_x = -this.pixelSize * 7;
                im_y = -this.pixelSize * 2;
                break;
            case '6':
                im_x = -this.pixelSize * 8;
                im_y = -this.pixelSize * 2;
                break;
            case '7':
                im_x = -this.pixelSize * 9;
                im_y = -this.pixelSize * 2;
                break;
            case '8':
                im_x = -this.pixelSize * 10;
                im_y = -this.pixelSize * 2;
                break;
            case '9':
                im_x = -this.pixelSize * 11;
                im_y = -this.pixelSize * 2;
                break;
            case '.':
                im_x = 0;
                im_y = -this.pixelSize * 3;
                break;
            case ',':
                im_x = -this.pixelSize * 1;
                im_y = -this.pixelSize * 3;
                break;
            case '!':
                im_x = -this.pixelSize * 2;
                im_y = -this.pixelSize * 3;
                break;
            case '?':
                im_x = -this.pixelSize * 3;
                im_y = -this.pixelSize * 3;
                break;
            case '\'':
                im_x = -this.pixelSize * 4;
                im_y = -this.pixelSize * 3;
                break;
            case '"':
                im_x = -this.pixelSize * 5;
                im_y = -this.pixelSize * 3;
                break;
            case "-":
                im_x = -this.pixelSize * 7;
                im_y = -this.pixelSize * 3;
                break;
            case "(":
                im_x = -this.pixelSize * 8;
                im_y = -this.pixelSize * 3;
                break;
            case ")":
                im_x = -this.pixelSize * 9;
                im_y = -this.pixelSize * 3;
                break;
            case " ":
                this.textIndex++;
                if (this.textIndex >= this.textboxMaxWidth) {
                    this.textIndex = 0;
                    this.lineCounter++;
                }
                return;
            case "\n":
                this.textIndex = 0
                this.lineCounter++;
                return;
            default:
                im_x = -this.pixelSize * 6;
                im_y = -this.pixelSize * 3;
        }
        //if the next position is at the end of the line, instead put a '-' and wrap the letter at the next line
        if ((this.textIndex + 1) >= this.textboxMaxWidth) {
            var charElement = document.createElement("div")
            charElement.style.position = "absolute";
            //minus eight for the character spacing
            charElement.style.left = this.positionLeft + this.textIndex * (this.pixelSize - 8) + this.textoffsetX + px;
            charElement.style.bottom = this.lineCounter * -(this.pixelSize + this.lineSpacing) + (this.textboxHeight - 2 * this.pixelSize + this.textoffsetY) + px;
            charElement.style.width = this.pixelSize + px;
            charElement.style.height = this.pixelSize + px;
            //add the - minus sign
            charElement.style.background = this.path + (-this.pixelSize * 7) + px + " " + (-this.pixelSize * 3) + px;
            document.getElementById("textBox").appendChild(charElement);
            this.textIndex = 0;
            this.lineCounter++;
        }
        else if (this.textindex % this.textboxMaxWidth == 0) {
            this.textIndex = 0;
            this.lineCounter++;
        }
        if (this.lineCounter >= this.textboxMaxHeight) {
            this.textIndex = 0;
            this.lineCounter = 0;
            myNode = document.getElementById("textBox")
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }
        var charElement = document.createElement("div")
        charElement.style.position = "absolute";
        //minus eight for the character spacing
        charElement.style.left = this.positionLeft + this.textIndex * (this.pixelSize - 8) + this.textoffsetX + px;
        charElement.style.bottom = this.lineCounter * -(this.pixelSize + this.lineSpacing) + (this.textboxHeight - 2 * this.pixelSize + this.textoffsetY) + px;
        charElement.style.width = this.pixelSize + px;
        charElement.style.height = this.pixelSize + px;
        charElement.style.background = this.path + im_x + px + " " + im_y + px;
        document.getElementById("textBox").appendChild(charElement);
        this.textIndex++;
    }
    this.read = function (message, posX, posY) {
        this.positionLeft = posX - this.textboxWidth / 2;
        this.positionBottom = posY;
        this.index = 0;
        this.message = message;
        this.length = message.length;
        self = this;
        this.init_textbox();
        this.interval = setInterval(function () { self.getChar() }, 1000 / this.frequency);
    }
    this.getChar = function () {
        if (this.index < this.length) {
            this.char = this.message.charAt(this.index);
            this.write();
            this.index++;
        }
        else {
            clearInterval(this.interval)
            this.index = 0;
        }
    }
}

textmanager = new TextManager()

str = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

textmanager.read(str, 300, 100)