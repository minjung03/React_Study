import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useSearchParams, useNavigate } from "react-router-dom"

function UseLocationStudyComponent(props) {
    // useLocation 훅 이용해서 location 객체 접근 가능
    const location = useLocation()

    // v6부터 useSearchParams 훅 사용 가능
    // https://stackoverflow.com/a/37568368/1957379
    const [ searchParams ] = useSearchParams()
    console.log(searchParams.get('name'))   // "John"
    console.log(searchParams.get('age'))    // 20
    // Map 자료구조처럼 사용 가능
    /*
    for(let p of searchParams.keys()) console.log(p)
    for(let v of searchParams.values()) console.log(v)
    for(let e of searchParams) console.log(e)
    */

    /*
        location 객체에 포함된 정보

        pathname : 현재 주소(path)
        search : 쿼리 스트링
        hash : 프래그먼트(해시)
        state : 추가 정보
    */
    return (
        <div>
            {JSON.stringify(location)}
        </div>
    )
}

function UseParamsStudyComponent(props) {
    const params = useParams()
    // 비구조화 할당도 가능
    // const { id } = useParams()

    return (
        <div>id: { params.id }</div>
    )
}

function CommentDetail(props) {
    
    const comments = useParams();
    return (
        <div>{comments.blogsId}번 글의 {comments.commentId}번 코멘트</div>
    )
}


// https://www.digitalocean.com/community/tutorials/react-react-router-v6#usenavigate-instead-of-usehistory
function UseNavigateStudyComponent(props) {
    // 원래 v5에서 제공되었던 useHistory 훅 대신에 useNavigate 훅을 사용
    const navigate = useNavigate()
    console.log(navigate)
    /*
    // v5
    history.push('/home');
    history.replace('/home');

    // v6
    navigate('/home');
    navigate('/home', {replace: true});
    */

    return (
        <div>
            <button onClick={() => {
                navigate('/');
            }}>Home</button><br />
            <button onClick={() => {
                navigate('/params/1234');
            }}>to "/params/1234"</button>
        </div>
    )
}


function App() {
    return (
        <Router>
            <Link to="/hello/world?name=john&age=20#frag">HelloWorld</Link><br />
            <Link to="/params/1234">With ID Param (1234)</Link><br />
            <Link to="/params/5678">With ID Param (5678)</Link><br />
            <Link to="/navigate">Navigate</Link><br />
            <Link to="/blogs/1/comments/100">1번 글의 100번 코멘트</Link><br />
            <Link to="/blogs/3/comments/50">3번 글의 50번 코멘트</Link><br />

            <Routes>
                <Route path="/hello/world" element={<UseLocationStudyComponent />}></Route>
                {/* path에는 경로만 작성! (쿼리스트링 X) */}
                <Route path="/params/:id" element={<UseParamsStudyComponent />}></Route>
                <Route path="/navigate" element={<UseNavigateStudyComponent />}></Route>
                <Route path="/blogs/:blogsId/comments/:commentId" element={<CommentDetail/>}></Route>
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))