import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
// 사용할 Context 불러오기
import UserContext from "./contexts/UserContext";

const UserConsumeComponent = (props) => {
    // 간단히 useContext 훅에 불러온 Context 객체를 전달하는 것만으로 전역값에 접근 가능
    const user = useContext(UserContext)

    return (
        <div>
            <h1>UserConsumeComponent</h1>
            <p>id : { user.id }</p>
            <p>name : { user.name }</p>
        </div>
    )
}

const UserIdPrinter = (props) => {
    const user = useContext(UserContext)

    return (
        <div>
            <h1>User ID Printer</h1>
            <p>id : { user.id }</p>
        </div>
    )
}

const Nested = (props) => <>{props.children}</>

function App() {
    const globalUser = {
        name: "John",
        id: "john123"
    }

    // 불러온 컨텍스트의 Provider 컴포넌트를 이용해서 전역값에 접근할 모든 컴포넌트를 감싸주어야 함
    // (그래서 보통 가장 루트 컴포넌트에서 Provider 컴포넌트를 씌워줌)
    return (
        <UserContext.Provider value={globalUser}> {/* Provider 안에 있는 것은 globalUser값에 접근 가능 */}
            <Nested>
                <Nested>
                    <UserConsumeComponent />
                    <Nested>
                        <UserIdPrinter />
                    </Nested>
                </Nested>
            </Nested>
        </UserContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));