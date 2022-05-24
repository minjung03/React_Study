import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom'

/*
    에러가 발생하면 overlay 화면에 에러 발생 이유와 관련된 스택트레이스가 나타나서 
    ErrorBoundary 컴포넌트 렌더링 결과를 확인할 수 없는데, X 버튼을 눌러서 제거하면 됨
    (개발모드인 경우 생기는 현상)
    https://stackoverflow.com/questions/52096804/react-still-showing-errors-after-catching-with-errorboundary
*/

// 에러 경계 컴포던트 : 렌더링 도중 오류가 났을 때 대체할 UI을 보여주기 위해 사용되는 컴포던트 

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        // 처음에는 에러가 없으므로 null 값 저장
        this.state = { error: null }
    }

    static getDerivedStateFromError(error) {
        // 내부 컴포넌트에서 에러가 발생한 경우이므로 에러 객체를 저장하여 상태 업데이트
        return { error }
    }

    render() {
        if (this.state.error) {
            if (this.props.fallback) {
                // fallback 컴포넌트가 명시되어 있는 경우 해당 컴포넌트를 그려주기
                return this.props.fallback
            } else {
                // 만약 없다면 에러와 관련된 디폴트 fallback UI를 제공
                return <h1>Something went wrong. (message: {this.state.error.message})</h1>
            }
        }

        // 에러가 없을 경우 내용 그대로 렌더링
        return this.props.children
    }
}

const ErrorThrowComponent = function (props) {
    const [hasError, setHasError] = useState(false)
    if (hasError) throw new Error("에러 발생!")

    return (
        <div>
            <button onClick={() => {
                // 에러 일부러 발생시키기
                setHasError(true)
            }}>에러 발생 1</button>
            <button onClick={() => {
                // 보통 이벤트 핸들러 내부에서 발생한 에러는 try - catch 구문을 이용하여 처리
                try {
                    throw new Error("에러 발생!")
                } catch (e) {
                    console.log("에러 캐치")
                }
            }}>에러 발생 2</button>
        </div>
    )
}

const NonNegativeCounter = () => {
    const [count, setCount] = useState(0)
    // 로직 혹은 특정 조건에 의한 에러 발생 상황
    if (count < 0) {
        throw new Error('숫자는 음수가 될 수 없습니다.');
    }

    return (
        <div>
            <div>{count}</div>
            <button onClick={() => setCount(count + 1)}>증가</button>
            <button onClick={() => setCount(count - 1)}>감소</button>
        </div>
    )
}

ReactDOM.render(
    <div>
        <ErrorBoundary fallback={<div>fallback UI</div>}>
            <ErrorThrowComponent />
        </ErrorBoundary>
        <ErrorBoundary>
            <NonNegativeCounter />
        </ErrorBoundary>
    </div>
    , document.getElementById("root"))