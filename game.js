/// Load custom font
var emulogic = new FontFace('emulogic', 'url(assets/emulogic.ttf)');
emulogic.load().then( () => {
   document.fonts.add(emulogic)
})

//44:55 last
const BORDER_WALL_WIDTH = 1.5
const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")
const pacmanFrames = document.getElementById("animation")
const ghostFrames = document.getElementById("ghosts")
const GHOST_LIMIT_SPAWN = 4

let createRect = (x, y, width, heigth, color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, heigth)    
}
let fps = 30
let oneBlockSize = 20
let wallColor = "#DEAC87"//"#342dCA"
let wallSpaceWidth = oneBlockSize / BORDER_WALL_WIDTH
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2
let wallInnerColor = "#000"
let foodColor = "#F02011"//"#FEB"
let score = 0
let ghosts = []

const DIRECTION_RIGHT = 4
const DIRETCION_UP = 3
const DIRECTION_LEFT = 2
const DIRECTION_BOTTOM = 1 

/// positions of ghosts in ghost.png
let ghostLocations = [
    {x:0,y:0},
    {x:176,y:0},
    {x:0,y:121},
    {x:176,y:121},
]



/*-----------------------------
 * 1 => wall
 * 0 => can walk
 * 2 => outside
 -----------------------------*/
let map = [ 
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,1],//23    
    [1,0,0,0,0, 0,0,0,0,0, 1,0,0,0,0, 0,0,0,0,0,1],//22
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0,1],//21
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0,1],//20
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,1],//19    
    [1,0,1,1,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,1,1,0,1],//18   
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0,1],//17
    [1,1,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,1,1],//16
    [2,2,2,2,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,2,2,2,2],//15
    [1,1,1,1,1, 0,1,0,1,1, 0,1,1,0,1, 0,1,1,1,1,1],//14
    [0,0,0,0,0, 0,1,0,1,0, 0,0,1,0,1, 0,0,0,0,0,0],//13
    [1,1,1,1,1, 0,1,0,1,0, 0,0,1,0,1, 0,1,1,1,1,1],//12
    [2,2,2,2,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,2,2,2,2],//11
    [2,2,2,2,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,2,2,2,2],//10
    [1,1,1,1,1, 0,0,0,1,1, 1,1,1,0,0, 0,1,1,1,1,1],//9
    [1,0,0,0,0, 0,0,0,0,0, 1,0,0,0,0, 0,0,0,0,0,1],//8    
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0,1],//7
    [1,0,0,0,1, 0,0,0,0,0, 0,0,0,0,0, 0,1,0,0,0,1],//6
    [1,1,0,0,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,0,0,1,1],//5   
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0,1],//4
    [1,0,1,1,1, 1,1,1,1,0, 1,0,1,1,1, 1,1,1,1,0,1],//3    
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,1],//2 
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,1],//1
]
// set this after map for reference use
let randomTargetsForGhosts = [
    {x:1 * oneBlockSize, y: 1 * oneBlockSize },
    {x:1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    {x:1 * (map[0].length -2) * oneBlockSize, y: oneBlockSize },
    {
        x:(map[0].length -2 ) * oneBlockSize, 
        y: (map.length - 2) * oneBlockSize 
    }

] 
let gameLoop = () => {
    update ()
    draw()
}

let update = () => {      
    pacman.moveProcess()
    pacman.eat() 
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess()
    }
    if(pacman.checkGhostCollision()) {
        console.log('bvatey')
    }
}
let drawFoods = () => {       
    for (let i = 0; i < map.length; i ++) {                               
      for(let j = 0; j < map[0].length; j++)   {      
        if(map[i][j] == 0) {  // create food only in path pacman can walk            
            createRect(
                j * oneBlockSize + oneBlockSize / 3,
                i * oneBlockSize + oneBlockSize / 3,
                oneBlockSize / 5,
                oneBlockSize / 5,
                foodColor
            )
        }
      }
    }
}

let drawScore = () => {
    canvasContext.font = "bold 20px Emulogic"
    canvasContext.fillStyle = "white"
    canvasContext.fillText("Score: " + score, 
        5, 
        oneBlockSize * (map.length + 1) + 10
    )
    
}

let drawGhosts = () => {
    for (let i = 0; i< ghosts.length; i++) {
        ghosts[i].draw()        
    }
}

let draw = () => {   
    createRect(0, 0, canvas.width, canvas.height, "#000") // workaround to do not show multiples pacmans    
    drawWalls()    
    drawFoods()
    pacman.draw()
    drawScore()
    drawGhosts()
}

let gameInterval = setInterval(gameLoop, 1000 / fps); 

let drawWalls = () => {          
    for( let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            // create raw walls
            if(map[i][j] == 1) {
                createRect(
                    j* oneBlockSize, 
                    i* oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize, 
                    wallColor 
                    )
            } 

            if( j > 0 && map[i][ j - 1] == 1) {
               createRect(
                j * oneBlockSize, 
                i * oneBlockSize + wallOffset,
                wallSpaceWidth + wallOffset,
                wallSpaceWidth,
                wallInnerColor) 
            }
            if( j < map[0].length -1 && map[i][ j + 1] == 1) {
               createRect(
                j * oneBlockSize + wallOffset, 
                i * oneBlockSize + wallOffset,
                wallSpaceWidth + wallOffset,
                wallSpaceWidth,
                wallInnerColor) 
            }

             if( i > 0 && map[i - 1][ j ] == 1) {
                createRect(
                 j * oneBlockSize + wallOffset, 
                 i * oneBlockSize ,
                 wallSpaceWidth,
                 wallSpaceWidth + wallOffset,
                 wallInnerColor) 
             }
             if( i < map.length - 1 && map[i + 1][ j ] == 1) {
                createRect(
                 j * oneBlockSize + wallOffset, 
                 i * oneBlockSize + wallOffset,
                 wallSpaceWidth ,
                 wallSpaceWidth + wallOffset,
                 wallInnerColor) 
             } 
        }
    }
}

let createNewPacman = () => {
    pacman = new Pacman( 
        oneBlockSize,
        oneBlockSize ,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5)
} 

let createGhosts = () => {
    ghosts = []
    for (let i = 0; i < GHOST_LIMIT_SPAWN; i++ ) {
        let newGhost = new Ghost( 9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
                                  10 * oneBlockSize + (i%2 == 0 ? 0 : 1) * oneBlockSize,
                                  oneBlockSize,
                                  oneBlockSize,  
                                  pacman.speed / 2,
                                  ghostLocations[i % 4].x,
                                  ghostLocations[i % 4].y,
                                  124,
                                  116, 
                                  6+i
                                  )
            ghosts.push(newGhost)
    }
}
//------------------------- START MAIN ------------------
createNewPacman()
createGhosts()
gameLoop()
//----------------------------------------------------

/**
 * Configure keys
 * //https://keyjs.dev/
 */
window.addEventListener("keydown", (event) => {
    let k = event.keyCode
    setTimeout(() => {
        if(k == 37 || k == 65) { //left
            pacman.nextDirection = DIRECTION_LEFT
        } else if(k == 38 || k == 87) { //up
            pacman.nextDirection = DIRETCION_UP
        } else if(k == 39 || k == 68) { //right
            pacman.nextDirection = DIRECTION_RIGHT
        } else if(k == 40 || k == 83) { //bottom
            pacman.nextDirection = DIRECTION_BOTTOM
        } 
    }, 1);
})