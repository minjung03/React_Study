import React from 'react'
import ReactDOM from 'react-dom'

const Child = props => <div>{props.children}</div>


const Card = function(props) {
    return (
        <div style={{
            width: props.width, height: props.height,
            borderRadius: "6px",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 24px"
        }}>
            {props.children}
        </div>
    )
}


ReactDOM.render(
    <>
        <Card>Hello</Card>
        
        <Child>World</Child>
        <Child>
            <hi>title</hi>
            <div>
                <p>para</p>
            </div>
        </Child>
    </>,
    document.getElementById("root")
)