import React from 'react'
import ReactDOM from 'react-dom'
// https://react-icons.github.io/react-icons/
// 공식 홈페이지의 검색창을 통해서 아이콘 검색 가능
// SVG 아이콘 컴포넌트 불러오기
import { FaBitcoin, FaApple, FaFacebook, FaMailchimp, FaBeer } from 'react-icons/fa'
import { DiStackoverflow, DiJava, DiGithubBadge, DiAtom, DiAndroid } from "react-icons/di"
import { AiOutlineUser, AiOutlineUserAdd,  AiOutlineUserDelete, AiOutlineUserSwitch, AiOutlineUsergroupAdd } from "react-icons/ai"

// React는 react-icons 이라는 라이브러리를 제공(svg를 모아놓음)
const IconGallery = function(props) {
    const s = props.style
    return (
        <div>
            <FaBitcoin style={s} />
            <FaApple style={s} />
            {/* 단순히 아이콘 표시하는 것 외에도 응용이 가능 */}
            <a href="https://www.facebook.com"><FaFacebook style={s} /></a>
            <FaMailchimp style={s} />
            <FaBeer style={s} />

            <hr />
            <DiJava style={s} />
            <a href="https://www.github.com"><DiGithubBadge style={s} /></a>
            <DiAtom style={s} />
            <DiAndroid style={s} />
            <DiStackoverflow style={s} />

            <hr />
            <AiOutlineUser style={s}/>
            <AiOutlineUserAdd style={s}/>
            <AiOutlineUserDelete style={s}/>
            <AiOutlineUserSwitch style={s}/>
            <AiOutlineUsergroupAdd style={s}/>
        </div>
    )
}

const style = {width: '50px', height: '50px', color: '#169'}
ReactDOM.render(<IconGallery style={style}/>, document.getElementById("root"))