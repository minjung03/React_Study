import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const NewsItem = (props) => {
    const {title, description, url, urlToImage} = props.article

    return (
        <div>
            <h1><a href={url} target='_blank'>{title}</a></h1>
            <img style={{height: '100px'}} src={urlToImage}/>
            <p>{description}</p>
        </div>
    )
}

// 검색어 컴포던트 추가
const Search = ({onSubmit}) => {
    const [input, setInput] = useState('')

    return (
        <div>
            <input type="text" 
                onChange = {e=>setInput(e.target.value)} 
                value={input}/>
            <button onClick={e => {
                if(input.trim().length !== 0) onSubmit(input)}}
                >검색</button>
        
        </div>
    )
}

const NewsApp = (props) => {
    // 아래 3개의 패턴 알아두기
    // 저장할 공간 두고, setLoding 무조건 사용함!
    const [articles, setArticles] = useState([]) // 기사 데이터를 저장할 배열
    const [loading, setLoading] = useState(true) //  초기 로딩 화면 보이기 (뉴스를 불러오는 중입니다)
    const apiKey = '302dfa003a544625b4c029a0f8641133' // API 키 입력 

    const [keyword, setKeyword] = useState(null)


    useEffect(() => {
        if(keyword) {
        // 초기에 한 번만(의존배열을 빈 배열로 전달) API를 통해서 뉴스 데이터 읽어오기
        fetch(`http://newsapi.org/v2/everything?apiKey=${apiKey}&q=${keyword}`) // fetch() 함수는 잘 알아두기
            .then(res => res.json()) // 텍스트를 json으로 변환
            .then(data => { // data가 json객체인 것
                // 데이터 설정 및 로딩 상태 갱신
                console.log(data)
                setArticles(data.articles) // articles 배열에 기사 데이터가 저장되어 있다
                setLoading(false) // 데이터를 출력해야하니 로딩은 false
            })
        }
    }, [keyword])


    // 검색어가 없을 때
    if(keyword == null) return (
        <div>
            <Search onSubmit={setKeyword}/>
            <p>키워드를 입력해주세요.</p>
        </div>
    )

    return (
        <div>
            <Search onSubmit={setKeyword} /> 
            {
                // 기사가 없고 loding이 false면 표시할 뉴스가 없습니다.
                // 기사가 없고 loding이 true면 뉴스를 불러오는 중입니다.
                // 기사가 있으면 화면에 출력
                articles.length === 0 
                    ? loading ? <h1>뉴스를 불러오는 중입니다.</h1> : <h1>표시할 뉴스가 없습니다.</h1>
                    :
                    <ul>
                        
                        {
                            articles.map((article, idx) => {
                                return (<li key={idx}>
                                    <NewsItem article={article} />
                                </li>)
                            })
                        }
                    </ul>
            }
        </div>
    )
}

ReactDOM.render(<NewsApp />, document.getElementById("root"))