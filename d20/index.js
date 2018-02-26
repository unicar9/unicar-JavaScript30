const $maze = document.querySelector('.maze')
const $hero = document.querySelector('.hero')

function reset() {
    $hero.style.gridArea = "5/2/6/3"
}

reset()

function verticalMove(dir) {
    const rowNow = $hero.style.gridRow.split(' / ')

    $hero.style.gridRow = dir === 'up' ? `${+rowNow[0] - 1} / ${+rowNow[1] - 1}` : `${+rowNow[0] + 1} / ${+rowNow[1] + 1}` 
}

function horizontalMove(dir) {
    const colNow = $hero.style.gridColumn.split(' / ')

    const colNext = dir === 'left' ? `${+colNow[0] - 1} / ${+colNow[1] - 1}` : `${+colNow[0] + 1} / ${+colNow[1] + 1}`

    
}
