import React, { useState, useRef } from 'react' // 여기서 improt 하기!
import ReactDOM from 'react-dom'

const RefDemo = function(props) {
    const [trigger, setTrigger] = useState(true)

    // 주로 직접 접근이 필요한 DOM 노드를 저장하기 위한 용도로 ref 사용
    const inputEl = useRef() // useRef를 사용하면 객체를 하나 만든다 (Ref가 참조이니)
    const canvasEl = useRef()

    // 그냥 일반적인 값을 저장하기 위해서도 사용 가능
    // (단, 화면에 보여주어야 할 상태값을 저장할 경우에는 useState를 사용해야 함)
    const value = useRef(1) // 초기값 전달 가능
    // 값 자체에는 ref 객체의 current 속성을 통해서 접근 가능
    // console.log('render', value.current)

    return (
        <>
            {/* ref 속성에 앞서 생성한 ref 객체를 전달하는 방식으로 DOM 요소를 저장 */}
            <input type='text' ref={inputEl} /> {/* ref 속성에 객체를 전달 (input 요소와 연결된다) */}
            <br />
            <button onClick={() => setTrigger(prev => !prev)}>Trigger re-render {`(${trigger})`}</button> {/* prev 값을 계속 변경해 re-render 하려는 것 */}
            <br />
            <button onClick={() => {
                // ref 값이 변경 가능하지만, 값이 변경되었다고 해서 (마치, useState에서 반환하는 세터 함수를 호출한 것마냥) 함수가 재호출되지는 않음을 유의!
                console.log(value.current) // current에 1로 초기값이 있다
                value.current++ // 수를 증가하지만 화면에 출력되지는 X (useRef는 re-render를 하지 않으니)
            }}>Update ref {`(${value.current})`}</button>
            <br />
            <button onClick={() => {
                // 값 자체에는 객체의 current 속성을 통해서 접근
                // 여기서 current에 저장된 값은 DOM 노드
                inputEl.current.focus() // .focus() 하면 저장된 DOM 요소로 포커스가 간다! (현재는 input 태그)
            }}>Focus input</button>
            <hr />
            {/* ref 속성에 앞서 생성한 ref 객체를 전달하는 방식으로 DOM 요소를 저장 */}
            <canvas width="200" height="200" ref={canvasEl} />
            <br />
            <button onClick={() => {
                const c = canvasEl.current
                // 리액트를 통해서 특정 요소만 가지고 있는 고유 속성 및 메소드에는 접근하지 못하므로 ref 값을 통해 직접 DOM 요소 접근
                const ctx = c.getContext("2d")

                const grd = ctx.createLinearGradient(0, 0, 200, 0)
                grd.addColorStop(0, trigger ? "red" : "white")
                grd.addColorStop(1, trigger ? "white" : "red")

                ctx.fillStyle = grd
                ctx.fillRect(0, 0, 200, 200)
            }}>Draw gradient</button>
        </>
    )
}

ReactDOM.render(<RefDemo />, document.getElementById("root"))