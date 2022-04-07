import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"

// focus 메소드는 사용 못함
function Form() {

    const [state, setState] = useState({
        name : '',
        email : '',
        password : ''
    })

    const handleNameChage = name => setState({ ...state, name : name.target.value})
    const handleEmailChage = email => setState({ ...state, email : email.target.value})
    const handlePasswordChage = password => setState({ ...state, password : password.target.value})

 /*   const handleInputChange = (event) => { // controlled-component.js의 코드를 줄인 것!
        const target = event.target;
        const name = target.name;

        setState({
            ...state,
            [name]: name 
        });
    }
*/

    const handleSubmit = e => {
        e.preventDefault()

        // 2. Submit 버튼을 누르면 콘솔에 모든 input 요소의 값을 출력하도록 하기
        console.log(state.name)
        console.log(state.email)
        console.log(state.password)
    }

    const handleReset = () => {
        // 3. Reset 버튼을 누르면 모든 input 요소의 값을 ''로 초기화하기
        setState({
            name : '',
            email : '',
            password : ''
        })
    }

    // 1. 모든 input 요소에 ref 연결해주기
    return (
        <>
            <label>
                Name:
                <input type="text" placeholder="name" name="name" value={state.name} onChange={handleNameChage}/>
            </label>
            <label>
                Email:
                <input type="text" placeholder="email" name="email" value={state.email} onChange={handleEmailChage}/>
            </label>
            <label>
                Password:
                <input type="password" placeholder="password" name="password" value={state.password} onChange={handlePasswordChage}/>
            </label>

            <hr />

            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button onClick={handleReset}>Reset</button>
        </>
    )
}

ReactDOM.render(<Form />, document.getElementById("root"))