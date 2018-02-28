const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


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

// let prevFrame = []

let frames = []


function paintToCanvas() {
    const width = video.videoWidth
    const height = video.videoHeight
    canvas.width = width
    canvas.height = height
    
    
    setInterval(() => {
        ctx.globalCompositeOperation = 'destination-over'
   
        ctx.drawImage(video, 0, 0, width, height)
        // ctx.globalCompositeOperation = 'overlay'
        let currentImageData = ctx.getImageData(0, 0, width, height)

        frames.push(currentImageData)

        frames.splice(-26, frames.length - 25)

        // let currentFrame = imageData.data
        
        for (let i = 0; i < frames[0].data.length; i+=4) {
            
            // let currentR = currentFrame[i]
            // let prevR = prevFrame[i]

            // if ( prevR && Math.abs(prevR - currentR) > 30 ) {
                // currentR = currentR + 200
                // currentFrame[i + 1] = currentFrame[i + 1] - 50
                // currentFrame[i + 2] = currentFrame[i + 2] * 0.5
            // }
            
            frames[0].data[i + 0] = frames[0].data[i + 0] + 200
            frames[0].data[i + 1] = frames[0].data[i + 1] - 200
            frames[0].data[i + 2] = frames[0].data[i + 2] - 200
            frames[0].data[i + 3] = frames[0].data[i + 3] * 0.9

            // frames[5].data[i + 0] = frames[5].data[i + 0] - 200
            // frames[5].data[i + 1] = frames[5].data[i + 1] + 200
            // frames[5].data[i + 2] = frames[5].data[i + 2] - 200
            // frames[5].data[i + 3] = frames[5].data[i + 3] * 0.9

            // frames[10].data[i + 0] = frames[10].data[i + 0] - 200
            // frames[10].data[i + 1] = frames[10].data[i + 1] - 200
            // frames[10].data[i + 2] = frames[10].data[i + 2] + 200
            // frames[10].data[i + 3] = frames[10].data[i + 3] * 0.9
        }

        if (frames[5]) {
            for (let i = 0; i < frames[5].data.length; i+=4) {
            
                frames[5].data[i + 0] = frames[5].data[i + 0] + 100
                frames[5].data[i + 1] = frames[5].data[i + 1] * 0.5
                frames[5].data[i + 2] = frames[5].data[i + 2] * 0.5
                frames[5].data[i + 3] = frames[5].data[i + 3] * 0.2
            }

            ctx.putImageData(frames[5], 0, 0)

        }
        
       

        
        
        
        ctx.putImageData(currentImageData, 0, 0)

        // ctx.globalAlpha = 0.2
        // ctx.putImageData(frames[0], 0, 0)
       
        // ctx.putImageData(frames[15], 0, 0)
        
        
        
        // ctx.drawImage(video, 0, 0, width, height)
        // prevFrame = currentFrame
       
    }, 16)


}

function photoTake() {
    // play sound
    snap.currentTime = 0
    snap.play()

    // take photo (base64)
    const data = canvas.toDataURL('image/jpeg')
    const link = document.createElement('a')
    link.href = data
    link.texContent = "Download"

    strip.insertBefore(link, strip.firstChild)

}

video.addEventListener('canplay', paintToCanvas)