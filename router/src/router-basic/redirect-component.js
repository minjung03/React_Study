import React from "react"
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Routes, Route, Link, 
    Navigate, useNavigate
} from "react-router-dom"

const RedirectComponent = (props) => {
    // useNavigate 훅을 통해 페이지 이동을 수행하는 navigate 함수 반환받기
    const navigate = useNavigate() 
    // 컴포넌트 내부에서도 조건에 따라 리다이렉트 하도록 할 수 있음
    // (ex: 특정 페이지를 보호하기 위해서 로그인이 안되어있는 경우에는 접근 못하게 하고 Login 페이지로 이동하게 함)
    if(props.redirectPath) {
        /*
            만약 렌더링 과정중에 리다이렉트를 해야할 경우, 일단 반드시 JSX를 반환해야하므로 Navigate 컴포넌트를 사용하고
            이벤트 핸들러 함수 등, 렌더링 이후 로직에 의해서 리다이렉트를 해야 할 경우에는 navigate 함수를 사용
            https://stackoverflow.com/questions/60741674/nothing-was-returned-from-render-trying-to-redirect-to-homepage
        */
        return <Navigate to={props.redirectPath} /> 
        // RedirectComponent를 그리는 와중에 redirect해야하니 navigate 객체 사용보다는 컴포던트를 그려주기!
    } else {
        return <div>
            <button onClick={() => {
                // navigate 함수로 문자열을 전달한 경우 해당 주소로 redirect 
                navigate("/") // 렌더링 완료 후 이벤트 핸들러에 의한 리다이렉트이니 useNavigate 훅의 반환 함수 사용! 
                // 숫자를 전달하여 해당 횟수만큼 뒤로 이동 가능 (-1 => 한 페이지 뒤로 이동)
                // navigate(-1)
            }}>Home</button>
        </div>
    }
}

function App() {
    return (
        <Router>
            <Link to="/">Home</Link><br />
            <Link to="/exist">존재하는 주소</Link><br />
            <Link to="/redirect1">Redirect to /</Link><br />
            <Link to="/redirect2">Redirect to /exist</Link><br />
            <Link to="/redirect_component1">RedirectComponent (#1)</Link><br />
            <Link to="/redirect_component2">RedirectComponent (#2)</Link>

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/exist" element={<div>Exist</div>} />
                {/* 
                    Navigate 컴포넌트를 이용하여 특정 주소로 redirect 가능
                    (여기서는 "/redirect1" 주소로 접근하면 "/" 주소로 redirect하도록 설정)
                */}
                <Route path="/redirect1" element={<Navigate to="/" />} />  
                <Route path="/redirect2" element={<Navigate to="/exist" />} /> 
                <Route path="/redirect_component1" element={<RedirectComponent redirectPath="/exist" />} />
                <Route path="/redirect_component2" element={<RedirectComponent />} />
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))