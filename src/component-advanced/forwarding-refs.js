import React, { useRef, forwardRef } from 'react'
import ReactDOM from 'react-dom'

// forwardRef는 컴포던트 리턴
// '자식' 컴포던트에 있는 dom 요소에 ref를 넘기고 싶을 때 사용 (잘 사용하지는 않는 듯)
const FancyButton = forwardRef(function(props, ref) { // 여기서 ref는 fancyButtonRef1
    const divStyle = { display: "inline", background: "#4267B2", color: "white", borderRadius: "5px" }

    return (
        <div style={divStyle}>
            <span>👍</span>
            {/* 내부에 있는 버튼에 ref를 연결한 것을 유의 */}
            <button
                ref={ref}
                className="FancyButton"
                onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
})

const UsingFancyButtonComponent = function(props) {
    // 기존 방식과 동일하게 ref 객체 생성
    const fancyButtonRef1 = useRef()
    const fancyButtonRef2 = useRef()

    return (
        <div>
            {/*
                부모 컴포넌트에서 ref 객체 생성 후 자식 컴포넌트로 전달하기(forwarding)
                (여기서 ref를 통해 접근하는 요소는 FancyButton이 아닌, FancyButton 내부의 button 요소임을 유의)
            */}
            <FancyButton ref={fancyButtonRef1} onClick={()=>{
                /*
                    이후에는 ref 객체를 통해 컴포넌트 내부의 DOM에 직접 접근 가능
                    (단, 여기서 참조하는 current 값은 FancyButton 컴포넌트가 아니라 FancyButton 내부의 button 요소임을 유의!)
                */
                fancyButtonRef2.current.disabled = true
                setTimeout(() => {
                    fancyButtonRef2.current.disabled = false
                }, 1000)
            }}>Disable Button 2</FancyButton>
            <br />
            <FancyButton ref={fancyButtonRef2} onClick={()=>{
                fancyButtonRef1.current.disabled = true
                setTimeout(() => {
                    fancyButtonRef1.current.disabled = false
                }, 1000)
            }}>Disable Button 1</FancyButton>
        </div>
    )
}

ReactDOM.render(<UsingFancyButtonComponent />, document.getElementById("root"))