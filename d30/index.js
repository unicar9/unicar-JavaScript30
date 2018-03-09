
// var FizzyText = function() {
//     this.message = 'dat.gui'
//     this.speed = 0.8
//     this.displayOutline = false
//     // this.explode = function() {  }
//     // Define render logic ...
// }



// window.onload = function() {
//     var text = new FizzyText()
//     var gui = new dat.GUI()
//     gui.add(text, 'message')
//     gui.add(text, 'speed', -5, 5)
//     gui.add(text, 'displayOutline')
//     gui.add(text, 'explode')
// }

const malletCursor = document.querySelector('.mallet')
const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
const game = document.querySelector('.game')
let lastHole
let timeUp = false
let score = 0

// game.addEventListener('mousemove', (e) => {
//     console.log(e)
//     malletCursor.style.left = `${e.pageX}px`
//     malletCursor.style.top = `${e.pageY}px`

// })


// window.addEventListener('mousedown', () => {
//     malletCursor.classList.add('hit')
// })

// malletCursor.addEventListener('transitionend', () => malletCursor.classList.remove('hit'))

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