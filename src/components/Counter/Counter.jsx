import './Counter.css'

function Counter({ bombs, activeFlags }) {
    return `🚩 ${bombs - activeFlags}`
}

export default Counter
