import React, { useEffect, useState }  from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom"

// https://jsonplaceholder.typicode.com 사용해서 유저 정보 출력 예제 풀
function UserDetail(props){

    const { userid } = useParams();
    const [ error, setError ] = useState(null);
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

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

                  <button onClick={() => navigate(-1)}>목록으로</button>
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


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList />}></Route> {/* 루트로 접속 할 경우 유저 리스트 출력 */}
                <Route path="/users/:userid" element={<UserDetail/>}></Route>
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))