import React, { useState } from 'react'
import ReactDOM from 'react-dom'


// 사용자 정보를 저장하는 UserProfile 컴포넌트를 만들고 
// 3개의 상태(userName, userAge, emailAddress)를 추가하고 적절한 기본값을 useState로 전달하여 출력할 수 있도록 코드 작성
const UserProfile = function(props){

    const [userName, setUserName] = useState("홍길동")
    const [userAge, setUserAge] = useState(0)
    // set함수를 안사용할꺼면 const [userAge] = useState(0)  <-- 이런식으로만 작성
    const [emailAddress, setEmailAddress] = useState(null)

    return (
        <div>
            <div>{userName}</div>
            <div>{userAge}</div>
            <div>{emailAddress}</div>
        </div>
    )
}


// --------------------------------------------------------

const StateDemoComponent = function(props) {
    // 저장할 상태값과 관련된 제약이 없으므로 객체도 저장 가능
    const [state, setState] = useState({
        value1: "hello",
        value2: 1000
    })

    return (
        <div>
            <button onClick={() => {
                if(state.value1 === "hello") {
                    // 기존 객체를 복사하는 과정에서 새롭게 값을 갱신해주는 것을 확인 가능
                    setState({ ...state, value1: "bye" } ) // (...)뜻, state 객체 값은 그대로 쓰고, value1의 값을 변경
                    // ** 객체 사용시에는 주의! 변화를 빨리 감지하려 내부적으로 객체 참조를 비교하니, 객체 참조를 바꾸어 주어야 한다!
                    // ** 참조가 바뀌면 변경 사실을 빠르게 알게되니 사용한다. (객체 복사 후, 원하는 값 추가하기)
                    //    state는 변경하지 않는다 (불변)
                } else {
                    setState({ ...state, value1: "hello" } )
                }
            }}>{state.value1}</button>
            <br />
            <button onClick={() => {
                setState({ ...state, value2: state.value2 * 2 } )
            }}>{state.value2}</button>
        </div>
    )
}

ReactDOM.render( <StateDemoComponent/>, document.getElementById("root") )