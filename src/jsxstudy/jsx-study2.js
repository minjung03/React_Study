import React from 'react';
import ReactDOM from 'react-dom';

const div = <div>
    @
    {true}
    {false}
    {undefined}
    {null}
    
    {/*표현식의 값으로 boolean(true, false), undefined, null이 반환될 경우 아무것도 그리지 않음}*/}
</div>


const unreadMessages =["hello", "hi"];
const div2 = <div>
    <h1>Hello!</h1>
    {/* 만약 읽지 않은 메시지가 있다면 경고문을 출력 */}    
    {
        unreadMessages.length > 0 && 
        <h2>You have {unreadMessages.length} unread messages.</h2>
        // unreadMessages.length > 0 가 false면 아무것도 그리지 않음, true면 뒤의 메세지를 그림 (&& 연산자의 특징 알기)
        // **이러한 구문을 정말 많이 쓴다
    }
    {
        // 3항 연산자(?:) 사용 시 이러한 장점이 있다
        unreadMessages.length > 0 ? 
        <h2>You have {unreadMessages.length} unread messages.</h2> :
        <h2>메세지 다 읽음</h2>
    }
</div>



// 조건문
function conditionalRender(age) {
    if(age >= 20) {
        return <div>성인</div>
    } else {
        return <div>미성년자</div>
    }
}
const div3 = <div>
    {conditionalRender(18)}
</div>

// 이 처럼도 작성 가능
const age = 30
const div4 = (
    <>{age >= 20 ? <div>성인</div> : <div>미성년자</div>}</>
    // JSX 내부에서 if-else, switch, for, while 등은 작성 불가 (함수 생성하던지, 위에서 쓰던지)
)


// React에서는 인라인 스타일을 꽤 사용한다
// 첫번째 {}는 JS코드 영역을 표시, 두번째 {}는 객체에 적는 것
// (-)적기 불가능하니 카멜표기법 사용 ex) background-color => backgroundColor
const h1 = <h1 style={{color: "red", backgroundColor: "lightblue"}}>
    Hello Style!
</h1>

// 이런 식으로도 스타일 작성 가능 (스타일 정보가 있는 객체를 미리 생성)
const myStyle = {color: "red", backgroundColor: "lightblue"};
const h2 = <h1 style={myStyle}>
    Hello Style!
</h1>

ReactDOM.render(h2, document.getElementById('root'))