
const Config = function() {
    this.bgColor = '#99c4b3'
    this.gameDuration = 10
    this.minTime = 100
    this.maxTime = 1000
}

window.onload = function() {
    const text = new Config()
    const gui = new dat.GUI()
    gui.addColor(text, 'bgColor')
    gui.add(text, 'gameDuration', 10, 30).step(1)
    gui.add(text, 'minTime', 100, 500)
    gui.add(text, 'maxTime', 1000, 2000)
}

const malletCursor = document.querySelector('.mallet')
const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
const game = document.querySelector('.game')
let lastHole
let timeUp = false
let score = 0

game.addEventListener('mousedown', malletHit)
game.addEventListener('mouseup', malletHitOver)

function malletHit(e) {
    this.style.cursor = 'url(mallet-hit.png), auto'
}

function malletHitOver(e) {
    this.style.cursor = 'url(mallet.png), auto'    
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length)
    const hole = holes[idx]
    if (hole === lastHole) {
      return randomHole(holes)
    }
    lastHole = hole
    return hole
}

function peep() {
    const time = randomTime(200, 1000)
    const hole = randomHole(holes)
    hole.classList.add('up')
    setTimeout(() => {
      hole.classList.remove('up')
      if (!timeUp) peep()
    }, time)
}

function startGame() {
    scoreBoard.textContent = 0
    timeUp = false
    score = 0
    peep()
    setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
    if(!e.isTrusted) return // cheater!
    score++
    this.parentNode.classList.remove('up')
    scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk))