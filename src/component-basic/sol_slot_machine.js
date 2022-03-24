import React from 'react'
import ReactDOM from 'react-dom'

// 비구조화 할당은 무조건
// JSX의 리턴문은 가급적 하나만
const SlotMachine = function( {s1,s2,s3} ){ // const {s1,s2,s3} = props 와 마찬가지

    // 조건을 많이 쪼개놓자
    const allSame = s1 == s2 && s2 == s3  // 3개의 값이 전부 같은 경우 
    const allSeven = allSame && s1 == "7" // 값이 같고, 전부 7인 경우

    return (
        <div>
            <div>{s1} {s2} {s3}</div>
            {
                // 조건부 렌더링
                allSame &&
                <p style={allSeven ? {color: "red"} : null}></p>
            }
       </div>
    )
}

// render에 전달하는 것이 최상위 컴포던트이다.
// 저것을 -App 이름으로 작성을 많이 한다
const App = props => {
    return (
        <div>
        <SlotMachine s1="X" s2="Y" s3="Z" />
        <SlotMachine s1="X" s2="X" s3="X" />
        <SlotMachine s1="7" s2="7" s3="7" />
        <SlotMachine s1="🍓" s2="🍒" s3="🍍" />
        <SlotMachine s1="🍒" s2="🍒" s3="🍒" />
        </div>
    )
}

ReactDOM.render(
    <App/>,
     document.getElementById("root")
)