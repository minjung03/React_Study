import React, { useState, useContext, createContext, useEffect } from "react"
import ReactDOM, { unstable_renderSubtreeIntoContainer } from "react-dom"
import down_arrow from "./img/down_arrow_gray.png";
import loading_spinner from "./img/loading.png";
import styled, { css } from 'styled-components';
import "./css/skeleton.css";
import SkeletonProfile from "./skeleton_user_repo";


const SkeletonElement = ({type}) => {

    const classes = `skeleton ${type}`;
    return <div className={classes}></div>;
    
};
export default SkeletonElement;


const RepoItem = (props) => {

    // RepoItem은 저장소 객체 하나를 전달받아서 저장소 정보를 출력
    const {name, description, html_url, visibility, default_branch} = props.repoitem

    return (
        <div> 
            <table style={{paddingLeft:50}}>
                <thead></thead>
                    <tbody>
                    <tr>
                        <td><Main_hr></Main_hr></td>
                    </tr>
                    <tr>
                        <td>
                            <span style={{fontSize:30, fontWeight:"bold", marginRight:10}}>
                                {name}</span>
                            <Repo_visibility>
                                {visibility}</Repo_visibility>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Repo_branch>
                                <img src={down_arrow} style={{textAlign:"center", marginRight:5}}/>
                                {default_branch}
                            </Repo_branch>
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
   
    if(props.userRepo.length > 0){


        console.log(props.userRepo.length)
        const pofile_image = props.userRepo[0].owner.avatar_url

        return (
            <Main_div><div>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td><Main_Img src={pofile_image}/></td>
                            <td>{props.userRepo.map((repoitem) => <RepoItem repoitem={repoitem}/>)}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            </Main_div>
        )
    } else  {
        return <Tag_p>저장소가 없습니다</Tag_p> 
    }
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
                            <Search_input type="text" placeholder="User name" 
                                onChange={e=>setInput(e.target.value)} value={input}/>
                        </td>
                        <td>
                            <Search_Button 
                                onClick={e=> {if(input.trim().length != 0) onSubmit(input)}}>검색</Search_Button>  
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
} 


const GithubSearchApp = (props) => {

    const [userRepos, setUserRepos] = useState([])
    const [username, setUsername] = useState(null)
    const [error, setError] = useState(null)
    const [isLoding, setIsLoding] = useState(false)

    useEffect(() => {
        if(username) {
            setError(null)
            setIsLoding(true)
            fetch(`https://api.github.com/users/${username}/repos`, { headers: { Authorization: "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" } })
            .then(res => {
                if(!res.ok) throw new Error("404");
                else {
                    return res
                }
            })
            .then(res=>res.json())
            .then(data => {
                console.log(data)
                setUserRepos(data)
                if(data != null)  setIsLoding(false)
            })
            .catch(e => {
                setError(e)
            })
            
        }
    }, [username])


    if(error) {
        return (
            <div>
                <Search onSubmit={setUsername}/>
                <Tag_p>사용자가 존재하지 않습니다.</Tag_p>
            </div> 
        )
    }
    if(!username) {
        return ( 
        <div>
            <Search onSubmit={setUsername}/>
            <Tag_p>사용자를 입력하세요</Tag_p>
        </div> 
    )}

    return (
        // isLoding ? <img src={loading_spinner} style={{width:50, height:50, margin:30}}/>:
        isLoding ? <SkeletonProfile/> :
            <div>
                <Search onSubmit={setUsername} />  
                <RepoList userRepo={userRepos}/> 
            </div>
    )
    
}

const Tag_p = styled.p`
    margin-left : 60px
`;

const Main_div = styled.div`
    width : 1000px;
    background-color : #FDF6EC;
    border-radius : 30px;
    margin : 50px;
    padding: 30px;
    
`;

const Search_input = styled.input`
    border:0;
    height : 30px;
    width : 250px;
    border-radius : 30px;
    background-color : #e9e9e9;
    padding-left : 15px;
`;

const Search_Button = styled.button`
    border:0;
    padding: 0;
    height : 33px;
    width : 70px;
    margin-left : 5px;
    border-radius : 30px;
    background-color : #B7CADB;
    color:#000000;
`

const Main_Img = styled.img`
    height : 300px;
    width : 300px;
    border-radius : 70%;
    vertical-align : top;
`;

const Main_hr = styled.hr`
    float : left;
    width : 600px;
    background-color : #f0e4d6;
    height : 9px;
    border : 0;
`;

const Repo_visibility = styled.span`
    text-align : center;
    display : inline-block;
    width : 45px;
    font-size : 13px;
    background-color : #DAB88B;
    border-radius : 20px;
    color : #ffffff;
    padding : 5px;
`;


const Repo_branch = styled.span`
    margin-top : 15px;
    margin-right : 10px;
    text-align : center;
    display : inline-block;
    width : 60px;
    font-size : 13px;
    background-color : #d4d4d4;
    border-radius : 10px;
    color : #424242;
    padding : 5px;
`
ReactDOM.render(<GithubSearchApp />, document.getElementById("root"));