import React, { Suspense } from 'react'
import { Routes, Route, Link } from "react-router-dom"

const AboutSuspenseComponent = () => <div>(About page) Loading...</div>
// About 컴포넌트 내부에서 동적 로딩으로 불러올 컴포넌트 정의
const History = React.lazy(() => import('./History'))
const Contact = React.lazy(() => import('./Contact'))

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <nav>
                {/* 
                    바깥에서 "/about" 주소인 시점에 렌더링하므로 여기서는 "/about/"을
                    붙여주지 않고 뒷 주소만 써주기 (Route 컴포넌트도 마찬가지)
                */}
                <Link to="history">History</Link><br />
                <Link to="contact">Contact</Link><br />
            </nav>

            <div>
                <Suspense fallback={<AboutSuspenseComponent />}>
                    <Routes>
                        {/* history => about/history */}
                        <Route path="history" element={<History />} />
                        <Route path="contact" element={<Contact />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    )
}

export default About