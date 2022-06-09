import React from "react"
import { BrowserRouter as Router, Routes, Route, Link, useParams, Outlet } from "react-router-dom"
import ReactDOM from "react-dom"

const articles = [
    { "title": "제목 1", "content": "글 내용 1" },
    { "title": "제목 2", "content": "글 내용 2" },
    { "title": "제목 3", "content": "글 내용 3" }
]

function Home() {
    return (
        <div>
            <h1>홈 화면</h1>
        </div>
    )
}

function Articles(props) {
    return (
        <div>
            <h1>Articles</h1>
            <hr />
            {/*
                Outlet 컴포넌트를 없애고 자체적으로 Routes 컴포넌트를 포함하도록 하여 컴포넌트 내부에서 라우팅 진행
            */}
            <Routes>
                {/* path가 "/articles/:articleId"인 경우 */}
                <Route path=":articleId" element={<Article />} />
                {/* path가 "/articles"인 경우 */}
                <Route index element={<ArticleList />} />
            </Routes>
            <hr />
        </div>
    )
}

function Article(props) {
    const { articleId: idx } = useParams()
    const article = articles[+idx - 1]
    const btnLikeStyle = { border: "1px solid black", borderRadius: "6px", textDecoration: "none", backgroundColor: "gray", color: "white" }

    return (
        article ?
            <div>
                <h2>{article.title}</h2>
                <p>{article.content}</p>
                <div>
                    {idx >= 2 && <Link style={btnLikeStyle} to={`../${+idx - 1}`}>이전글</Link>}
                    {idx < articles.length && <Link style={btnLikeStyle} to={`../${+idx + 1}`}>다음글</Link>}
                </div>
                <Link to="..">목록</Link>
            </div>
            :
            <div>글이 존재하지 않습니다.</div>
    )
}

function ArticleList(props) {
    return (
        <ol>
            { articles.map((a, idx) => <div key={idx}><Link to={`${idx + 1}`}>{a.title}</Link></div>) }
        </ol>
    )
}

function App() {
    return (
        <Router>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/articles">Articles</Link></li>
            </ul>

            <hr />

            <Routes>
                <Route path="/" element={<Home />} />
                {/* 
                    path를 "articles/*"로 변경하여 articles를 포함한 모든 하위 path에 Articles 컴포넌트 렌더링하도록 변경
                    (이후 내부 라우팅 작업과 관련된 Routes 컴포넌트를 Articles 컴포넌트 내부에 배치)
                */}
                <Route path="/articles/*" element={<Articles />} />
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))