const triggers = document.querySelectorAll('a')
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.appendChild(highlight)

function highlightLink() {
    const linkCoords = this.getBoundingClientRect()
    // console.log(linkCoords)
    console.log(this.innerText)
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    };
    
    highlight.style.width = `${coords.width + 20}px`
    highlight.style.height = `${coords.height + 10}px`
    highlight.style.transform = `translate(${coords.left - 10}px, ${coords.top - 5}px)`
    highlight.style.lineHeight = `${coords.height + 10}px`
    highlight.innerText = this.innerText

}

function highlightHover() {
    const hoverCoords = this.getBoundingClientRect()
    console.log(hoverCoords)

    
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
highlight.addEventListener('mousemove', highlightHover)
