function gameLogic() {
    //Check for player at the edge of screen i.e 95% and 5%
    if (player.left_screen + player.width > screen.availWidth * 0.95) {
        if (player.left <= world.width - screen.availWidth) {
            player.left_screen = screen.availWidth * 0.1;
            worldAnimation.translate(-screen.availWidth, 0)
            playerAnimation.translate(screen.availWidth * 0.15 + pixelSize, 0);
        }
    }
    else if (player.left_screen < screen.availWidth * 0.05) {
        if (player.left >= screen.availWidth) {
            player.left_screen = screen.availWidth * 0.9 - pixelSize;
            worldAnimation.translate(screen.availWidth, 0);
            playerAnimation.translate(-screen.availWidth * 0.15 - pixelSize, 0);
        }
    }
}