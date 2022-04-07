import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Controlled 컴포넌트 (제어 컴포넌트) 전략을 이용하여 폼 정보 제어
const FormControlledComponent = function(props) {
    const [state, setState] = useState({
        text: '',
        textareaText: '',
        checked: false,
        selected: 'default'
    })

    // 입력을 받는 태그(input, textarea, select 등)의 변화에 반응할 이벤트 핸들러 함수를 정의 (e는 이벤트 객체)
    const handleTextChange = e => setState({ ...state, text: e.target.value }) // e.target에 이벤트가 발생한 요소가 저장
    const handleTextareaTextChange = e => setState({ ...state, textareaText: e.target.value })
    const handleCheckChange = e => setState({ ...state, checked: e.target.checked })
    const handleSelectChange = e => setState({ ...state, selected: e.target.value })

    return (
        <form>
            <p>text : {state.text}</p>
            {/*
                1. 컴포넌트 상태와 input 입력값을 동기화하기 위해서 value 속성으로 현재 상태값을 전달
                2. 내용이 변경될 때 호출될 메소드를 onChange 속성으로 전달
            */}
            <input type="text" value={state.text} onChange={handleTextChange} /><br />
            <p>textarea text : {state.textareaText}</p>
            <textarea value={state.textareaText} onChange={handleTextareaTextChange} /><br />
            <p>checked : {state.checked + ""}</p>
            <input type="checkbox" onChange={handleCheckChange} checked={state.checked} /><br />
            <p>selected : {state.selected + ""}</p>
            <select value={state.selected} onChange={handleSelectChange}>
                <option value="default">Default</option>
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
                <option value="item3">Item 3</option>
            </select>
            <br />
        </form>
    )
}

ReactDOM.render(<FormControlledComponent />, document.getElementById("root"))