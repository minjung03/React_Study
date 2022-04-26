import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// 전체 스타일 CSS 파일 불러오기 - 거의 이런 경우일 때만 사용
import '../common/style.css'
// 컴포넌트 스타일 CSS 파일 불러오기
import './App.css'

const App = function(props) {
    return (
        <div id="mydiv">
            <p className="mypara">para</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))