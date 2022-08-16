import React from "react"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, Outlet } from 'react-router-dom'
import ReactDOM from "react-dom"
import { useContext, useRef, useState } from "react"

// 전역적으로 사용자 정보 저장하기 위해서 Context API 사용
const UserContext = React.createContext(null)

// 권한이 없어도 보이는 컴포넌트 정의
const Public = props => <h3>Public</h3>
// 로그인 이후 사용자 정보가 있어야 보여줄 컴포넌트 정의
const Protected1 = props => <h3>Protected Page 1</h3>
const Protected2 = props => <h3>Protected Page 2</h3>
const Protected3 = props => <h3>Protected Page 3</h3>
// 관리자 권한이 있어야 보여줄 컴포넌트 정의
const AdminProtected = props => <h3>Admin Page</h3>

const AuthButton = props => {
    const { user, setUser } = useContext(UserContext)

    return user ?
        /*
            로그아웃 시, 유저 정보 삭제 => 유저 정보가 삭제되는 시점에 App의 re-render가 진행되고, 
            내부적으로 PrivateRoute로 감싸진 컴포넌트의 검증 작업이 다시 재개됨 (이후, 로그인 컴포넌트로 이동)
        */
        <p>Welcome! {user.id} <button onClick={() => setUser(null)}>Sign out</button></p>
        :
        <p>You are not logged in.</p>
}

// 로그인 화면 컴포넌트
const Login = props => {
    const { setUser } = useContext(UserContext)
    // PrivateRoute로 전달받은 이전 주소 정보(state) 가져오기
    const { state } = useLocation()
    const [ redirectToReferrer, setRedirectToReferrer ] = useState(false)
    const [ authenticating, setAuthenticating ] = useState(false)
    
    const idInput = useRef()
    const passwordInput = useRef()

    const login = () => {
        setAuthenticating(true)
        // async fake auth
        setTimeout(() => {
            setAuthenticating(false)
            // 유저 정보 저장 (이 시점 이후 보호된 컴포넌트 접근 가능)
            const id = idInput.current.value
            setUser({
                id,
                password: passwordInput.current.value,
                roles: id === "admin" ? ["admin"] : []
            })
            // ProtectedRoute 내부의 Redirect 컴포넌트로부터 전달받은 이전 주소 참조하여 redirect 하도록 true 값 설정
            setRedirectToReferrer(true)
        }, 1000)
    }

    if(redirectToReferrer === true) {
        /*
            전달받은 주소(state?.from)로 이동하되, 만약 주소 정보가 없다면, 루트 주소("/")로 이동
            (로그인 화면에 대한 기록을 굳이 브라우저 history 스택에 쌓을 필요가 없으므로 replace 옵션 적용)
            (history 덮어 쓰기)
        */
        return <Navigate to={state?.from || '/'} replace />
    }

    return (
        <div>
            <p>You must log in to view the page</p>
            { state?.message ? <p>{`(${state.message})`}</p> : null } {/* ?. : null인지 */}
            <label>id: <input type="text" ref={idInput} /></label><br />
            <label>password: <input type="password" ref={passwordInput} /></label><br />
            <button disabled={authenticating} onClick={login}>{authenticating ? "..." : "Log in"}</button>
        </div>
    )
}

const ProtectedRoute = props => {
    const { user } = useContext(UserContext)
    const location = useLocation()
    // 기본적으로는 로그인 후 현재 주소로 리다이렉트 하도록 주소를 설정하되 명시한 리다이렉트 주소가 있으면 해당 주소로 이동하도록 설정
    const from = props.redirect ?? location.pathname

    // 유저 정보가 존재하면
    if(user) {
        // 로그인 여부뿐만 아니라 허용된 사람만 접근할 수 있는 페이지라면
        if(props.allowed) {
            // 부족한 권한이 있는지 검사 후
            const missingRoles = []
            for(const role of props.allowed) user.roles.includes(role) || missingRoles.push(role)
            if(missingRoles.length > 0) {
                // 부족한 권한이 있으면 로그인 페이지로 리다이렉트하되, 사유를 설명하기 위한 정보를 첨부
                return <Navigate to={{ pathname: "/login" }} state={{ message: `${missingRoles.join(',')} 권한이 없습니다.` }} />
            }
        }
        /*
            기본적으로 전달받은 컴포넌트(children)를 그려주고,
            중첩 라우트를 적용한 상황을 대비해서 Outlet을 적용할 수도 있게 코드 작성
        */
        return (props.children ? props.children : <Outlet />)
    } else {
        /*
            정보가 없다면 리다이렉트를 통해서 로그인 페이지로 이동하되, 
            로그인 후 바로 현재 화면으로 복귀할 수 있도록 현재 주소(or 명시한 리다이렉트 주소) 정보를 전달하며 이동
        */
        return <Navigate to={{ pathname: "/login" }} state={{ from }} />
    }    
}

const App = props => {
    // 전역 사용자 정보 상태 저장
    const [ user, setUser ] = useState(null)

    return (
        <UserContext.Provider value={{ user, setUser }}> {/* useContext훅은 전역 정보를 저장할 때 사용 */}
            <Router>
                <div>
                    <AuthButton />

                    <ul>
                        <li><Link to="/login">Login Page</Link></li>
                        <li><Link to="/public">Public Page</Link></li>
                        <li><Link to="/protected1">Protected Page 1</Link></li>
                        <li><Link to="/protected2">Protected Page 2</Link></li>
                        <li><Link to="/protected3">Protected Page 3</Link></li>
                        <li><Link to="/admin">Admin Page</Link></li>
                    </ul>

                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/public" element={<Public />} />
                        {/* 권한(유저 정보)이 필요한 비공개된 주소(비공개된 컴포넌트)라면, ProtectedRoute 사용 */}
                        {/* v5에서 구현하던 방식으로 사용 */}
                        <Route path="/protected1" element={  /* props.children 방식 */
                            <ProtectedRoute>
                                <Protected1 />
                            </ProtectedRoute>
                        } />
                        {/* v6의 중첩 라우팅 형태로도 사용 가능 */}
                        <Route element={<ProtectedRoute />}>  {/* <Outlet/> 방식 */}
                            <Route path="/protected2" element={<Protected2 />} />
                        </Route>
                        {/* redirect 값을 전달하여 로그인 이후 리다이렉트 주소 명시 가능 */}
                        <Route element={<ProtectedRoute redirect="/public" />}>
                            <Route path="/protected3" element={<Protected3 />} />
                        </Route>
                        {/* allowed 값을 전달하여 필요한 권한 명시 가능 */}
                        <Route element={<ProtectedRoute allowed={['admin']} />}>
                            <Route path="/admin" element={<AdminProtected />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))