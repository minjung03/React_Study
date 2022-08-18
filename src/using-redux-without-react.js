// 'npm install redux' 라이브러리 설치
const redux = require('redux')

// 리듀서 함수
function reducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'COUNTER/INCREMENT':
            return { count: state.count + 1 }
        case 'COUNTER/DECREMENT':
            return { count: state.count - 1 }
        case 'COUNTER/ADD':
            return { count: state.count + action.payload.amount }
        default:
            return state
    }
}

// 스토어 생성
const store = redux.createStore(reducer)

// getState 메소드로 상태 알아보기
console.log(store.getState()) // { count: 0 }
// dispatch 메소드로 액션 전달하여 리듀서 함수 호출
store.dispatch({ type: 'COUNTER/INCREMENT' })
console.log(store.getState()) // { count: 1 }
store.dispatch({ type: 'COUNTER/INCREMENT' })
console.log(store.getState()) // { count: 2 }
store.dispatch({ type: 'COUNTER/DECREMENT' })
console.log(store.getState()) // { count: 1 }
store.dispatch({ type: 'COUNTER/ADD', payload: { amount: 10 } })
console.log(store.getState()) // { count: 11 }

// subscribe 메소드 호출하여 리스너 함수 등록, 이후 상태가 변경되면 해당 리스너 함수가 호출됨
// 해당 메소드의 반환 결과로 해지(unsubscribe) 함수가 반환됨
// (해지 함수를 호출하면 더 이상 리스너 함수가 호출되지 않게 됨)
const unsubscribe = store.subscribe(() => {
    console.log('from subscribe listener')
    console.log(store.getState())
})

// 이 시점 이후 리스너가 동작하므로 매 상태 변경 시점마다 콜백 함수가 실행됨
store.dispatch({ type: 'COUNTER/ADD', payload: { amount: 1 } })
store.dispatch({ type: 'COUNTER/ADD', payload: { amount: 2 } })

// 해지
unsubscribe()

// 이 시점 이후로는 리스너가 동작하지 않음
store.dispatch({ type: 'COUNTER/ADD', payload: { amount: 1 } })
store.dispatch({ type: 'COUNTER/ADD', payload: { amount: 2 } })