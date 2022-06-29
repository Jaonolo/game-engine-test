import { useEffect } from "react"

export const Image = (url, addListener) => {
    const [fobject, setFobject] = useState(null)

    /*
        url: 'morius.png'
        tempCanvas.Canvas.add(oImg);
        const tempObjects = [...objects, oImg]
        setObjects(tempObjects)
    */

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

    useEffect(() => {
        window.addEventListener('keydown', (e) => handleClick(e))
        window.addEventListener('keyup', (e) => handleStop(e))
        window.addEventListener('keydown', (e) => handleJump(e))
    }, [fobject])

    useEffect(() => fabric.Image.fromURL('morius.png', e => setFobject(e)), [])

            oImg.scale(0.2)
            const height = oImg.get('height')
            oImg.set('top', 800 - 0.2*height)

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

          });
}