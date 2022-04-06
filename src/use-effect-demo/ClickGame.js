import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
 
/* 클릭 게임(Click Game)
   - 10초 동안 클릭을 통해 카운트를 증가시킬 수 있으며, 10초 이후에는 클릭 중지! 제일 많이 증가시키는 사람이 승리~

    hint : 타이머 구현 예제 + 상태 추가(ClickCount)
           버튼 누를 때마다 세터함수(setClickCount) 호출해서 1씩 추가
           버튼 누를 때마다 호출되는 함수에서 조건문 하나 넣어서 timerState.time > 0 이면 동작하게
 */

const ClickGame = function(props) {

    const [timerState, setTimerState] = useState({
        time: props.time,
        timeout: false
    })

    const [clickcount, setClickCount] = useState(0) // 클릭 카운터 상태 추가

    const click = () => { // 버튼을 클릭 시 마다 setter함수 호출해 ClickCount 1씩 증가 하기
        // 타이머가 0이 아니라면 증가하게 하는 조건문
        if(timerState.time > 0) setClickCount(clickcount => clickcount + 1);
    }

    useEffect(() => {
        console.log('setInterval');

        const id = setInterval(() => {
            setTimerState(prevState => {

                console.log('from setInterval', id)

                if( prevState.time === 1 ) {
                    console.log('clearInterval (by timeout)')
                    clearInterval(id)
                    return { ...prevState, timeout: true, time: prevState.time - 1}
                } else {
                    return { ...prevState, time: prevState.time - 1 }
                }

            })
        }, 1000)

        return () => {
            console.log('clearInterval (by unmount)', id)
            clearInterval(id)
        }

    }, [])

    // 중복된 코드 줄여보자!
    return (
        <div style={{border:0, padding:"10px",borderRadius:"30px", background:"#7CB7F9", textAlign:"center"}}>
            {timerState.timeout ? 
                <div>
                    <p>게임 종료</p>
                    <h2>당신의 기록 {clickcount}개</h2>
                    <p><button onClick={click} style={{color : "white", background : "#2967D1", border : 0, borderRadius : "50px", padding:"15px"}}>Stop!</button></p>
                </div> 
            :   
                <div>
                    <p>남은 시간 {timerState.time}초</p>
                    <h1>{clickcount}</h1>
                    <p><button onClick={click} style={{border : 0, borderRadius : "50px", padding:"15px"}}>Click!</button></p>
                </div>}
        </div>
    )
}

const App = function(props) {
    const [trigger, setTrigger] = useState(false)

    return (
        <div>
            {
                !trigger && <div>
                    <ClickGame time={5} />
                </div>
            }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
