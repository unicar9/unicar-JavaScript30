const endpoint = "https://api.tronalddump.io/random/quote"
const $quote = document.querySelector('.quote')
const $poo = document.querySelector('.poo')
const $meh = document.querySelector('.meh')
const $saved = document.querySelector('.saved')
const $quoteWrapper = document.querySelector('.quote-wrapper')
const $savedQuotes = document.querySelector('.saved-quotes')

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

    addQuote()
}

function showSavedQuotes() {
    $quoteWrapper.style.display = 'none'
    quotes.map(quote => {
        const $div = document.createElement('div')
        $div.classList.add('quote-wrapper')
        $div.style.padding = '20px'
        $div.innerText = quote

        $savedQuotes.appendChild($div)
    })
}


$poo.addEventListener('click', saveQuote)
$meh.addEventListener('click', addQuote)
$saved.addEventListener('click', showSavedQuotes)