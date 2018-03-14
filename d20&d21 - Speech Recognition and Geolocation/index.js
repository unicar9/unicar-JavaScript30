const $maze = document.querySelector('.maze')
const $hero = document.querySelector('.hero')
const $pathDivs = document.querySelectorAll('.path')
const $pin = document.querySelector('.pin')
const pathGridAreas = Array.from($pathDivs).map(a => window.getComputedStyle(a).gridArea)


function reset() {
    $hero.style.gridArea = "5/2/6/3"
}

function randy(min = 0, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function checkIfOnPath(gridArea) {
    if (pathGridAreas.includes(gridArea)) return true
    return false
}

function move(dir) {
    const areaNow = $hero.style.gridArea.split(' / ')
    let areaNext = ''
    
    switch (dir) {
        case 'up':
        areaNext = areaNow.map((x, i) => i % 2 === 0 ? +x - 1 : x).join(' / ')
        break;
        case 'down':
        areaNext = areaNow.map((x, i) => i % 2 === 0 ? +x + 1 : x).join(' / ')
        break;
        case 'left':
        areaNext = areaNow.map((x, i) => i % 2 !== 0 ? +x - 1 : x).join(' / ')
        break;
        case 'right':
        areaNext = areaNow.map((x, i) => i % 2 !== 0 ? +x + 1 : x).join(' / ')
        break;
        default:
        console.log('aaa')
    }
    
    $hero.style.gridArea = areaNext
    
    if (!checkIfOnPath(areaNext)) {
        $hero.style.gridArea = areaNow.join(' / ')
        $hero.classList.add('shake')
    }

    if (areaNext === '1 / 4 / 2 / 5') {
        showConfetti()
        $pin.style.display = 'none'
        geoFindMe()
    }
}

function orderToMove(dir, order) {
    if(order.includes(dir)) {
        move(dir)
    }
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = false
recognition.maxAlternatives = 1

recognition.onresult = e => {
    const order = e.results[0][0].transcript.toLowerCase()
    
    orderToMove("up", order)
    orderToMove("down", order)
    orderToMove("left", order)
    orderToMove("right", order)
    
    console.log(order)

    order.includes('monster') && cheats()

}

const createElement = template => Object.assign(
    document.createElement('div'), { innerHTML: template } 
).firstElementChild

function showConfetti() {

    $divs = Array(100).fill().map((x, index) => {
        const color = `hsl(${randy(0, 360)}, 100%, 80%)`
        const delay = Math.random() * 9
        const left = randy(0, 100)

        const $div = createElement(`<div class="confetti" style="animation-delay: ${delay}s; background: ${color}; left: ${left}%";></div>`)

        console.log($div)

        return document.body.appendChild($div)
    })
}

function geoFindMe() {
    const output = document.querySelector('.geo')
  
    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>"
      return
    }
  
    function success(position) {
      output.innerHTML = ''
    
      const latitude  = position.coords.latitude
      const longitude = position.coords.longitude
  
      const img = new Image()
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false"
  
      output.appendChild(img)
    }
  
    function error() {
      output.innerHTML = "Unable to retrieve your location"
    }
  
    output.innerHTML = "<p>Locating…</p>"
  
    navigator.geolocation.getCurrentPosition(success, error)
}

function cheats() {
    ['up', 'right', 'up', 'right', 'up', 'up'].map((dir, i) => {
        setTimeout(() => move(dir), i * 500 + 500)
    })
}

reset()
$hero.addEventListener('animationend', (e) => $hero.classList.remove('shake'))

recognition.addEventListener('end', recognition.start)
recognition.start()