import React from "react"
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, NavLink } from "react-router-dom"
import './styles.css'

function App() {
    return (
        <Router>
            {/* 기본적으로 Link와 똑같이 사용 가능 */}
            <NavLink to="/">Home</NavLink><br />
            
            {/*
                현재 주소가 to 속성값과 일치하는 경우 강조해주기 위해서 className 속성값을 정하는 함수를 전달
                (해당 함수에는 객체가 전달되고, 객체에는 isActive 속성이 존재하고 해당 속성값을 현재 주소가 to 속성값과 일치하는지 여부를 나타냄)
                (밑의 코드에서는 비구조화 할당을 하며 isActive 속성값 바로 접근하고 있음)
            */}
            <NavLink to="/about" className={({isActive}) => isActive ? "selected" : ""}>About</NavLink><br />
            
            {/*
                현재 주소가 to 속성값과 일치하는 경우 강조해주기 위해서 style 속성값(객체)을 정하는 함수를 전달
                (내부 동작 방식은 위와 동일)
            */}
            <NavLink to="/blog" style={ 
                ({isActive}) => isActive ? 
                    { fontWeight: "bold", textDecoration: "none", color: "red", background: "yellow" } : null
            }>Blog</NavLink><br />
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))