const $maze = document.querySelector('.maze')
const $hero = document.querySelector('.hero')
const $pathDivs = document.querySelectorAll('.path')

const pathGridAreas = Array.from($pathDivs).map(a => window.getComputedStyle(a).gridArea)

console.log(pathGridAreas)

$hero.addEventListener('animationend', (e) => $hero.classList.remove('shake'))

function reset() {
    $hero.style.gridArea = "5/2/6/3"
}

reset()

function checkIfOnPath(gridArea) {
    if (pathGridAreas.includes(gridArea)) return true
    return false
}

function verticalMove(dir) {
    const rowNow = $hero.style.gridRow.split(' / ')
    const areaNow = $hero.style.gridArea
    console.log(areaNow)
    $hero.style.gridRow = dir === 'up' ? `${+rowNow[0] - 1} / ${+rowNow[1] - 1}` : `${+rowNow[0] + 1} / ${+rowNow[1] + 1}` 
    const areaNext = $hero.style.gridArea
    if (!checkIfOnPath(areaNext)) {
        $hero.style.gridArea = areaNow
        $hero.classList.add('shake')
    }
}

function horizontalMove(dir) {
    const colNow = $hero.style.gridColumn.split(' / ')
    const areaNow = $hero.style.gridArea
    console.log(areaNow)

    $hero.style.gridColumn = dir === 'left' ? `${+colNow[0] - 1} / ${+colNow[1] - 1}` : `${+colNow[0] + 1} / ${+colNow[1] + 1}`
    const areaNext = $hero.style.gridArea
    if (!checkIfOnPath(areaNext)) {
        $hero.style.gridArea = areaNow
        $hero.classList.add('shake')
    }
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = false
recognition.maxAlternatives = 2

// recognition.addEventListener('result', e => {
//     const transcript = Array.from(e.results)
//         .map(result => result[0])
//         .map(result => result.transcript)
//         .join('')
    
    
// })

recognition.onresult = (e) => {
    const order = e.results[0][0].transcript.toLowerCase()

    if (order.includes('up')) {
        verticalMove('up')
    } 
    if (order.includes('down')) {
        verticalMove('down')
    } 
    if (order.includes('left')) {
        horizontalMove('left')
    } 
    if (order.includes('right')) {
        horizontalMove('right')
    } 
    console.log(order)
}

recognition.addEventListener('end', recognition.start)

recognition.start()