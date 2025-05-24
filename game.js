// Init Renderer
const canvas = document.getElementById("mainCanvas")
const draw = canvas.getContext("2d")

const pixelfont = new FontFace("pixel",'url("assets/Micro5-Regular.ttf"')

// Init Input Handler
const keys = {}

document.addEventListener("keydown",e =>{
    keys[e.key] = true
})

document.addEventListener("keyup", e =>{
    keys[e.key] = false
})

// Init Sounds
const coinsound = new Audio("./assets/audio/coin.wav")
const misssound = new Audio("./assets/audio/miss.wav")
const deathsound = new Audio("./assets/audio/death.wav")
const song = new Audio("./assets/audio/song.mp3")

song.loop = true

// Variables
const PLAYERSPEED = 5

var dead = false

var Px = 0

var Score = 0

const COINSPEED = 2
var Cx1 = 180
var Cy1 = -20
var Cx2 = 20
var Cy2 = 10
var Cx3 = 330
var Cy3 = 0

var Bx1 = 50
var By1 = 0
var Bx2 = 250
var By2 = -30

var canloop = true

document.fonts.add(pixelfont)

play()

function play(){
    canloop = true
    song.play()
    main()
}

// Main Loop
function main(){
    // Update

    // Coin Falling
    if (!dead){
        Cy1 += COINSPEED
        Cy2 += COINSPEED
        Cy3 += COINSPEED

        By1 += COINSPEED
        By2 += COINSPEED
    }

    if (Cy1 > 600){
        Cy1 = 0
        Cx1 = getRandomInt(381)
        if (Score != 0){
            Score--
        }
        misssound.play()
    }
    if (Cy2 > 600){
        Cy2 = 0
        Cx2 = getRandomInt(381)
        if (Score != 0){
            Score--
        }
        misssound.play()
    }
    if (Cy3 > 600){
        Cy3 = 0
        Cx3 = getRandomInt(381)
        if (Score != 0){
            Score--
        }
        misssound.play()
    }
    if (By1 > 600){
        By1 = 0
        Bx1 = getRandomInt(381)
    }
    if (By2 > 600){
        By2 = 0
        Bx2 = getRandomInt(381)
    }

    // Inputs
    if(keys['d'] || keys['ArrowRight']){
        Px += PLAYERSPEED
    } else if (keys['a'] || keys['ArrowLeft']){
        Px -= PLAYERSPEED
    }

    // Map Bounds
    if(Px < 0){
        Px = 0
    } else if(Px > 340){
        Px = 340
    }

    // Collision Detection
    if (!dead){
        if (rectvrectcollision(Px,520,60,40,Cx1,Cy1,20,20)){
            Cy1 = 0
            Cx1 = getRandomInt(381)
            Score++
            coinsound.play()
        }
        if (rectvrectcollision(Px,520,60,40,Cx2,Cy2,20,20)){
            Cy2 = 0
            Cx2 = getRandomInt(381)
            Score++
            coinsound.play()
        }
        if (rectvrectcollision(Px,520,60,40,Cx3,Cy3,20,20)){
            Cy3 = 0
            Cx3 = getRandomInt(381)
            Score++
            coinsound.play()
        }
        if (rectvrectcollision(Px,520,60,40,Bx1,By1,20,20)){
            dead = true
            song.pause()
            deathsound.play()
        }
        if (rectvrectcollision(Px,520,60,40,Bx2,By2,20,20)){
            dead = true
            song.pause()
            deathsound.play()
        }
    }

    // Drawing

    // Background
    draw.fillStyle = "#f5f5f5"
    draw.fillRect(0,0,canvas.width,canvas.height)

    if (!dead){
        // Player
        draw.fillStyle = "blue"
        draw.fillRect(Px, 520, 60, 40)

        // Coins
        draw.fillStyle = "#FFD700"
        draw.fillRect(Cx1,Cy1,20,20)
        draw.fillRect(Cx2,Cy2,20,20)
        draw.fillRect(Cx3,Cy3,20,20)

        // Bombs
        draw.fillStyle = "red"
        draw.fillRect(Bx1,By1,20,20)
        draw.fillRect(Bx2,By2,20,20)

        // Score Display
        draw.fillStyle = '#34eb34'
        draw.font = "84px pixel"
        draw.fillText(Score, 10, 50)
    } else{
        // Dead Display
        draw.fillStyle = '#34eb34'
        draw.font = "84px pixel"
        draw.fillText("YOU ARE DEAD", 20, 100)

        draw.font = "48px pixel"
        draw.fillText("PRESS 'R' TO RESTART", 20, 200)

        // Check Input
        if(keys['r']){
            dead = false
            Px = 0
            Score = 0
            Cx1 = 180
            Cy1 = -20
            Cx2 = 20
            Cy2 = 10
            Cx3 = 330
            Cy3 = 0
            Bx1 = 50
            By1 = 0
            Bx2 = 250
            By2 = -30
            canloop = false
        }
    }

    // Loop
    if (canloop){
        requestAnimationFrame(main)
    } else{
        play()
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function rectvrectcollision(r1x,r1y,r1w,r1h,r2x,r2y,r2w,r2h){
    if(r1x + r1w >= r2x && r1x <= r2x + r2w &&r1y + r1h >= r2y && r1y <= r2y + r2h){
        return true
    }
    else{
        return false
    }
}