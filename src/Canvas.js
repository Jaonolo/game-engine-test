import { fabric } from 'fabric'
import { useState, useEffect } from 'react'

const Canvas = ({config, children = []}) => {
    const [canvas, setCanvas] = useState(null)
    const [objects, setObjects] = useState(children)
    const [settings, setConfig] = useState(config)
    
    const initCanvas = () => new fabric.StaticCanvas('canvas', {
        height: 800,
        width: 800,
        backgroundColor: '#d0edfc'
    })

    const handleClick = (e, target, canvas) => {
        const keys = {
            'ArrowDown': ['top', 1],
            'ArrowUp': ['top', -1],
            'ArrowLeft': ['left', -1],
            'ArrowRight': ['left', 1]
        }

        if(Object.keys(keys).includes(e.key)) {
            const delta = target.get(keys[e.key][0])
            target.set(keys[e.key][0], delta + keys[e.key][1]*20)
            canvas.renderAll()
        }
    }

    const handleJump = (e, target, canvas) => {
        if(e.key === ' ') {
            jump(target, canvas)
        }
    }

    const jump = (target, canvas) => {
        const altura = 100
        const tempo = 1
        const tickrate = 10
        let clock = 0
        const h0 = target.get('top')

        const movement = (t) => ((2*altura*t)/tempo)*(1 - (t/tempo))

        const loop = setInterval(() => {    
            if(clock === tempo*1000)
                clearInterval(loop)
            target.set("top", h0 - movement(clock/1000))
            canvas.renderAll()
            clock += tickrate
        }, tickrate)
    }
    
    useEffect(() => {
        const tempCanvas = initCanvas()
        setCanvas(tempCanvas)
        tempCanvas.add(...objects)
        fabric.Image.fromURL('morius.png', function(oImg) {
            tempCanvas.add(oImg);
            oImg.scale(0.2)
            const height = oImg.get('height')
            oImg.set('top', 800 - 0.2*height)
            const tempObjects = [...objects, oImg]
            setObjects(tempObjects)
            window.addEventListener('keydown', (e) => handleClick(e, tempObjects[0], tempCanvas))
            window.addEventListener('keydown', (e) => handleJump(e, tempObjects[0], tempCanvas))
          });
    }, [])

    return <>
        <canvas id="canvas"/>
    </>
}

export default Canvas