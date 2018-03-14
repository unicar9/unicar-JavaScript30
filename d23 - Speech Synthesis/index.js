const synth = window.speechSynthesis
const shijus = Array.from(document.querySelectorAll('.shiju'))
const title = document.querySelector('.title')
const footer = document.querySelector('.footer')
const startingLine = title.getBoundingClientRect().bottom
let lastPlayedIndex

shijus.forEach(s => s.style.color = `hsl(${randy(360)}, 60%, 80%)`)

function getVoice(lang) {
  const voices = synth.getVoices()
  return voices.find(v => v.lang === lang)
}

function randy(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}

function yingshi(shiju) {
  let utterThis = new SpeechSynthesisUtterance(shiju)
  utterThis.voice = getVoice('zh-CN')
  // console.log(utterThis.voice.name)
  synth.speak(utterThis)
}

function mapTo(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

function shijuReveal() {
  
  const ratio = window.scrollY / shijus[1].getBoundingClientRect().height

  const index = Math.floor(ratio)
  const opacity = ratio - index
  const currentShiju = shijus[index + 1]
  currentShiju.style.opacity = opacity

  console.log('index', index, "current shiju", currentShiju)

  if (lastPlayedIndex !== index) {
    yingshi(currentShiju.innerText)
    lastPlayedIndex = index
  }
}

window.addEventListener('scroll', shijuReveal)
footer.addEventListener('click', () => document.documentElement.scrollTop = 0)
