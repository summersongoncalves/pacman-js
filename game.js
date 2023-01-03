const BORDER_WALL_WIDTH = 1.5
const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")
const pacmanFrames = document.getElementById("animation")
const ghostFrames = document.getElementById("ghosts")

let createRect = (x, y, width, heigth, color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, heigth)    
}
//30:00
let fps = 30
let oneBlockSize = 20
let wallColor = "#342dCA"
let wallSpaceWidth = oneBlockSize / BORDER_WALL_WIDTH
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2
let wallInnerColor = "#000"


//RIGHT  RIGTH

const DIRECTION_RIGHT = 4
const DIRETCION_UP = 3
const DIRECTION_LEFT = 2
const DIRECTION_BOTTOM = 1 
/**
 * 1 => wall
 * 0 => walk
 */
let map = [ 
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,1],//23    
    [1,0,0,0,0, 0,0,0,0,0, 1,0,0,0,0, 0,0,0,0,0,1],//22
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0,1],//21
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0,1],//20
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,1],//19    
    [1,0,1,1,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,1,1,0,1],//18   
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0,1],//17
    [1,1,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,1,1],//16
    [0,0,0,0,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,0,0,0,2],//15
    [1,1,1,1,1, 0,1,0,1,1, 0,1,1,0,1, 0,1,1,1,1,1],//14
    [0,0,0,0,0, 0,1,0,1,0, 0,0,1,0,1, 0,0,0,0,0,2],//13
    [1,1,1,1,1, 0,1,0,1,0, 0,0,1,0,1, 0,1,1,1,1,1],//12
    [0,0,0,0,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,0,0,0,2],//11
    [0,0,0,0,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,0,0,0,2],//10
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


let gameLoop = () => {
    update ()
    draw()
}

let update = () => {
    //TODO    
    pacman.moveProcess()
}

let draw = () => {   
    createRect(0, 0, canvas.width, canvas.height, "#000") // workaround to do not show multiples pacmans
    //TODO
    drawWalls()    
    pacman.draw()
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

createNewPacman()
gameLoop()
//https://keyjs.dev/
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