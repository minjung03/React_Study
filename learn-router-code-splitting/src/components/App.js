import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

// fallback 컴포넌트
const SuspenseComponent = () => <div>Loading...</div>
// 최상단 import 구문이 아닌, React.lazy로 동적 컴포넌트 불러오기
const Home = React.lazy(() => import('./Home'))
const Cart = React.lazy(() => import('./Cart'))
const About = React.lazy(() => import('./about/About.js'))

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link><br />
                <Link to="/about">About</Link><br />
                <Link to="/cart">Cart</Link><br />
            </nav>
            
            <div>
                {/* 동적으로 불러온 컴포넌트 적용시에는 Suspense 컴포넌트로 감싸기 */}
                <Suspense fallback={<SuspenseComponent />}>
                    {/* 라우팅 기반 코트 스플리팅 적용 */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* 
                            about 페이지로 이동하는 시점에 About 컴포넌트와 관련된 JS 파일 로딩 진행
                            (path 주소 뒤에 "/*" 붙인 이유는 "/about" 주소뿐만 아니라 "/about/history"와
                            같은 주소에서도 About 컴포넌트를 그려줘야 되기 때문에 붙인 것)
                        */}
                        <Route path="/about/*" element={<About />} />
                        {/* cart 페이지로 이동하는 시점에 Cart 컴포넌트와 관련된 JS 파일 로딩 진행 */}
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App