const triggers = document.querySelectorAll('a')
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.appendChild(highlight)

let currentTransform = ''
let lastLink

let is3dMode = false

function highlightLink() {
    if (is3dMode) return
    
    lastLink ? lastLink.style.visibility = 'visible' : null
    this.style.visibility = 'hidden'

    const linkCoords = this.getBoundingClientRect()
    // console.log(linkCoords)
    // console.log(this.innerText)
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    }
 
    highlight.style.width = `${coords.width + 20}px`
    highlight.style.height = `${coords.height + 10}px`
    highlight.style.lineHeight = `${coords.height + 10}px`
    highlight.innerText = this.innerText
    highlight.style.transform = `translate(${coords.left - 10}px, ${coords.top - 5}px)`

    currentTransform = highlight.style.transform
    lastLink = this
}

function highlightHover(e) {
    if (!is3dMode) return

    const hoverCoords = this.getBoundingClientRect()
    // console.log(hoverCoords)

    const x = e.clientX - hoverCoords.left
    const y = e.clientY - hoverCoords.top

    // console.log(x, y)
    const centerX = hoverCoords.width / 2
    const centerY = hoverCoords.height / 2

    const dx = (x - centerX)/50
    const dy = centerY - y

    highlight.style.transformOrigin = 'center center'
    highlight.style.transform = `perspective(3000px) rotateX(${dy}deg) rotateY(${dx}deg) ${currentTransform}`
    highlight.style.boxShadow = '0 5px 15px rgba(0, 0, 0, .3)'

    console.log(highlight.style.transform)

}

window.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.code === 'Space') {
        is3dMode = !is3dMode
        console.log(is3dMode)
    }
})

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
highlight.addEventListener('mousemove', highlightHover)
