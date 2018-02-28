const $maze = document.querySelector('.maze')
const $hero = document.querySelector('.hero')
const $pathDivs = document.querySelectorAll('.path')
const pathGridAreas = Array.from($pathDivs).map(a => window.getComputedStyle(a).gridArea)


function reset() {
    $hero.style.gridArea = "5/2/6/3"
}

function randy(min, max) {
    return Math.random() * (max - min) + min
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
}

function showConfetti() {

    $divs = Array(100).fill().map((x, index) => {
        const $div = document.createElement(`<div class="confetti" style="animation-delay: ${delay}s; background: ${color}; animation-duration: ${speed}s; width: ${size}px; height: ${size}px;"></div>`)

        const number = randy(1, 100)
        const hue = randy(0, 360)

        $div.style.width = '50px'
        $div.style.height = '50px'
        $div.style.lineHeight = '50px'
        $div.style.fontSize = '50px'
        $div.innerText = number
        $div.style.color = `hsl(${hue}, 100%, 80%)`

        return $wrapper.appendChild($div)
    })
}



reset()
$hero.addEventListener('animationend', (e) => $hero.classList.remove('shake'))

recognition.addEventListener('end', recognition.start)
recognition.start()