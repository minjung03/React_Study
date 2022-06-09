import React, { useEffect, useState }  from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, Outlet } from "react-router-dom"

// https://jsonplaceholder.typicode.com 사용해서 유저 정보 출력 예제 풀
function UserDetail(props){

    const { userid } = useParams();
    const [ error, setError ] = useState(null);
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();
    const btnStyle = { border: "1px solid gray", padding:"3px", borderRadius: "6px", textDecoration: "none", backgroundColor: "#fff000", color: "white" }
    const BtnListStyle = { border: "1px solid gray", padding:"3px", borderRadius: "6px", textDecoration: "none", backgroundColor: "#0099a4", color: "white" }
    const LinkStyle = { textDecoration: "none", color: "black" }

    useEffect(() => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userid}`)
            .then(r => {
                if(r.status === 404) throw new Error("404"); // 404 등 에러 잡아주기!!
                else return r.json()
            })
            .then(data => {
                setUser(data);
            })
            .catch(e => {
                setError(e)
                setUser(null)
                console.log(e)
            })

    }, [userid])

    if(error) {
        return (
            <div>
                <div>해당 유저는 존재하지 않습니다</div>
                <button onClick={() => navigate(-1)}>목록으로</button>
            </div>
        )
    }
    else {
        if(user === null) return <div><h3>User Info Loding...</h3></div>
        else {
            return (
                <div>
                  <p>id : {user.id}</p>
                  <p>이름 : {user.name}</p>
                  <p>이메일 : {user.email}</p>
                  <p>사이트 : {user.website}</p>

                  {(userid >= 1 && userid != 10) ? 
                    <button style={btnStyle}>
                        <Link style={LinkStyle} to={`../${+userid + 1}`}>다음 유저</Link>
                    </button> 
                  : null}

                  {(userid <= 10 && userid != 1) ? 
                    <button style={btnStyle}>
                        <Link style={LinkStyle} to={`../${+userid - 1}`}>이전 유저</Link>
                    </button> 
                  : null}

                  <button style={BtnListStyle} onClick={() => navigate("/users")}>목록으로</button>
                </div>
            )
        }     
    }
}

function UserList(props) {

    const [userList, setUserList] = useState(null);

    useEffect(() => {
            fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res=>res.json())
            .then(data => {
                setUserList(data);
            })
    }, [])

    if(userList === null){
        return (<div><h3>User List Loding...</h3></div>)
    }
    else {
        return (
            <div>
                {userList.map((user) =>
                    <div>
                        <Link to={"/users/"+user.id}>user {user.id}</Link><br/>
                    </div>
                )}
            </div>
        )
    }
}

function Users(props) {
    return <Outlet /> /* Outlet은 공통적으로 그려주고 싶은게 있을 때에만 작성하면 된다, 이 예제에서는 사용 안함 */
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users">
                    <Route path=":userid" element={<UserDetail/>}/>
                    <Route index element={<UserList/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))