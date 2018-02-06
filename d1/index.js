window.addEventListener("DOMContentLoaded", () => {
  
  const keyNamePairs = {
    a: "CLAP",
    s: "HIHAT",
    d: "KICK",
    f: "OPENHAT",
    g: "BOOM",
    h: "RIDE",
    j: "SNARE",
    k: "TOM",
    l: "TINK"
  }

  const $keys = document.querySelector(".keys")

  const data = Object.assign({}, ...Object.keys(keyNamePairs).map(key => {
    
    const $div = document.createElement("div")
    $div.classList.add("key")
    $div.innerHTML = `<kbd>${key.toUpperCase()}</kbd>`
    $div.addEventListener("transitionend", () =>
      $div.classList.remove("playing")
    )
    $div.addEventListener("click", () => playSound({ key }))

    return ({
      [key]: {
        el: $keys.appendChild($div),
        audio: new Audio(
          `sounds/${
            keyNamePairs[key]
          }.wav`
        )
      }
    })
    
  }))

  window.addEventListener('keydown', playSound)

  function playSound ({ key }) {
    data[key].el.classList.add('playing')
    data[key].audio.currentTime = 0
    data[key].audio.play()

    document.querySelector('.sound-name').innerHTML = keyNamePairs[key]
  }
})




