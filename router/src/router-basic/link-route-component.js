import React from "react"
import ReactDOM from 'react-dom'
import {
    // Router 별칭 부여
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from "react-router-dom"

function App() {
    return (
        <Router>

            {/* to 속성값으로 이동할 주소를 전달 */}
            <Link to="/">/</Link><br />
            <Link to="/abc">abc</Link><br />
            <Link to="/abcdef">abcdef</Link><br />
            <Link to="/abc/def">abc/def</Link><br />
            {/* a 태그를 사용하면 페이지 이동 발생 */}
            <a href="/abc/def">(a tag) abc/def</a><br />

            <Routes>
                <Route path="/" element={<div>path=/</div>} />
                <Route path="/abc" element={<div>path=/abc</div>} />
                <Route path="/abcdef" element={<div>path=/abcdef</div>} />
                <Route path="/abc/def" element={<div>path=/abc/def</div>} />
            </Routes>
            
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))