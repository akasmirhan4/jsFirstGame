function gameLogic() {
    //Check for player at the edge of screen i.e 95% and 5%
    if (player.left_screen + player.width > screen.availWidth * 0.95) {
        if (world.left != -world.width + screen.availWidth) {
            player.left_screen = screen.availWidth * 0.05;
            worldAnimation.translate(-screen.availWidth, 0)
            playerAnimation.translate(screen.availWidth * 0.1 + pixelSize, 0);
        }
    }
    else if (player.left_screen < screen.availWidth * 0.05) {
        if (world.left != 0) {
            player.left_screen = screen.availWidth * 0.95 - pixelSize;
            worldAnimation.translate(screen.availWidth, 0);
            playerAnimation.translate(-screen.availWidth * 0.1 - pixelSize, 0);
        }
    }
}