import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

// 커스텀 훅 -> 코드 중복 최소화
const useAsync = (asyncFunction, immediate = true) => {
    // 현재 상태(idle, pending, success, error)를 저장할 상태
    const [status, setStatus] = useState("idle");
    // 작업 성공 이후에 저장할 값
    const [value, setValue] = useState(null);
    // 작업 실패 이후에 저장할 에러 값
    const [error, setError] = useState(null);
    
    const execute = useCallback(() => {
        // 함수 실행 즉시 pending 상태로 설정
        setStatus("pending");
        setValue(null);
        setError(null);
        
        // 프라미스 객체를 반환하는, 비동기 작업을 진행하는 함수 실행
        return asyncFunction()
            .then((response) => {
                // 성공
                setValue(response);
                setStatus("success");
            })
            .catch((error) => {
                // 실패
                setError(error);
                setStatus("error");
            });
    }, [asyncFunction]); // 함수가 변경될 경우에만 다시 useEffect 로직이 실행되도록 함
    
    // immediate 값을 이용하여 함수 바로 실행 여부를 설정 가능
    // (가령, 해당 함수를 버튼 클릭을 해야 실행하게 하고 싶다면 immediate 값을 false로 설정)
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);
    
    return { execute, status, value, error };
};

// 프라미스 객체를 반환하는 비동기 작업 함수 정의
const myFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 50% 확률로 실패 or 성공
            const rnd = Math.random() * 10;
            rnd <= 5
                ? resolve("Submitted successfully 🙌")
                : reject("Oh no there was an error 😞");
        }, 2000);
    });
};

function App() {
    // execute => 실행 함수
    // status => 상태 값
    // value => 성공 이후 반환 값
    // error => 실패 이후 반환 값
    const { execute, status, value, error } = useAsync(myFunction, false);
    
    // 내부적으로는 상태 변환에 따르는 뷰의 모습과 성공, 실패값을 활용하는 로직 작성 가능
    
    return (
        <div>
            {status === "idle" && <div>Start your journey by clicking a button</div>}
            {status === "success" && <div>{value}</div>}
            {status === "error" && <div>{error}</div>}
            <button onClick={execute} disabled={status === "pending"}>
                {status !== "pending" ? "Click me" : "Loading..."}
            </button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));