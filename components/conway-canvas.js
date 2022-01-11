import { useState, useEffect, useRef } from 'react'

class Cell {
  static width = 10
  static height = 10

  constructor(context, gridX, gridY) {
    this.ctx = context
    this.gridX = gridX
    this.gridY = gridY
    this.alive = Math.random() > 0.5
    this.next = this.alive
  }

  draw(color) {
    if (this.alive) {
      this.ctx.fillStyle = color
      this.ctx.fillRect(
        this.gridX * Cell.width,
        this.gridY * Cell.height,
        Cell.width,
        Cell.height
      )
    }
  }
}

class GameOfLife {

  _createGrid() {
    for (let y = 0; y < this.row; y++) {
      for (let x = 0; x < this.col; x++) {
        this.gameObjects.push(new Cell(this.ctx, x, y))
      }
    }
  }

  constructor(context, row, col) {
    this.ctx = context
    this.gameObjects = []
    this.row = row
    this.col = col
    this._createGrid()
  }

  _checkSurrounding(){
    //check surroundings
    for (let x = 0; x < this.col; x++) {
      for (let y = 0; y < this.row; y++) {
        let numAlive =
          this._isAlive(x - 1, y) +
          this._isAlive(x - 1, y - 1) +
          this._isAlive(x - 1, y + 1) +
          this._isAlive(x + 1, y) +
          this._isAlive(x + 1, y - 1) +
          this._isAlive(x + 1, y + 1) +
          this._isAlive(x, y - 1) +
          this._isAlive(x, y + 1)
        if (numAlive == 2) {
          this.gameObjects[this._gridToIndex(x, y)].next = this.gameObjects[this._gridToIndex(x, y)].alive
        } else if (numAlive == 3) {
          this.gameObjects[this._gridToIndex(x, y)].next = true
        } else {
          this.gameObjects[this._gridToIndex(x, y)].next = false
        }
      }
    }

    //update cell states
    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].alive = this.gameObjects[i].next
    }
  }

  _isAlive(x, y){
    if (x < 0 || x >= this.col || y < 0 || y >= this.row) {
      return 0
    }
    return this.gameObjects[this._gridToIndex(x, y)].alive ? 1 : 0
  }

  _gridToIndex(x, y){
    return x + y * this.col
  }

  regenerate(row, col) {
    this.gameObjects.splice(0, this.gameObjects.length)
    this.row = row
    this.col = col
    this._createGrid()
  }

  _rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  _hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b
    })
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  _gradient(delta, start, end) {
    const startRgb = this._hexToRgb(start)
    const endRgb = this._hexToRgb(end)
    return this._rgbToHex(
      Math.floor(((1-delta)*startRgb.r + delta*endRgb.r)/2),
      Math.floor(((1-delta)*startRgb.g + delta*endRgb.g)/2),
      Math.floor(((1-delta)*startRgb.b + delta*endRgb.b)/2)
    )
  }

  draw(color1, color2) {
    this._checkSurrounding()

    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    
    for (let x = 0; x < this.col; x++) {
      for (let y = 0; y < this.row; y++) {
        this.gameObjects[this._gridToIndex(x, y)].draw(this._gradient((((x + 1)/this.col)**2 + ((y + 1)/this.row)**2)**0.5, color1, color2))
      }
    }
  }
}

const debounce = (fn, ms) => {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

const ConwayCanvas = ({ color1, color2, reset, setReset, ...props }) => {
  const canvasRef = useRef(null)
  const [rows, setRows] = useState()
  const [cols, setCols] = useState()
  const [game, setGame] = useState()

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      const r = Math.floor(window.innerHeight / Cell.height) + 1
      const c = Math.floor(window.innerWidth / Cell.height) + 1
      setRows(r)
      setCols(c)
      setGame(new GameOfLife(canvasRef.current.getContext('2d'), r, c))
    }, 500)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {window.removeEventListener('resize', debouncedHandleResize)}
  })

  useEffect(() => {
    const r = Math.floor(window.innerHeight / Cell.height) + 1
    const c = Math.floor(window.innerWidth / Cell.height) + 1
    setRows(r)
    setCols(c)
    setGame(new GameOfLife(canvasRef.current.getContext('2d'), r, c))
  }, [])

  useEffect(() => {
    if (reset && game) {
      game.regenerate(rows, cols)
      setReset(false)
    }
  }, [reset])

  const draw = (ctx, frameCount) => {
    if (frameCount % 4 === 0 && !reset && game) {
      game.draw(color1, color2)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
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

  return <canvas className="conway" ref={canvasRef} {...props} />
}

export default ConwayCanvas
