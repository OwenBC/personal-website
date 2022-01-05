import { useState, useEffect, useRef } from "react"

class Cell {
  static width = 10
  static height = 10

  constructor (context, gridX, gridY){
    this.context = context
    this.gridX = gridX
    this.gridY = gridY
    this.alive = Math.random() > 0.7
    this.next = this.alive
  }

  draw (color){
    if(this.alive){
      this.context.fillStyle = color
      this.context.fillRect(this.gridX * Cell.width, this.gridY * Cell.height, Cell.width, Cell.height)
    }
  }
}

const ConwayCanvas = ({color, reset=false, ...props}) => {
  const canvasRef = useRef(null)
  const [gameObjects,] = useState([])
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)
  const [isReset, setReset] = useState(reset)
  
  const createGrid = (r, c) => {
    for (let y = 0; y < r; y++) {
      for (let x = 0; x < c; x++) {
        gameObjects.push(new Cell(canvasRef.current.getContext("2d"), x, y))
      }
    }
  }

  useEffect(() => {
    const r = Math.floor(window.innerHeight/Cell.height)+1
    const c = Math.floor(window.innerWidth/Cell.width)+1
    setRows(r)
    setColumns(c)
    createGrid(r,c)
  }, [])

  useEffect(() => {
    setReset(reset)
  }, [reset])

  useEffect(() => {
    if(isReset){
      createGrid(rows, columns)
      setReset(false)
    }
  }, [isReset])

  const checkSurrounding = () => {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let numAlive = isAlive(x-1, y) + isAlive(x-1, y-1) + isAlive(x-1, y+1) + isAlive(x+1, y) + isAlive(x+1, y-1) + isAlive(x+1, y+1) + isAlive(x, y-1) + isAlive(x, y+1)
        if(numAlive == 2){
          gameObjects[gridToIndex(x, y)].next = gameObjects[gridToIndex(x, y)].alive
        }else if(numAlive == 3){
          gameObjects[gridToIndex(x, y)].next = true
        }else{
          gameObjects[gridToIndex(x, y)].next = false
        }
      }
    }
  }

  const isAlive = (x, y) => {
    if (x < 0 || x >= columns || y < 0 || y >= rows) {
      return 0
    }
    return gameObjects[gridToIndex(x, y)].alive?1:0
  }

  const gridToIndex = (x, y) => {return x + (y * columns)}

  const draw = (ctx, frameCount) => {
    if (frameCount % 3 === 0 && !isReset) {
      checkSurrounding()

      //update cell states
      for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].alive = gameObjects[i].next
      }
      
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight)

      for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw(color)
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    let frameCount = 0
    let animationFrameId
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas
    className="conway"
    ref={canvasRef} 
    {...props}
  />
}

export default ConwayCanvas