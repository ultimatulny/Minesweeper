import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Leadership() {
    const [leadership, setLeadership] = useState({})

    useEffect(() => {
        let storedLeadership = localStorage.getItem('leadership')
        if (storedLeadership) {
            storedLeadership = JSON.parse(storedLeadership)
            setLeadership(storedLeadership)
        } else {
            localStorage.setItem('leadership', JSON.stringify({ Alex: 12 }))
        }
    }, [])

    const sortedLeaders = Object.entries(leadership)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 10)

    return (
        <div className='Leadership'>
            <Link className='ButtonMenu' to='/'>
                Вернуться в меню
            </Link>
            <h2>Leadership</h2>

            {sortedLeaders.map(([name, score]) => (
                <div key={name} className='Leadership__user'>
                    <div>{name}</div>
                    <div>{score}</div>
                </div>
            ))}
        </div>
    )
}

export { Leadership }
