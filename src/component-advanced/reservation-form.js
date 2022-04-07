import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const ReservationForm = function(props) {
    const [state, setState] = useState({
        name: '',
        date: '',
        isForeigner: false,
        roomNumber: 'one'
    })
    
    const handleInputChange = (event) => { // controlled-component.js의 코드를 줄인 것!
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // true/false는 checked로, text는 value로 가져오니
        const name = target.name;

        // ES6에서 도입된 computed property names 문법 활용
        // https://eloquentcode.com/computed-property-names-in-javascript
        setState({
            ...state,
            // 태그의 name 속성값을 속성키로 사용
            [name]: value // []를 통해 js의 표현식으로 사용
        });
    }
    const handleSubmit = (e) => {
        alert("submit!");
        // 페이지로 이동을 시도하는 기본 동작을 무시하고, (return false, preventDefault())
        e.preventDefault(); // reatc에서는 return false가 안되므로
        // 필요한 네트워크 요청(ex: ajax 요청) 보내기 코드를 여기에 작성
        // (입력 요소와 상태값이 동기화되어 있으므로, 필요한 내용은 전부 상태값을 통해서 참조 가능)
    }

    return (
        <form>
            <p>{JSON.stringify(state)}</p>
            <hr />
            <label>이름 <input value={state.name} name="name" /* name, 상태 이름과 동일해야한다 */type="text" onChange={handleInputChange} /></label><br />
            <label>날짜 <input value={state.date} name="date" type="date" onChange={handleInputChange} /></label><br />
            <label>외국인 여부 <input checked={state.isForeigner} name="isForeigner" type="checkbox" onChange={handleInputChange} /></label><br />
            <select name="roomNumber" value={state.roomNumber} onChange={handleInputChange}>
                <option value="one">1개</option>
                <option value="two">2개</option>
                <option value="three">3개</option>
            </select>
            <br />
            <input type="submit" value="제출" onClick={handleSubmit} />
        </form>
    )
}

ReactDOM.render(<ReservationForm />, document.getElementById("root"))