import React from 'react';
import ReactDOM from 'react-dom';

const name = 'Josh Perez'
const element = <h1>Hello, {name}</h1> // Hello, Josh Perez

const lst = [100, 200, 300]
const person = {
    name: 'John',
    age: 20
}
function double(value) {
    return value * 2
};
const JSXwithExpressions = (
    /* 여기는 JS 영역이니 JS 주석 사용 */
    <h1>
        {/* 'JSX 내부' 주석({} 포함, 여러줄도 가능) */}

        {lst[0]}
        &nbsp;{person.name}
        &nbsp;{person.age}
        &nbsp;{2 + 2}
        &nbsp;{person.name.toUpperCase()}
        &nbsp;{person.name.length}
        &nbsp;{double(person.age)}
    </h1> 
    // { } 안에는 자바 스크립트 코드 작성 가능
) // ()를 안 적을 꺼면 처음 태그는 항상 선언과 같은 줄에 적기(근데 괄호 습관을 들이는게 더 좋음)
ReactDOM.render(JSXwithExpressions, document.getElementById('root'))