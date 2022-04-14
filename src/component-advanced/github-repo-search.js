import React, { useState, useContext, createContext, useEffect } from "react"
import ReactDOM from "react-dom"

// 미완!!

const RepoItem = (props) => {

    // RepoItem은 저장소 객체 하나를 전달받아서 저장소 정보를 출력
    console.log("3333")
    const {name, description} = props.repoitem

    return (
        <div>
            <p>{name}</p>
            <p>{description}</p>
        </div>
    )

}

const RepoList = (props) => {
    
    // RepoList는 배열 전체를 prop 값으로 전달받아서 내부적으로 map 이용해서 각각의 RepoItem 그려주는 역할

    const userinfo_item = props.userinfo;
    
    if(userinfo_item.length <= 0){
        return ( 
            <div>
                <p>없는 사용자 입니다</p>
            </div> 
        )
    }
    else {
        return (
            userinfo_item.map((repoitem) => {
            (<RepoItem repoitem={repoitem} />)
            console.log(repoitem.name);
            })
        )
    }

}

const Search = ({onSubmit}) => {
    const [input, setInput] = useState('')

    return (
        <div>
            <input type="text" onChange={e=>setInput(e.target.value)} value={input}/>
            <button onClick={e=> {if(input.trim().length != 0) onSubmit(input)}}>검색</button>  
        </div>
    )
} 


const GithubSearchApp = (props) => {

    const [userinfos, setUserinfos] = useState([])
    const [username, setUsername] = useState(null)

    useEffect(() => {
     
        if(username) {
            fetch(`https://api.github.com/users/${username}/repos`, { headers: { Authorization: "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" } })
            .then(res=>res.json())
            .then(data => {
                console.log(data)
                setUserinfos(data)
            })
        }
    }, [username])

    if(username === null) return ( 
        <div>
            <Search onSubmit={setUsername}/>
            <p>사용자를 입력하세요</p>
        </div> 
    )

    return <div>
                <Search onSubmit={setUsername} />  
                <RepoList userinfo={userinfos}/> 
            </div>
    
}

ReactDOM.render(<GithubSearchApp />, document.getElementById("root"));