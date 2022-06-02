import React from "react"
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom"

const Home = props => <h2>Home</h2>
const About = props => <h2>About</h2>
const Users = props => <h2>Users</h2>
const Hello = props => <h2>Hello Router</h2>

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            {/* 
                                Link 컴포넌트를 이용하여 "특수한" 앵커 태그(a)를 생성
                                (겉모습은 a 태그와 같지만 실제로 페이지 이동이 이루어지지 않고, 브라우저의 주소만 변경함)
                            */}
                            <Link to="/">Home</Link>
                        </li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/hello">Hello</Link></li>
                    </ul>
                </nav>

                {/*
                    Routes 컴포넌트에 포함된 Route 컴포넌트는 path에 설정된 주소와 현재 주소가 일치할 경우,
                    element 속성을 통해 전달한 컴포넌트를 렌더링
                */}
                <Routes>
                    {/* 
                        현재 주소가 "/about"이면 element에 지정한 JSX를 렌더링함
                        (여기서는 About 컴포넌트를 렌더링)
                    */}
                    <Route path="/about" element={<About />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/hello" element={<Hello />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))