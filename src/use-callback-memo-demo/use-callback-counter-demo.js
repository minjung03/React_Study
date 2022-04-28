import React, { useState, useCallback } from 'react'
import ReactDOM from "react-dom"

const Counter = () => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState("")

    // 다음과 같은 코드는 매 render 시마다 호출되며 새 함수를 만듦
    // 하나를 클릭 시에 다른 것도 같이 새로 만들게 된다 (add1 클릭 시 addA도 다시 새로 생성)
    /*  
    const add1 = () => { setCount(count + 1) }
    const addA = () => { setText(text + "a") }
    */

    // useCallback 훅을 사용할 경우 의존 배열 안에 포함된 내용이 변경된 경우에만 함수가 생성되어 대입됨
    // add1 함수는 count 값이 변경되었을 때에만 다시 생성하면 되므로 의존 배열에 count 추가
    const add1 = useCallback(() => { setCount(count + 1) }
    , [count]) // []을 주게되면 처음 한번만 실행하니 값이 변하지 않는다 (1과 a만 표시)
    // addA 함수는 text 값이 변경되었을 때에만 다시 생성하면 되므로 의존 배열에 text 추가
    const addA = useCallback(() => { setText(text + "a") }
    , [text])

    return (
        <>
            <p>count: {count}</p>
            <p>text: {text}</p>
            <button onClick={add1}>add 1</button><br />
            <button onClick={addA}>add A</button>
        </>
    )
}

ReactDOM.render(<Counter />, document.getElementById('root'))