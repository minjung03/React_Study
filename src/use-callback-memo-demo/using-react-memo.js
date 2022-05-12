import React, { useState } from "react"
import ReactDOM from "react-dom"

/*
useCallback -> 함수를 새로 생성하지 않고 기존 함수 사용 (의존성 배열 값이 바뀌면 새로 생성)
useMemo -> 값을 새로 계산하지 않고 기존 값 사용 (의존성 배열 값이 바뀌면 새로 계산하여 값 저장)
React.memo -> 컴포넌트 자체의 내용을 저장하여 재활용 (props 값이 바뀌면 새로 렌더링한 내용 저장)
*/

// React.memo HoC를 사용할 경우 전달된 props를 얕은 비교하여 변경되었을 때에만 render 진행
const PersonInfo = React.memo(function(props) { // 처음 그렸던 값을 저장, props 값이 변경되지 않을 시 저장된 것을 사용, 변경되었을 시 render
    console.log('render')
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.age}</p>
        </div>
    )
})

// 일반적인 컴포넌트의 경우 props의 변경 여부와 무관하게 re-render 진행
/*
const PersonInfo = (props) => { // force update 버튼을 누를 때마다 render
    console.log('render')

    return (
        <div>
            <p>{props.name}</p>
            <p>{props.age}</p>
        </div>
    )
}
*/

// https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render
// props 값 변경안하고 그냥 render 하도록 클래스 컴포넌트의 forceUpdate 함수와 같은 역할을 하는 훅 정의
function useForceUpdate(){ // 내가 직접 만든 훅 (커스텀 훅)
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // set 함수 호출 시 re-render
}

const Container = (props) => {
    const forceUpdate = useForceUpdate()

    return (
        <div>
            <PersonInfo name={"John"} age={20} />
            <button onClick={() => forceUpdate()}>force update</button>
        </div>
    )
}

ReactDOM.render(<Container />, document.getElementById("root"));