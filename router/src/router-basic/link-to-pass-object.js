import React from "react"
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, useLocation
} from "react-router-dom"

const Courses = (props) => {
    // location 객체를 통해서 Link의 to prop을 통해 전달한 객체 접근 가능
    const location = useLocation() // 리액트 라우터에서 제공하는 훅
    
    return (
        <div>
            <p>{location.pathname}</p>
            <p>{location.search}</p>
            <p>{location.hash}</p>
            {/* state 객체를 통해서 추가 정보 접근 가능 */}
            <p>{location.state.fromDashboard.toString()}</p>
            <p>{location.state.onwer.toString()}</p>
        </div>
    )
}

function App() {
    return (
        <Router>
            <Link to="/">Home</Link><br />
            {/*
                to 속성 : URL 주소 관련 정보
                state 속성 : 주소와 관련되지 않은 추가 정보
            */}
            <Link to={{ // 객체로 주기
                    pathname: "/courses", // 주소(pathname) 전달 (원래 to에 문자열로 줘야 할 주소값)
                    search: "?sort=name&order=asc", // 필요한 경우 query string 전달
                    hash: "#the-hash", // 필요한 경우 fragment 전달
                    /*
                        경로(path) : /courses
                        쿼리스트링(query string) : ?sort=name&order=asc
                        해시(hash, fragment) : #the-hash
                    */
                }}
                state={{ // state는 객체로 전달
                    fromDashboard: true, // 필요한 경우 state 속성을 통해서 추가 정보를 객체 형태로 전달 가능
                    onwer : 'minjeong' // 유용하게 쓸 수 있다(유저 정보가 필요하면 유저 정보를...)
                }}
            >Courses</Link><br />

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/courses" element={<Courses />} /> {/* 컴포던트를 전달하는게 일반적! */}
            </Routes>
            
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))