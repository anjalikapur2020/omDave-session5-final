var splash
var gameState = "wait"
var playbutton, soundonbutton, soundoffbutton, arrow, arrowImg, obstacleGroup, arrowGroup;
var backgroundImg, player, zombie, bgSound, playerimg;
var arrows = [];
var score = 0;
var score1 = 0;

function preload() {
    splash = loadImage("splash.gif")
    backgroundImg = loadImage("Background.jpg")
    playerimg = loadImage("HunterImage.png")
    zombie = loadImage("GhostImg.jpg")
    bgSound = loadSound("BackgroundMusicSound.mp3")
    level1bg = loadImage("Background.jpg")
    arrowImg = loadImage("ArrowImg.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("StartButtonImage.png")
    playbutton.position(20, height / 2.5)
    playbutton.size(155, 140);

    soundonbutton = createImg("SoundButtonOn.png")
    soundonbutton.position(width - 150, playbutton.y - 25)
    soundonbutton.size(150, 175)
    soundonbutton.mouseClicked(mute)


    soundoffbutton = createImg("SoundButtonOff.png")
    soundoffbutton.position(width - 150, playbutton.y - 25)
    soundoffbutton.size(150, 175)
    soundoffbutton.hide()
    soundoffbutton.mouseClicked(mute)

    bgSound.play()

    ground = createSprite(0, 0, width, height)
    ground.addImage(level1bg)
    ground.visible = false
    ground.x = ground.width / 2
    ground.scale = 3.35

    player = createSprite(width / 2, height - 200);
    player.addImage(playerimg);
    player.scale = 0.7
    player.visible = false;
    // player.debug = true
    player.setCollider("rectangle", 0, 0, player.width / 2, player.height)



    // arrow.addImage(playerimg);
    // arrow.scale=0.7
    // arrow.visible=false;



    obstacleGroup = new Group()
    //    arrowGroup =new Group()
}

function draw() {

    if (gameState === "wait") {
        background(splash)
        // if (!bgSound.isPlaying) {
        //     bgSound.play()
        // }


    }

    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
    })

    if (gameState == "level1") {
        background(level1bg)
        player.visible = true;
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()
        ground.visible = true
        //    ground.velocityY=-5
        ground.velocityX = -5

        if (ground.x < 0) {
            ground.x = ground.width / 2
        }


        if (keyDown("space")) {
            createarrow()

        }

        if (keyDown("RIGHT_ARROW")) {
            player.x += 5

        }
        if (keyDown("UP_ARROW")) {
            player.y -= 5
        }
        if (keyDown("DOWN_ARROW")) {
            player.y += 5
        }


        if (player.x > width) {
            player.x = 100
        }

        if (player.y <= 100) {
            player.y = 100
        }
        if (player.y >= height - 100) {
            player.y = height - 100
        }


        for (i = 0; i < arrows.length; i++) {
            if (arrows[i].isTouching(obstacleGroup)) {

                score += 5
                console.log(score)
                obstacleGroup.destroyEach()
                // arrows.pop()


            }
        }

        if (player.isTouching(obstacleGroup)) {
            score -= 3
            obstacleGroup.destroyEach()
            console.log(score)

        }

        if (score < 0) {
            gameState = "over"
        }



        addobstacles()


        if (score >= 10) {
            gameState = "level1overstate"
        }

    }


    if (gameState == "level1overstate") {
        level1over()
    }


    if (gameState == "level2") {
        background(level1bg)
        player.visible = true;
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()
        ground.visible = true
        //    ground.velocityY=-5
        ground.velocityX = -5

        if (ground.x < 0) {
            ground.x = ground.width / 2
        }


        if (keyDown("space")) {
            createarrow()

        }

        if (keyDown("RIGHT_ARROW")) {
            player.x += 5

        }
        if (keyDown("UP_ARROW")) {
            player.y -= 5
        }
        if (keyDown("DOWN_ARROW")) {
            player.y += 5
        }


        if (player.x > width) {
            player.x = 100
        }

        if (player.y <= 100) {
            player.y = 100
        }
        if (player.y >= height - 100) {
            player.y = height - 100
        }


        for (i = 0; i < arrows.length; i++) {
            if (arrows[i].isTouching(obstacleGroup)) {

                score1 += 5
                
                obstacleGroup.destroyEach()
                arrows.pop()



            }
        }

        if (player.isTouching(obstacleGroup)) {
            score1 -= 3
            console.log(score)

            obstacleGroup.destroyEach()


        }

        if (score1 >=10) {
            gameState = "win"
        }

        addobstacles()
        if (score1 < 0) {
            gameState = "over"
        }


    }

    if (gameState == "over") {

        gameOver()
    }

    if (gameState == "win") {

        gameWin()
    }

    drawSprites()





    if (gameState == "level1") {
        textSize(50)
        fill("black")
        stroke("yellow")
        strokeWeight(2)
        text("LEVEL 1", 50, 80)
        text("SCORE : " + score, width - width / 4, 80);


    }
    if (gameState == "level2") {
        textSize(50)
        fill("black")
        stroke("yellow")
        strokeWeight(2)
        text("LEVEL 2", 50, 80)
        text("SCORE : " + score1, width - width / 4, 80);


    }


}

function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        soundoffbutton.show();
        soundonbutton.hide();
        console.log("mute")
    }
    else {
        soundonbutton.show()
        soundoffbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}

function createarrow() {
    arrow = createSprite(player.x+100, player.y-50);
    arrow.velocityX = 2
    arrow.addImage(arrowImg)
    arrow.tint = "red"

    if (gameState == "level1") {
        arrow.velocityX = 5
    }
    if (gameState == "level2") {
        arrow.velocityX = 5
    }
    arrow.scale = .50

    arrows.push(arrow)


}



function addobstacles() {


    if (frameCount % 150 == 0) {
        var obstacle = createSprite(width, height - 150)
        var rand = Math.round(random(100, height - 150))
        obstacle.y = rand
        obstacle.addImage(zombie)
        obstacle.scale = 0.05
        obstacle.debug = true
        obstacle.setCollider("rectangle", 0, 0, obstacle.width / 2, obstacle.height)
        obstacleGroup.add(obstacle)

        if (gameState == "level1") {
            obstacle.velocityX = -5
        }
        if (gameState == "level2") {
            obstacle.velocityX = -10
        }



    }


}

function gameOver() {
    swal(
        {

            title: `You LOST!!!`,
            text: "Get back to the Misson Again",
            imageUrl: "GhostImg.jpg",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {

            window.location.reload();
        }

    )
}


function gameWin() {
    swal(
        {

            title: `You WON!!!`,
            text: "Get back to the Misson Again",
            imageUrl: "HunterImage.png",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {

            window.location.reload();
        }

    )
}


// //level 3 won function
function level1over() {

    swal(
        {

            title: `KUDOS!! \n You destroyed the GHOSTS!!!`,
            text: "OMG!! Now more are on their way!!",
            imageUrl: "HunterImage.png",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {
            gameState = "level2";
        }

    )
}



