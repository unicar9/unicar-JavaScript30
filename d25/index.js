const $divs = document.querySelectorAll('div')

console.log($divs)

function logText(e) {


  const child = this.children[0]
  
  setTimeout(() => {
                    this.classList.add('ripple')
                    // child.classList.add('ripple-reverse')
                    console.log("Clicked: ", this)
                    console.log("Child is:", child)
                  } , (5 - this.dataset.number)  * 300)
  
  // this.classList.add('ripple')
  console.log(this.classList.value)
}

$divs.forEach(div => div.addEventListener('click', logText, {capture:true}))
$divs.forEach(div => div.addEventListener('animationend', () => div.classList.remove('ripple')))
