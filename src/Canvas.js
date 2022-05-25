import { fabric } from 'fabric'
import { useState, useEffect } from 'react'

const Canvas = ({config, children = []}) => {
    const [canvas, setCanvas] = useState(null)
    const [objects, setObjects] = useState(children)
    const [settings, setConfig] = useState(config)
    let velocity = {x: 0, y: 0, mx: 0, my: 0}
    let jumping = false

    const initCanvas = () => new fabric.StaticCanvas('canvas', {
        height: 800,
        width: 800,
        backgroundColor: '#d0edfc'
    })

    const handleClick = (e) => {
        const keys = {
            'ArrowLeft': ['mx', 700],
            'ArrowRight': ['x', 700]
        }

        if(Object.keys(keys).includes(e.key)) {
            velocity[keys[e.key][0]] = keys[e.key][1]
        }
    }

    const handleStop = (e) => {
        const keys = { 
            'ArrowLeft': ['mx', -100],
            'ArrowRight': ['x', 100]
        }

        if(Object.keys(keys).includes(e.key)) {
            velocity[keys[e.key][0]] = 0
        }
    }

    const handleJump = (e, target, canvas) => {
        if(e.key === ' ') {
            jump(target, canvas)
        }
    }

    const jump = (target, canvas) => {
        if(jumping)
            return
        const altura = 100
        const tempo = 0.5
        const tickrate = 10
        let clock = 0

        const vtimefunc = (t) => ((4*altura)/tempo) - ((8*altura)/(tempo**2))*(t/1000)

        jumping = true
        const loop = setInterval(() => {    
            if(clock === tempo*1000) {
                jumping = false
                clearInterval(loop)
            }
            velocity.y = vtimefunc(clock)
            clock += tickrate
        }, tickrate)
    }
    
    useEffect(() => {
        const tempCanvas = initCanvas()
        const tickrate = 10
        setCanvas(tempCanvas)
        tempCanvas.add(...objects)
        fabric.Image.fromURL('morius.png', function(oImg) {
            tempCanvas.add(oImg);
            oImg.scale(0.2)
            const height = oImg.get('height')
            oImg.set('top', 800 - 0.2*height)
            const tempObjects = [...objects, oImg]
            setObjects(tempObjects)
            setInterval(() => {
                if(velocity.x === 0 && velocity.y === 0 && velocity.mx === 0 && velocity.my === 0)
                    return
                const x0 = tempObjects[0].get('left')
                const y0 = tempObjects[0].get('top')

                let y = y0 - (velocity.y - velocity.my)*(tickrate/1000)

                if(y >= 800 - 0.2*height) {
                    y = 800 - 0.2*height
                    velocity.y = 0
                }

                const vx = velocity.x - velocity.mx
                tempObjects[0].set('flipX', vx < 0)

                tempObjects[0].set("left", x0 + (vx)*(tickrate/1000))
                tempObjects[0].set("top", y)
                tempCanvas.renderAll()
            }, tickrate)
            window.addEventListener('keydown', (e) => handleClick(e))
            window.addEventListener('keyup', (e) => handleStop(e))
            window.addEventListener('keydown', (e) => handleJump(e))
          });
    }, [])

    return <>
        <canvas id="canvas"/>
    </>
}

export default Canvas