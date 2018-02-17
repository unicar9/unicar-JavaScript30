function randy(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function addDoggo() {
  const $img = document.createElement('img')
  $img.src = images[randy(0, 25)]
  $img.style.position = 'absolute'
  $img.style.top = `${randy(0, 100)}%`
  $img.style.left = `${randy(0, 100)}%`

  $container.appendChild($img)
}


const endpoint = "http://api.giphy.com/v1/gifs/search?q=doggo&api_key=EXnlBIXZEt8KY8fIVINc1mxeZBBxUjof"
const $container = document.querySelector('.container')

const images = []
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => images.push(...data.images.downsized_large.url))

const pressed = []
const secretCode = 'unicar'

window.addEventListener('keyup', (e) => {
  pressed.push(e.key)
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)

  if (pressed.join('').includes(secretCode)) {
    console.log("芝麻开门")
    addDoggo()
  }
})