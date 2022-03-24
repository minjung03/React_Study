import React from 'react'
import ReactDOM from 'react-dom'

const ComponentwithProps = function(props) { // 인자 이름은 거의 'props'로 사용
    console.log(props)
    return <p>{JSON.stringify(props)}</p>
}

function Greeting(props) {
    /* 
    구조 분해 할당
    
    1.
    const {name} = props  
    return <h1>Hello, {name}</h1> 

    2.
    function Greeting({name}) { 
         return <h1>Hello, {name}</h1> 
    }
    */
    return <h1>Hello, {props.name}</h1>   
}

// ReactDOM.render(
//     <ComponentwithProps value={1} />, // "1"로 작성하면 문자열이니 차이가 있음
//     document.getElementById("root")
// )





const PersonProfile = function(props) {
    const {name, age, gender, profile } = props.person
    return (
        // 예약어는 사용 불가능(Class -> className)
        <div className='person' style={props.highlight ? {color: 'red'} : null}>
            <h1>Profile</h1>
            <img src={profile} />
            <p>name : {name}</p>
            <p>age : {age}</p>
            <p>gender : {gender}</p>
        </div>
    )
}

const anotherPerson = {
    name: 'Jane',
    age: 28,
    gender: 'female',
    profile: 'https://randomuser.me/api/portraits/women/75.jpg'
}
const { name, gender, ...rest } = anotherPerson
console.log(rest) // { age: 28, profile: 'https:..' } 이런 내용이 출력된다


ReactDOM.render(
   // <Greeting name="Jhon" />, // 꼭 value로 작성하지 않아도 된다

    /*  <div> 
          <PersonProfile name='John' age={35} gender='male'
           profile='https://randomuser.me/api/portraits/men/75.jpg' />
        </div>,
    */

   // 1.
   // <div> <PersonProfile {...anotherPerson} highlight /></div>,
   // prop에 값 대입과 관련된 내용이 없다면 true가 전달된다
   /* <PersonProfile
        name = {anotherPerson.name}
        age = {anotherPerson.age}
        ...과 같은 내용이다
    */

    // 2.
    // <div><PersonProfile name='Ken' gender='male' age={32} {...rest} /></div>,
    // age가 중복되는데, 뒤에 있는 age값이 덮어쓰게 된다 (32 -> 28)  *순서가 중요
    // {...rest} 하고 뒤에 적어주는 것이 제일 안전~


    // 3.
    <div><PersonProfile person={anotherPerson} /></div>,

    
    document.getElementById("root")
)
