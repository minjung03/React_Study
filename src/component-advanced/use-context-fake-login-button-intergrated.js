import React, { useState, useContext, createContext } from "react"
import ReactDOM from "react-dom"

const LoginUserContext = createContext(null)

function UserInfo(props) {

    const { setLoginUser } = useContext(LoginUserContext)
    const [ fetching, setFetching ] = useState(false)
    const { loginUser } = useContext(LoginUserContext)

    const handleLogin = () => {
        setFetching(true)
        fetch('https://api.github.com/users/minjung03/repos', { headers: { Authorization: "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" } })
            .then(res => res.json())
            .then(data => {
                const login = data.results[0].login
                
                setLoginUser({
                    picture: data.results[0].picture.large,
                    username: login.username,
                    email: data.results[0].email,
                    cell: data.results[0].cell,
                });
                setFetching(false)
            })
    }

    const handleLogout = () => {
        setLoginUser(null)
    }


    if (fetching) return <button disabled>...</button>
    
    return loginUser === null ? <button onClick={handleLogin}>Login</button> 
           : 
           ( <div>
                <button onClick={handleLogout}>Logout</button>
                <img src={loginUser.picture} style={{ borderRadius: '50%', width:40, height:40}}/>
                <span style={{fontSize:25, fontWeight:"bold"}}>{loginUser.username}</span>
                <span style={{fontSize:23, marginLeft:10}}>(email: {loginUser.email})</span>
             </div> )
}

function App() {
    const [ loginUser, setLoginUser ] = useState(null)

    return (
        <LoginUserContext.Provider value={ { loginUser, setLoginUser } }>
            <UserInfo />
        </LoginUserContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));