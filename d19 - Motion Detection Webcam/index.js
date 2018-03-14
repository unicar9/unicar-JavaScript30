const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

function getVideo() {
   navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localStreamMedia => {
        video.src = window.URL.createObjectURL(localStreamMedia)
        video.play()
    })
    .catch(error => {
        console.log("Oh, ", error)
    })
}

getVideo()  

let prevFrame = []

function paintToCanvas() {
    const width = video.videoWidth
    const height = video.videoHeight
    canvas.width = width
    canvas.height = height
    
    
    setInterval(() => {
   
        ctx.drawImage(video, 0, 0, width, height)
        let currentImageData = ctx.getImageData(0, 0, width, height)
        let currentFrame = currentImageData.data

        for (let i = 0; i < currentFrame.length; i+=4) {
            let currentR = currentFrame[i]
            const prevR = prevFrame[i]
            if ( prevR && Math.abs(currentR - prevR) > 35) {
                currentFrame[i] = 0
                currentFrame[i + 1] = 255
                currentFrame[i + 2] = 0
            }    
        }

        ctx.putImageData(currentImageData, 0, 0)
        prevFrame = currentFrame
       
    }, 16)
}


video.addEventListener('canplay', paintToCanvas)