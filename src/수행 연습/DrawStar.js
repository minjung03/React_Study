import React from 'react';
import ReactDOM from 'react-dom';


function DrawStar(props) {
    const result = []
    for(let i=0; i<props.num; i++){
        for(let j=0; j<i+1; j++){
            result.push("*")
        }
        result.push(<br></br>)
    }
    
    return (
        <div>
            {result}
        </div>
    )
}

ReactDOM.render(<DrawStar num={3}/>, document.getElementById('root'))