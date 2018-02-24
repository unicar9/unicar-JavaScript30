const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog']

const sortButton = document.querySelector('.button')

function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}

function sortBands() {
    const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
    displayList(sortedBands)
}

function displayList(bandList) {
  document.querySelector('#bands').innerHTML =
  bandList
    .map(band => `<li>${band}</li>`)
    .join('');
}

sortButton.addEventListener('click', sortBands)

displayList(bands);