import React from "react"
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"

// 404 페이지를 보여줄 컴포넌트
const Page404 = () => {
    const location = useLocation() // 현재 위치 확인
    const navigate = useNavigate() // 이동 하기
    
    // 404 페이지에서는 일반적으로 잘못된 접속 주소임을 알려주고, 홈 화면으로 돌아갈 버튼을 제공함
    return (
        <div>
            <h1>404</h1>
            <p>"{location.pathname}" 주소는 존재하지 않습니다.</p>
            <button onClick={() => { navigate('/') }}>홈 화면으로 돌아가기</button>
        </div>
    )
}

function App() {
    return (
        <Router>
            <Link to="/">Home</Link><br />
            <Link to="/exist">존재하는 주소</Link><br />
            <Link to="/non-exist">존재하지 않는 주소</Link><br />
            <Link to="/asdf1234">존재하지 않는 주소</Link><br />

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/exist" element={<div>Exist</div>} />
                {/*
                    path 속성값을 와일드카드("*")로 정하여 위에서 매치되지 않은 모든 주소에 대해서 404 페이지로 이동하게 함
                    (switch - case 구문의 default 블록과 같은 역할을 수행)
                */}
                <Route path="*" element={<Page404 />} /> {/* 보통은 맨 마지막에 넣음 */}
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))