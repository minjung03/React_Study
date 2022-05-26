import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './modal.css'

// index.html에 정의한 modal 아이디를 부여한 div에 그릴 내용을 보여줄 포탈 컴포넌트 정의
const ModalPortal = function(props) {
    const modalArea = document.getElementById('modal')
    // createPortal 함수 이용해서 그려주기
    // (이때 전달받은 자식 컴포넌트(children)를 root 영역이 아닌 modal 영역에 그리게 됨)
    return ReactDOM.createPortal(props.children, modalArea)
}

// 모달 영역에 그릴 로딩 스크린
const LoadingScreen = function(props) {
    return (
        <div className="loading-modal">
            <div className="window">
                <img src="https://images.digi.com/loading.gif" />
            </div>
        </div>
    ) 
}

// 모달 영역에 그릴 컨펌 모달
const ConfirmModal = function(props) {
    const { title, content, handleModalClose, positiveLabel = "Yes", negativeLabel = "No" } = props
    return (
        /* 모달 외부 영역을 클릭 했을 때, 모달이 종료될 수 있도록 click 이벤트 설정 */
        <div className="alert-modal" onClick={() => handleModalClose("negative")}>
            {/* alert-modal 내부의 요소에 대해서 click 이벤트가 발생해도 더 이상 상위 요소로 이벤트가 버블링되지 않도록 stopPropagation 호출 */}
            <div className="window" onClick={(e) => e.stopPropagation()}>
                <h1>{title}</h1>
                <p>{content}</p>
                <button onClick={() => handleModalClose("positive")}>{positiveLabel}</button>
                <button onClick={() => handleModalClose("negative")}>{negativeLabel}</button>
            </div>
        </div>
    )
}

const App = function(props) {
    const [state, setState] = useState({
        showModal: false,
        showLoading: false
    })

    const handleModalClose = (value) => {
        alert(value)
        setState(prev => ({ ...prev, showModal: false }))
    }

    return (
        <div>
            <button onClick={() => {
                setState(prev => ({ ...prev, showLoading: true }))
                setTimeout(() => {
                    setState(prev => ({ ...prev, showLoading: false }))
                }, 2000)
            }}>데이터 불러오기</button>
            <button onClick={() => {
                setState(prev => ({ ...prev, showModal: !prev.showModal }))
            }}>모달 보여주기</button>
            {/*
                modal 아이디가 부여된 div에 그리기 위해서 ModalPortal 컴포넌트 내부에 모달 관련 컴포넌트 배치하기
                (LoadingScreen, ConfirmModal 컴포넌트 모두 
                "개념적으로는 App 컴포넌트 내부에 위치"
                하지만 포털 컴포넌트(ModalPortal)를 통해서 
                "외부(modal 아이디를 가진 div)에 렌더링"
                되게 됨)
            */}
            {
                state.showLoading &&
                    <ModalPortal>
                        <LoadingScreen />
                    </ModalPortal>
            }
            {
                state.showModal &&
                    <ModalPortal>
                        <ConfirmModal title="Hello" content="Content" handleModalClose={handleModalClose} />
                    </ModalPortal>
            }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))