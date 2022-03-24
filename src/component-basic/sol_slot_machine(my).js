import React from 'react'
import ReactDOM from 'react-dom'


const SlotMachine = function(props){

    // 조건부 렌더링 사용하기
    const {s1, s2, s3} = props
    if(s1==s2){
        if(s2==s3){
            return (s1 == "7" ? <div style={{color: "red"}}>{props.s1} {props.s2} {props.s3} <p>Congrats!</p></div>  : <div>{props.s1} {props.s2} {props.s3} <p>Congrats!</p></div>)
        }
    }
    else return <div>{props.s1} {props.s2} {props.s3}</div>
}

ReactDOM.render(
    <>
        <SlotMachine s1="X" s2="Y" s3="Z" />
        <SlotMachine s1="X" s2="X" s3="X" />
        <SlotMachine s1="7" s2="7" s3="7" />
        <SlotMachine s1="🍓" s2="🍒" s3="🍍" />
        <SlotMachine s1="🍒" s2="🍒" s3="🍒" />
    </>,
     document.getElementById("root")
)