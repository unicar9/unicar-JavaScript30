const keyNamePairs = {
    65: 'CLAP',
    83: 'HIHAT',
    68: 'KICK',
    70: 'OPENHAT',
    71: 'BOOM',
    72: 'RIDE',
    74: 'SNARE',
    75: 'TOM',
    76: 'TINK'
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"`);

  if (!audio) return;

  const soundName = document.querySelector('.sound-name')
  soundName.innerHTML = keyNamePairs[e.keyCode]

  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;

  console.log(e.propertyName);
  this.classList.remove("playing");
}

window.addEventListener("DOMContentLoaded", function() {
  const keys = document.querySelectorAll(".key");
  console.log(keys);
  keys.forEach(key => key.addEventListener("transitionend", removeTransition));
});

window.addEventListener("keydown", playSound);
