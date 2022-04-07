import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

// Dom 요소가 필요한 시점에 읽어오는 것
const FormUncontrolledComponent = function(props) {
    // DOM 요소를 저장할 ref 생성
    const input = useRef()
    const fileInput = useRef()

    const handleSubmit = (e) => {
        // input.current => input 요소
        const v = input.current.value;
        const file = fileInput.current.value; // 파일 경로 및 파일명
        // 파일은 보안상에 문제 때문에 value가 안된다. 그래서 파일 사용시에는 uncontroll 방법을 사용해야 함!
        alert(`value : ${v}\nfile : ${file}`);
        e.preventDefault();
    }

    return (
        <form>
            {/* input 요소와 ref 연결 */}
            <input type="text" ref={input} /><br />
            <input type="file" ref={fileInput} /><br />
            <input type="submit" onClick={handleSubmit} /> {/* submit을 누를 때만 상태에 접근 */}
        </form>
    )
}

ReactDOM.render(<FormUncontrolledComponent />, document.getElementById("root"))