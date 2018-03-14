const $divs = document.querySelectorAll('.circle')
const $toggle = document.querySelector('.toggle')
let capture = true

function logText(e) {
  const child = this.children[0]
  setTimeout(() => { this.classList.add('ripple') } , ( capture ? (5 - this.dataset.number) : this.dataset.number ) * 300)
}

function toggleButton() {
  capture = !capture
  if (capture) { 
    this.innerText = 'Capture'
  } else {
    this.innerText = 'Bubble'
  }
  
  setClickHandler(capture)
}

function setClickHandler(capture) {
  $divs.forEach(div => div.addEventListener('click', logText, {capture:capture}))
}

$divs.forEach(div => div.addEventListener('animationend', () => div.classList.remove('ripple')))
$toggle.addEventListener('click', toggleButton)
setClickHandler(capture)
