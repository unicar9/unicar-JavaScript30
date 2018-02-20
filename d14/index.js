
const init = ["UNICAR1", "UNICAR2", "UNICAR3", "UNICAR4", "UNICAR5"]
const ref = init
const copy = [...init]

const $copyButton = document.querySelector('.copy')
const $refButton = document.querySelector('.ref')

const $copyWrapper = document.querySelector('.copy-wrapper')
const $refWrapper = document.querySelector('.ref-wrapper')
const $initWrapper = document.querySelector('.init-wrapper')

addArray(init, $initWrapper)
const $init = document.querySelectorAll('.init-wrapper > div')

$copyButton.addEventListener('click', (e) => {
    addArray(copy, $copyWrapper)
    enableEdit()
})

$refButton.addEventListener('click', (e) => {
    addArray(ref, $refWrapper)
    enableEdit()
})

function addArray(array, wrapper) {
    wrapper.innerHTML = ''

    array.map(x => {
        const $div = document.createElement('div')
        $div.classList.add('init')
        $div.innerText = x
        wrapper.appendChild($div)
    })

}

function enableEdit() {
    $init.forEach(init => {
        init.contentEditable = 'true'
    })
}

$init.forEach(init => {
    init.addEventListener('input', (e) => console.log(e.target.innerText))
})