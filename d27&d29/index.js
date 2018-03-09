const cards = Array.from(document.querySelectorAll('.card'))
let topCard = cards[0]

cards.forEach(c => {
  c.addEventListener('mousedown', handleMouseDown)
})

function updateCards(cards) {
  
  cards.forEach((c, i) => {
    c.style.zIndex = cards.length - i
    c.style.transform = `translate3d(0, 0, ${i * -60}px`
    c.style.opacity = 1
    if(i === cards.length - 1) {
      c.style.opacity = 0
    }
  })
  console.log('updatedaaaaa!!!!!')
}

updateCards(cards)

let isDown = false
let startX
let startY

window.addEventListener('mouseup', handleMouseUp) 
window.addEventListener('mousemove', handleMouseMove) 

function handleMouseDown(e) {
  isDown = true
  startX = e.pageX
  startY = e.pageY
}

function handleMouseUp(e) {
  isDown = false
  cards.forEach((card, i) => {
    card.style.transform = `translate3d(0,0,${i * -60}px)`
    card.classList.add('moveback')
    card.addEventListener('transitionend', () => card.classList.remove('moveback'))
  })
}

function handleMouseMove(e) {
  if (!isDown) {return}
  transX = e.pageX - startX
  transY = e.pageY - startY

  cards.forEach((c, i) => {
    c.style.transform = `translate3d(${transX / (i+1)}px, ${transY / (i+1)}px, ${i * -60}px)`
  })


  if (Math.abs(transX) > 0.3 * window.innerWidth ) {
    isDown = false

    let promise = new Promise((resolve, reject) => {
      cards.forEach((c, i) => {
        if (i === 0) {
          c.classList.add('moveaway')
          c.addEventListener('animationend', () => {
            c.classList.remove('moveaway')            
            resolve('ok')
          })
        } else {
          c.style.transform = `translate3d(0,0,${i * -60}px)`
          c.classList.add('moveback')
          c.addEventListener('transitionend', () => {
            c.classList.remove('moveback')            
          })
        }
      })
   
    })
    promise.then((res) => {
      resetCards()
    })
  }
}

function resetCards() {
  const topCard = cards[0]
  console.log(topCard)
  cards.shift()
  cards.push(topCard)
  updateCards(cards)

  clearInterval(countdown)

  if (!topCard.classList.contains('form')) {
    const initSeconds = +topCard.querySelector('button').dataset.time
    displayTimeLeft(initSeconds)
  } else {
    timerDisplay.textContent = ''
  }

  timerDisplay = cards[0].querySelector('.display__time-left')

  // console.log("new", timerDisplay)
}

let countdown
let timerDisplay

const buttons = document.querySelectorAll('[data-time]')
timerDisplay = document.querySelector('.display__time-left')

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown)

  countdown = setInterval(() => {
    seconds--

    if (seconds < 0) {
      clearInterval(countdown)
      return
    }

    displayTimeLeft(seconds)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`
  document.title = display;
  timerDisplay.textContent = display;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  console.log(this)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const mins = this.minutes.value
  console.log(mins)
  timer(mins * 60)
  this.reset()
})