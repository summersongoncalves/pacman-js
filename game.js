const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")
const pacmanFrames = document.getElementById("animation")
const ghostFrames = document.getElementById("ghosts")

let createRect = (x, y, width, heigth, color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, heigth)
}

let fps = 30
let oneBlockSize = 20
let wallColor = "#342dCA"
/**
 * 1 => wall
 * 2 => walk
 */
let map = [
    [1, 1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,  1],     
    [1, 2,2,2,2, 2,2,2,2,2, 1,2,2,2,2, 2,2,2,2,2,  1],
    [1, 2,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,2,  1],
    [1, 2,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,2,  1],
    [1, 2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2,  1],
    [1, 2,1,1,1, 2,1,2,1,1, 1,1,1,2,1, 2,1,1,1,2,  1],
    [1, 2,2,2,2, 2,1,2,2,2, 1,2,2,2,1, 2,2,2,2,2,  1],
    [1, 1,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,1,  1],
    [2, 2,2,2,2, 2,2,2,1,2, 2,2,1,2,2, 2,2,2,2,2,  2],

    [1, 1,1,1,1, 2,1,2,1,2, 2,2,1,2,1, 2,1,1,1,1,  1],
    [1, 1,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 2,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 2,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 1,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2,  1],
    [1, 2,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 2,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 1,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 2,1,1,1, 2,1,1,1,1, 1,1,1,1,1, 2,1,1,1,1,  1],
    [1, 2,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,2,  1],
    
    [1, 2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2,  1],    

    [ 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
]


let gameLoop = () => {
    update ()
    draw()
}

let update = () => {
    //TODO    
}

let draw = () => {
    //TODO
    drawWalls()    
}

let gameInterval = setInterval(gameLoop, 1000 / fps); 

let drawWalls = () => {    
    console.log('desenhando parede')    
    for( let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            if(map[i][j] == 1) {
                createRect(
                    j* oneBlockSize, 
                    i* oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize, 
                    wallColor 
                    )
            } 
        }
    }
}