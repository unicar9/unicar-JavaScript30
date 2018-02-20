
const init = ["UNICAR1", "UNICAR2", "UNICAR3", "UNICAR4", "UNICAR5"]

const ref = init

const copy = [...init]

const $copyButton = document.querySelector('.copy')
const $refButton = document.querySelector('.ref')
const $copyWrapper = document.querySelector('.copy-wrapper')
const $refWrapper = document.querySelector('.ref-wrapper')
const $init = document.querySelectorAll('.init-wrapper > div')

console.log($init)

$copyButton.addEventListener('click', (e) => addArray(copy, $copyWrapper))
$refButton.addEventListener('click', (e) => addArray(ref, $refWrapper))

function addArray(array, wrapper) {
    array.map(x => {
        const $div = document.createElement('div')
        $div.classList.add('init')
        $div.innerText = x
        wrapper.appendChild($div)
    })

    $init.forEach(init => {
        init.contentEditable = 'true'
    })

}