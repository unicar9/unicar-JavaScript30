function randy(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function addDoggo() {
  const $img = document.createElement('img')
  $img.src = images[randy(0, 25)].images.fixed_width.url
  $img.style.position = 'absolute'
  $img.style.top = `calc(${randy(0, 100)}% + 100px)`
  $img.style.left = `calc(${randy(0, 100)}% + 100px)`
  $img.style.transform = `rotate(${randy(0, 360)}deg)`

  $container.appendChild($img)
}

function colorChange() {
  $container.style.background = `hsl(${randy(0, 361)}, 80%, 80%)`
}


const endpoint = "http://api.giphy.com/v1/gifs/search?q=puppy&api_key=EXnlBIXZEt8KY8fIVINc1mxeZBBxUjof"
const $container = document.querySelector('.container')

const images = []
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
      images.push(...data.data)
      console.log(images)
      console.log("Fetch down!!!!")
    })

const pressed = []
const secretCode = 'unicar'

window.addEventListener('keyup', (e) => {
  pressed.push(e.key)
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)

  if (pressed.join('').includes(secretCode)) {
    console.log("芝麻开门")
    addDoggo()
    colorChange()
  }
})