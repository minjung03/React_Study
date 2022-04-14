import React, { useState, useContext, createContext, useEffect } from "react"
import ReactDOM from "react-dom"
import down_arrow from "./img/down_arrow_gray.png";

// 미완!!

const RepoItem = (props) => {

    // RepoItem은 저장소 객체 하나를 전달받아서 저장소 정보를 출력
    const {name, description, html_url, visibility, default_branch} = props.repoitem

    return (
        <div> 
            <table style={{paddingLeft:50}}>
                <thead></thead>
                    <tbody>
                    <tr>
                        <td><hr style={{float:"left", width:600, backgroundColor:"#f0e4d6", height:9, border:0}}></hr></td>
                    </tr>
                    <tr>
                        <td>
                            <span style={{fontSize:30, fontWeight:"bold", marginRight:10}}>
                                {name}</span>
                            <span style={{textAlign:"center", display:"inline-block", width:45, fontSize:13, background:"#DAB88B", borderRadius:20, color:"#ffffff", padding:5}}>
                                {visibility}</span>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style={{marginTop:15, marginRight:10, textAlign:"center", display:"inline-block", width:60, fontSize:13, background:"#d4d4d4", borderRadius:10, color:"#424242", padding:5}}>
                                <img src={down_arrow} style={{textAlign:"center", marginRight:5}}/>
                                {default_branch}</span>
                            <span>{description}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><a href={html_url} style={{color:"#000000", textDecorationLine:"none"}}>View more</a></p>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )

}

const RepoList = (props) => {
    
    // RepoList는 배열 전체를 prop 값으로 전달받아서 내부적으로 map 이용해서 각각의 RepoItem 그려주는 역할
    
    if(props.userinfo.length != 0){

        const pofile_image = props.userinfo[0].owner.avatar_url

        return (
            <div style={{width:1000, borderRadius:30, background:"#FDF6EC", margin:50, padding:30}}>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td><img style={{verticalAlign:"top", width:300, height:300, borderRadius:"70%"}} src={pofile_image}/></td>
                            <td>{props.userinfo.map((repoitem) => <RepoItem repoitem={repoitem}/>)}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
    else 
        return <p>사용자가 없습니다</p>
    
}

const Search = ({onSubmit}) => {
    const [input, setInput] = useState('')

    return (
        <div>
            <table style={{marginTop:30, marginLeft:50}}>
                <thead></thead>
                <tbody>
                    <tr >
                        <td >
                            <input type="text" placeholder="User name" style={{paddingLeft:15, border:0, height:30, width:250, borderRadius:30, background:"#e9e9e9" }}
                                onChange={e=>setInput(e.target.value)} value={input}/>
                        </td>
                        <td>
                            <button style={{border:0, padding:8, width:70, height:33, marginLeft:5, borderRadius:30, background:"#B7CADB", color:"#000000"}}
                                onClick={e=> {if(input.trim().length != 0) onSubmit(input)}}>검색</button>  
                        </td>
                    </tr>
                </tbody>
            </table>
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
                setUserinfos(data)
            })
        }
    }, [username])

    if(username === null) return ( 
        <div>
            <Search onSubmit={setUsername}/>
            {/*<p>사용자를 입력하세요</p>*/}
        </div> 
    )

    return (
            <div>
                <Search onSubmit={setUsername} />  
                <RepoList userinfo={userinfos}/> 
            </div>
    )
    
}

ReactDOM.render(<GithubSearchApp />, document.getElementById("root"));