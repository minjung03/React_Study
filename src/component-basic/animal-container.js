import React from 'react'
import ReactDOM from 'react-dom'

// 함수 선언식을 통해서 컴포넌트 정의 가능
function Cat() {
    return <div>🐱</div>
}

// 함수 표현식을 통해서 컴포넌트 정의 가능
const Dog = function() {
    return <div>🐶</div>
}

// 화살표 함수로 컴포넌트 정의 가능
const Pig = () => <div>🐷</div>

function AnimalContainer() {
    return (
        /* 일반적인 태그 사용 가능 */
        <> {/* 리턴은 한 요소만 가능하니 하나로 묶는 것 (<>, <React.Fragment> 등을 사용) */}
            {/* 이미 정의한 컴포넌트들도 JSX 내부에서 사용 가능 */}
            <Cat />
            <Dog />
            <Pig />
        </>
    )
}

ReactDOM.render(<AnimalContainer />, document.getElementById("root"))