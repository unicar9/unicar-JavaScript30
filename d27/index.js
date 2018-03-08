const cards = document.querySelectorAll('#timer-stack li')

const card1 = document.querySelector('.card1')
const card2 = document.querySelector('.card2')
const card3 = document.querySelector('.card3')
const card4 = document.querySelector('.card4')

let isDown = false
let startX
let startY


// card1.addEventListener('mousedown', handleMouseDown) 
// card1.addEventListener('mouseleave', handleMouseLeave) 
// card1.addEventListener('mouseup', handleMouseUp) 
// card1.addEventListener('mousemove', handleMouseMove) 

card4.addEventListener('mousedown', handleMouseDown) 
card4.addEventListener('mouseleave', handleMouseLeave) 
window.addEventListener('mouseup', handleMouseUp) 
window.addEventListener('mousemove', handleMouseMove) 

function handleMouseDown(e) {
  isDown = true
  startX = e.pageX
  startY = e.pageY
  console.log(e)
}

function handleMouseLeave(e) {
  // isDown = false
}


function handleMouseUp(e) {
  isDown = false
  cards.forEach(card => {
    card.style.transform = `translate3d(0,0,0px)`
  })
}

function handleMouseMove(e) {
  if (!isDown) {return}
  console.log("move", this)
  transX = e.pageX - startX
  transY = e.pageY - startY
  card4.style.transform = `translateX(${transX}px) translateY(${transY}px) translateZ(-0px)`
  card3.style.transform = `translateX(${transX * 0.5}px) translateY(${transY * 0.5}px) translateZ(-60px)`
  card2.style.transform = `translateX(${transX * 0.2}px) translateY(${transY * 0.2}px) translateZ(-120px)`
  card1.style.transform = `translateX(${transX * 0.1}px) translateY(${transY * 0.1}px) translateZ(-180px)`
  console.log({transX, transY})
}