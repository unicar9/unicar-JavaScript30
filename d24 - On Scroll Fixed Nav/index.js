const nav = document.querySelector('#main')
let topOfNav = nav.offsetTop;

let isUpdating = false

function handleScroll() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px'
    document.body.classList.add('fixed-nav')
  } else {
    document.body.classList.remove('fixed-nav')
    document.body.style.paddingTop = 0
  }
  isUpdating = false
}

window.addEventListener('scroll', () => {
  if (isUpdating) {
    return
  } else {
    requestAnimationFrame(handleScroll)
    isUpdating = true
  }  
})

