import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Counter = function(props) {
    const [ count, setCount ] = useState(0) // ()안 값이 기본 값
    // 배열 비구조화 할당

    return (
        <div>
            <h1>{count}</h1>

            {/* count 증가 버튼 만들기 */}
            <button onClick={ () => setCount(count+1) }>증가</button>
            {/* react에서 이벤트를 거는 것은 카멜표시법으로!!  <-- 소문자로 작성하는 것은 HTML 방식 */}

            {/* 세터 함수에 이전 값을 참조하여 값을 수정하는 콜백 함수 전달 가능 <-- 위보다는 아래 방법으로 작성해야한다!! 꼭 알아두기*/}
            <button onClick={() => setCount(previous => previous + 1)}>Click me</button>

            {/* count 감소 버튼 만들기 */}
            <button onClick={ () => setCount(count-1) }>감소</button>
        </div>
    )
}


const MultipleStateComponent = function(props) {
    // useState 함수를 원하는 만큼 호출하여 여러 상태값을 관리할 수 있음
    const [count, setCount] = useState(0)
    const [text, setText] = useState("a")

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>증가</button>
            <h1>{text}</h1>
            <button onClick={() => setText(text + "a")}>a 추가</button>
        </div>
    )
}



ReactDOM.render(
    <MultipleStateComponent/>,
     document.getElementById("root")
)