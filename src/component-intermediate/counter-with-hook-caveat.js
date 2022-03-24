import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Counter(props) {
    const [count, setCount] = useState(0);
    console.log('(from Counter) count : ', count)

    const brokenAdd5 = () => {
        for (let i = 0; i < 5; i++) {
            // 성능상의 이유로 세터 함수로 인한 "변경 사항을 큐에 쌓고 한꺼번에 처리"하므로(=Batch 작업이 이루어지므로), 매 setCount 호출시마다 Counter 함수 호출(re-render)이 이루어지지는 않음
            // (단, 비동기적(비동기 함수 혹은 setTimeout 함수 호출)으로 setCount 함수를 호출할 경우 배치 작업이 이루어지지 않고 re-render가 바로 수행됨)
            // https://dev.to/adamklein/we-don-t-know-how-react-state-hook-works-1lp8
            console.log('(from brokenAdd5) count : ', count)
            // 엄밀히 말하자면 "setCount(0 + 1)" 명령어가 다섯번 큐에 쌓임 (애초에 5가 될 수 없음)
            // 변경사항을 큐에 쌓아놓고 한번에 처리하기 때문에
            setCount(count + 1)
        }
    }

    const normalAdd5 = () => {
        for (let i = 0; i < 5; i++) {
            // 세터 함수에 콜백 함수를 전달할 경우, 콜백 함수로 "이전 상태값"이 전달되므로 해당 상태값을 참조할 수 있음
            setCount(prev => {
                console.log('(from normalAdd5) prev : ', prev)
                return prev + 1
            })
        }
    }

    return (
        <div>
            <p>{count}</p>
            <button onClick={brokenAdd5}>Broken Add 5</button>
            <button onClick={normalAdd5}>Normal Add 5</button>
        </div>
    )
}

ReactDOM.render(<Counter />, document.getElementById("root"))