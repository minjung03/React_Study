import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'


const Timer = function(props) {

    const [timerState, setTimerState] = useState({
        time: props.time,
        timeout: false
    })

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

    return (
        <div>
            {timerState.timeout ? <h2>timeout</h2> : <h2>{timerState.time}</h2>}
        </div>
    )
}

const App = function(props) {
    const [trigger, setTrigger] = useState(false)

    return (
        <div>
            {
                !trigger && <div>
                    <Timer time={5} />
                    <Timer time={10} />
                    <Timer time={15} />
                </div>
            }
            <button onClick={() => setTrigger(true)}>타이머 제거</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))