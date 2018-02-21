const endpoint = "https://api.tronalddump.io/random/quote"
const $quote = document.querySelector('.quote')
const $poo = document.querySelector('.poo')
const $meh = document.querySelector('.meh')

const quotes = JSON.parse(localStorage.getItem('quotes')) || []


fetch(endpoint)
    .then(blob => blob.json())
    .then(data => $quote.innerText = data.value)

function addQuote() {
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => $quote.innerText = data.value)
}

function saveQuote() {
    const currentQuote = $quote.innerText
    quotes.push(currentQuote)
    localStorage.setItem('quotes', JSON.stringify(quotes))
}

$poo.addEventListener('click', (e) => {
    saveQuote()
    addQuote()
})
$meh.addEventListener('click', addQuote)