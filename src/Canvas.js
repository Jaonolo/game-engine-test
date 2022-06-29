import { fabric } from 'fabric'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Canvas = ({config, children = []}) => {
    const [canvas, setCanvas] = useState(null)
    const [objects, setObjects] = useState(children)
    const [settings, setConfig] = useState(config)

    const ref = useRef(null)

    let velocity = {x: 0, y: 0, mx: 0, my: 0}
    let jumping = false

    const initCanvas = (height, width) => new fabric.StaticCanvas('canvas', {
        height,
        width,
        backgroundColor: '#d0edfc'
    })

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
    
    /*useEffect(() => {
        canvas()
    }, [canvas])*/

    useEffect(() => {
        if(canvas)
            canvas?.dispose()
        const {clientHeight, clientWidth} = ref.current
        const tempCanvas = initCanvas(clientHeight, clientWidth)
        setCanvas(tempCanvas)
        tempCanvas.add(...objects)
    }, [])

    return <CanvasContainer ref={ref}>
        <canvas id="canvas"/>
    </CanvasContainer>
}

const CanvasContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: red;
`

export default Canvas