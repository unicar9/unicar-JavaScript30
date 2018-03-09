
// var FizzyText = function() {
//     this.message = 'dat.gui';
//     this.speed = 0.8;
//     this.displayOutline = false;
//     // this.explode = function() {  };
//     // Define render logic ...
// }



// window.onload = function() {
//     var text = new FizzyText();
//     var gui = new dat.GUI();
//     gui.add(text, 'message');
//     gui.add(text, 'speed', -5, 5);
//     gui.add(text, 'displayOutline');
//     gui.add(text, 'explode');
// }

const malletCursor = document.querySelector('.mallet')

window.addEventListener('mousemove', (e) => {
    console.log(e.pageX, e.pageY)
    malletCursor.style.left = `${e.pageX}px`
    malletCursor.style.top = `${e.pageY}px`
})


window.addEventListener('mousedown', ()=> {
    malletCursor.classList.add('hit')
})

malletCursor.addEventListener('transitionend', () => malletCursor.classList.remove('hit'))

// window.addEventListener('mouseup', ()=> {
//     malletCursor.classList.remove('hit')
// })
