const endpoint = "https://api.tronalddump.io/random/quote"
const $quote = document.querySelector('.quote')
const $poo = document.querySelector('.poo')
const $meh = document.querySelector('.meh')

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => $quote.innerText = data.value)

function addQuote() {
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => $quote.innerText = data.value)
}


$poo.addEventListener('click', addQuote)
$meh.addEventListener('click', addQuote)