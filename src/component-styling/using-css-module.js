import React from 'react'
import ReactDOM from 'react-dom'
import buttonStyle from './MyButton.module.css'
import cn from 'classnames'

const MyButton = function(props) {
    // 템플릿 문자열 사용이 불편하므로, classnames 모듈 활용
    console.log( cn('foo', 'bar') ) // => 'foo bar'
    console.log( cn('foo', { bar: true }) ) // => 'foo bar'
    console.log( cn({ 'foo-bar': true }) ) // => 'foo-bar'
    console.log( cn({ 'foo-bar': false }) ) // => ''
    console.log( cn({ foo: true }, { bar: true }) ) // => 'foo bar'
    console.log( cn({ foo: true, bar: true }) ) // // => 'foo bar'
    // falsy 값은 모두 무시 (null, false, undefined, 0, 빈 문자열(''))
    console.log( cn(null, false, 'bar', undefined, 0, 1, { baz: null }, '') ) // => 'bar 1'

    const { font, color, size, border } = buttonStyle;
    return <button className={cn(font, color, size, border)}>{props.label}</button>
}

ReactDOM.render(<MyButton label="Click Me" />, document.getElementById("root"))