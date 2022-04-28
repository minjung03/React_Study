import React, { useState, useCallback, useMemo } from 'react'
import ReactDOM from "react-dom"

const FruitsContainer = () => {
    const [fruits, setFruits] = useState([])
    const [persons, setPersons] = useState([])

    // useCallback 이용하여 fruits 값이 변경되었을때만 해당 함수가 생성되도록 함
    const addRandomFruit = useCallback(() => {
        const choices = ["apple", "banana", "melon", "kiwi"]
        setFruits(fruits.concat(choices[Math.floor(Math.random() * Math.floor(choices.length))]))
    }, [fruits])

    const addRandomPerson = useCallback(() => {
        const choices = ["John", "Jane", "Ken", "Smith"]
        setPersons(persons.concat(choices[Math.floor(Math.random() * Math.floor(choices.length))]))
    }, [persons])

    // 특정 값을 계속해서 보관하고 싶은 경우 useMemo 사용
    // (의존 배열에 포함된 값이 바뀐 경우에만 새로 전달한 콜백 함수가 실행되어 새로운 결과값이 대입됨)
    // (useCallback은 "함수"를 저장하기 위해서 사용하고, useMemo는 "특정 값"을 저장하기 위해서 사용됨)
    const bananaCount = useMemo(() => {
        console.log('바나나 개수 카운트 작업 수행')
        return fruits.filter(f => f === "banana").length
    }, [fruits] /* 바나나의 개수를 세는 작업 및 바나나 개수 갱신 작업은 fruits 값이 변경된 경우에만 수행하면 됨! */)

    const personStartsWithJCount = useMemo(() => {
        console.log('J로 시작하는 사람 카운트 작업 수행')
        return persons.filter(p => p.startsWith('J')).length
    }, [persons])

    return (
        <div>
            <div style={ { width: "50%", float: "left" } }>
                <p>banana count : {bananaCount}</p>
                <button onClick={addRandomFruit}>add fruit</button>
                <ul>
                    {fruits.map(f => {
                        return <li>{f}</li>
                    })}
                </ul>
            </div>
            <div style={ { width: "50%", float: "left" } }>
                <p>person starts with 'J' count : {personStartsWithJCount}</p>
                <button onClick={addRandomPerson}>add person</button>
                <ul>
                    {persons.map(p => {
                        return <li>{p}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

ReactDOM.render(<FruitsContainer />, document.getElementById('root'))