import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// 코드 이해하기
// 도전) 할 일의 중요도 설정할 수 있게 해보기 (중요도 : 1) [증가][감소]X
// 감소는 0 이하로는 불가능
// 중요도 순에 따라 정렬

// 개별 TODO 항목 출력
const TodoItem = function({ 
    todo: { completed, text }, 
    idx, 
    handleTodoStatusToggle, handleTodoRemove }) {

    return (
        <div>
            <span style={completed ? { textDecoration: 'line-through' } : null}
                onClick={() => handleTodoStatusToggle(idx)}>
                {text}
            </span>&nbsp;
            <button onClick={() => handleTodoRemove(idx)}>삭제</button>
        </div>
    )
}

// TODO 리스트 출력
const TodoList = function({ todos, handleTodoStatusToggle, handleTodoRemove }) {
    return (
        <ol>
            {
                todos.map((todo, idx) => {
                    return (
                        <li key={idx}>
                            <TodoItem idx={idx} todo={todo}
                                handleTodoStatusToggle={handleTodoStatusToggle}
                                handleTodoRemove={handleTodoRemove} />
                        </li>
                    )
                })
            }
        </ol>
    )
}

// 새 TODO 추가
const TodoAdder = function({ handleTodoAdd }) {
    const [input, setInput] = useState("")
    const handleChange = (e) => setInput(e.target.value)
    return (
        <div>
            <input type='text' onChange={handleChange} value={input} />
            <button onClick={() => {
                handleTodoAdd({ completed: false, text: input })
                setInput("")
            }}>추가</button>
        </div>
    )
}

// 전체 앱 구성
const TodoApp = function(props) {
    const [todos, setTodos] = useState([
        // { completed: false, text: '리액트 공부하기' },
        // { completed: true, text: 'ES6 문법 공부하기' }
    ])

    const handleTodoAdd = newTodo => setTodos(todos => todos.concat(newTodo))
    const handleTodoStatusToggle = todoIndex => {
        setTodos(todos => {
            return todos.map((todo, idx) => {
                if(idx === todoIndex) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
        })
    }
    const handleTodoRemove = todoIndex => {
        setTodos(todos => {
            return todos.filter((_, idx) => {
                return idx !== todoIndex
            })
        })
    }

    return (
        <div>
            <TodoList todos={todos}
                handleTodoStatusToggle={handleTodoStatusToggle}
                handleTodoRemove={handleTodoRemove}/>
            <TodoAdder handleTodoAdd={handleTodoAdd} />
        </div>
    )
}

ReactDOM.render(<TodoApp />, document.getElementById("root"))