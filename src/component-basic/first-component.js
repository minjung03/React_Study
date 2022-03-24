import React from 'react';
import ReactDOM from 'react-dom';


// 함수를 이용해서 정의하는 '함수형 컴포넌트' 작성
// 컴포넌트의 이름은 자유지만, 첫 글자는 꼭 대문자로 시작해야 한다!
function FirstComponent() {
    return <div>My First Component!</div> // 리턴한 것을 그리는 것
}
function HelloWorld() {
    return <h1>Hello, Wolrd!</h1>
}


// ReactDOM.render(<FirstComponent/>, document.getElementById('root'))
            // 호출을 '태그 형식'으로 적어야한다 

            
// 호출을 여러개 하고 싶다면 div로 묶기
ReactDOM.render(
<div> 
    <FirstComponent/>
    <HelloWorld/>
</div>, document.getElementById('root'))
