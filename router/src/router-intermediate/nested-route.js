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
            {/* Outlet 컴포넌트는 렌더링할 컴포넌트의 위치를 지정할 placeholder 역할을 수행함 */}
            <Outlet /> {/* Article or ArticleList로 치환된다 */}
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
                <Route path="/articles" element={<Articles />}>
                {/*
                    밑에 처럼 element 속성 없이 쓰는 경우에도 잘 동작함,
                    만약 중첩된 컴포넌트(여기서는 Article 혹은 ArticleList) 
                    바깥에 공통적으로 그려져야 할 내용이 없으면 생략해도 무방함
                    <Route path="/articles">
                */}
                    {/*
                        내부에 중첩된 Route이므로 상위 Route 컴포넌트에 명시한 주소("/articles")에
                        이어붙여지는 형태로 주소가 구성됨 (즉, "/articles/:articleId")
                    */}
                    <Route path=":articleId" element={<Article />} /> 
                    {/* 
                        어떤 추가 주소 없이 순수하게 "/articles" 주소일 경우,
                        그려줄 컴포넌트가 포함된 Route 컴포넌트의 경우 index 속성을 지정
                        (이 라우팅 주소의 인덱스 페이지(=컴포넌트)라는 의미로 해석 가능)
                    */}
                    <Route index element={<ArticleList />} />
                </Route>
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))