import { Link } from 'react-router-dom'
import { useState } from 'react'

function Main({ setHardLevel, hardlevel }) {
    const [value, setValue] = useState(`${hardlevel}`)
    const [name, setName] = useState('')
    const [nameStyle, setNameStyle] = useState({})
    function changeValue(event) {
        setValue(event.target.value)
        setHardLevel(+event.target.value)
    }

    const saveName = (name) => {
        setName(name)
    }

    const checkName = (event) => {
        if (name.trim() === '') {
            setNameStyle({ outline: '2px solid red', border: '1px solid red' })
            event.preventDefault()
        } else {
            localStorage.setItem('userName', name)
        }
    }

    return (
        <div className='MainMenu'>
            <h1>💣Minesweeper💣</h1>
            <div className='prod_checbox'>
                <div className='radio-toolbar'>
                    <input
                        id='radio1'
                        type='radio'
                        name='radio'
                        value='1'
                        checked={value === '1' ? true : false}
                        onChange={changeValue}
                    />
                    <label htmlFor='radio1'>Простой 8x8, 10 мин</label>

                    <input
                        id='radio2'
                        type='radio'
                        name='radio'
                        value='2'
                        checked={value === '2' ? true : false}
                        onChange={changeValue}
                    />
                    <label htmlFor='radio2'>Средний 16x16, 40 мин</label>

                    <input
                        id='radio3'
                        type='radio'
                        name='radio'
                        value='3'
                        checked={value === '3' ? true : false}
                        onChange={changeValue}
                    />
                    <label htmlFor='radio3'>Сложный 32x16, 100 мин</label>
                </div>
            </div>
            <input
                type='text'
                placeholder='Ваше имя'
                className='nameInput'
                onChange={(e) => saveName(e.target.value)}
                value={name}
                style={nameStyle} // Применяем стиль к полю ввода в зависимости от nameStyle
            />
            <Link className='ButtonMenu' to='/game' onClick={checkName}>
                Новая игра
            </Link>
            <Link className='ButtonMenu' to='/leadership'>
                Рейтинг
            </Link>
        </div>
    )
}

export { Main }
