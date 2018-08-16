bool_togglePlayerPosition = false;
bool_toggleWorldEdge = false;
function togglePlayerPosition() {
    if (bool_togglePlayerPosition) {
        bool_togglePlayerPosition = false;
        textPosition.delete();
    }
    else {
        bool_togglePlayerPosition = true;
        textPosition = new TextManager();
        str = player.left + "," + player.bottom;
        textPosition.read(str, player.left, player.bottom, false, true)
    }
}

function toggleWorldEdge() {
    if (bool_toggleWorldEdge) {
        bool_toggleWorldEdge = false;
        var element = document.getElementById("test_box");
        element.parentNode.removeChild(element);
    }
    else {
        bool_toggleWorldEdge = true;
        test_box = document.createElement("div")
        test_box.id = "test_box"
        document.getElementById("layer3").appendChild(test_box);
        test_block = document.createElement("div");
        test_block.style.backgroundColor = "#FF0000"
        test_block.style.width = screen.availWidth * 0.1 + px
        test_block.style.height = screen.availHeight + px
        test_block.style.position = "fixed"
        test_block.style.bottom = 0 + px
        test_block.style.left = screen.availWidth * 0.95 + px
        document.getElementById("test_box").appendChild(test_block);
        test_block = document.createElement("div");
        test_block.style.backgroundColor = "#FF0000"
        test_block.style.width = screen.availWidth * 0.1 + px
        test_block.style.height = screen.availHeight + px
        test_block.style.position = "fixed"
        test_block.style.bottom = 0 + px
        test_block.style.left = -screen.availWidth * 0.05 + px
        document.getElementById("test_box").appendChild(test_block);
    }
}