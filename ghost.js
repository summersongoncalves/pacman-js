class Ghost {
    debugMode = false
    constructor(x, y, width, height, speed, imageX, imageY, imageWidth, imageHeight, range) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.direction = DIRECTION_RIGHT
        this.imageX = imageX
        this.imageY = imageY
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.range = range
        this.randomTargetIndex = parseInt(Math.random() *  randomTargetsForGhosts.length)
       setInterval(() => {
           this.changeRandomDirection()
       }, 10000);
    }

    changeRandomDirection() {
        this.randomTargetIndex += 1
        this.randomTargetIndex = this.randomTargetIndex % 4
    }
    
    isInRangeOfPacman () {
        let xDistance = Math.abs(pacman.getMapX() - this.getMapX())
        let yDistance = Math.abs(pacman.getMapY() - this.getMapY())

        if(Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range) {
            return true
        } return false
    }

    moveProcess () {
        if (this.isInRangeOfPacman()) {
            this.target = pacman
        } else {
            this.target =  randomTargetsForGhosts[this.randomTargetIndex]
        }
        this.changeDirectionIfPossible()
        this.moveFowards()
        if(this.checkCollision()) {
            this.moveBackwards()
        }
    }

    eat () {
        for (let i = 0; i < map.length; i ++) {                               
            for(let j = 0; j < map[0].length; j++)   {      
              if(map[i][j] == 0 && 
                this.getMapX() == j &&
                this.getMapY() == i) { 
                  map[i][j] = 3
                  score ++
              }
            }
          }
          //console.log('pontuação', score)

    }

    moveBackwards () {
        switch(this.direction) {
            case DIRECTION_RIGHT: 
            this.x -= this.speed;
            break;
            case DIRETCION_UP: 
            this.y += this.speed;
            break;
            case DIRECTION_LEFT: 
            this.x += this.speed;
            break; 
            case DIRECTION_BOTTOM: 
            this.y -= this.speed;
            break;
        }
    }

    moveFowards () {
        switch( this.direction) {
            case DIRECTION_RIGHT: 
            this.x += this.speed;
            break;
            case DIRETCION_UP: 
            this.y -= this.speed;
            break;
            case DIRECTION_LEFT: 
            this.x -= this.speed;
            break;
            case DIRECTION_BOTTOM: 
            this.y += this.speed;
            break;
        }
    }

    checkCollision () {       
        if (
           map[this.getMapY()][this.getMapX()] == 1
        || map[this.getMapYRightSide()][this.getMapX()] == 1
        || map[this.getMapY()][this.getMapXRightSide()] == 1
        || map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
        ){
            return true    
        }
        else return false
    }
    
    checkGhostCollision () {
    }

    changeDirectionIfPossible () {  
        let tempDirection = this.direction    
        this.direction = this.calculateNewDirection(
            map,
            parseInt(this.target.x / oneBlockSize),
            parseInt(this.target.y / oneBlockSize)
        )
        if ( typeof this.direction == 'undefined') {
            this.direction = tempDirection
            return 
        }

        this.moveFowards()
        
        if(this.checkCollision()){
            this.moveBackwards()            
            this.direction = tempDirection
        } else {
            this.moveBackwards()
        }
    }

    /* Dijkstra's algorithm 
    https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm*/
    calculateNewDirection (map, destX, destY) {
        let mp = []
        for ( let i = 0; i < map.length ; i ++) {
            mp[i] = map[i].slice()
        }
        let queue = [{
            x : this.getMapX(),
            y : this.getMapY(),
            moves : []     
        }]
        while (queue.length > 0)  {            
            let poped = queue.shift()
            if(poped.x == destX && poped.y == destY) {
                //console.log(poped.moves)
                return poped.moves[0]
            } else {
                mp[poped.y][poped.x] = 1
                let  neighborList = this.addNeighbors(poped,mp)               
                for (let i = 0 ; i < neighborList.length ; i++) {
                    queue.push(neighborList[i])
                }              
            }
        }   
        return DIRETCION_UP // default        
    }

    addNeighbors(poped, mp) {
        let queue = []
        let numOfRows = mp.length
        let numOfColumns = mp[0].length

        if(poped.x  - 1 >= 0 && 
            poped.x - 1 < numOfRows && 
            mp[poped.y][poped.x - 1] != 1) {
                let tempMoves = poped.moves.slice()
                tempMoves.push(DIRECTION_LEFT)
                queue.push({x:poped.x - 1, y:poped.y, moves:tempMoves})

            }
        if(poped.x  + 1 >= 0 && 
            poped.x + 1 < numOfRows && 
            mp[poped.y][poped.x + 1] != 1) {
                let tempMoves = poped.moves.slice()
                tempMoves.push(DIRECTION_RIGHT)
                queue.push({x:poped.x + 1, y:poped.y, moves:tempMoves})

            }
            
        if(poped.y -  1 >= 0 && 
            poped.y - 1 < numOfRows && 
            mp[poped.y - 1][poped.x] != 1) {
                let tempMoves = poped.moves.slice()
                tempMoves.push(DIRETCION_UP)
                queue.push({x:poped.x , y:poped.y - 1, moves:tempMoves})

            }
            
        if(poped.y +  1 >= 0 && 
            poped.y + 1 < numOfRows && 
            mp[poped.y + 1][poped.x] != 1) {
                let tempMoves = poped.moves.slice()
                tempMoves.push(DIRECTION_BOTTOM)
                queue.push({x:poped.x , y:poped.y + 1, moves:tempMoves})

            }

            return queue
    }
    changeAnimation () {
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1
    }

    
    draw () {   
        canvasContext.save()                
        canvasContext.drawImage(
            ghostFrames,
            this.imageX,
            this.imageY,
            this.imageWidth,
            this.imageHeight,            
            this.x,
            this.y,
            this.width,
            this.height
            ); 
        
        canvasContext.restore()    
        if(this.debugMode) {
             //Draw Range of ghosts     
        canvasContext.beginPath()
        canvasContext.strokeStyle='red'
        canvasContext.arc(this.x  + oneBlockSize / 2,
        this.y + oneBlockSize / 2,
        this.range * oneBlockSize,
        0,
        2 * Math.PI)
        canvasContext.stroke()
        }
        
        
    }    
    getMapX () {
        return parseInt(this.x / oneBlockSize)
    }
    getMapY () {
        return parseInt(this.y / oneBlockSize)
    }
    getMapXRightSide () {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize)
    }
    getMapYRightSide () {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize)
    }

}