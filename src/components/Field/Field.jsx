import './Field.css'
import Cell from '../Cell'
import { useState, useEffect } from 'react'
import { generateField } from '../../game'
import Counter from '../Counter'
import { Link } from 'react-router-dom'
import { fakeLeadership } from '../../game'

function Field({ rows, cols, bombs, hardlevel }) {
    const [gamefield, setGameField] = useState(generateField(rows, cols, bombs))
    const [activeFlags, updateActiveFlags] = useState(0)
    const [seconds, updateSeconds] = useState(0)
    const [canClick, updateCanClick] = useState(true)
    const [timerId, setTimerId] = useState(null)
    const [smile, setSmile] = useState('😀')
    const [cellWidth, setCellWidth] = useState(50)
    const [leftClickFlag, toggleLeftClickFlag] = useState(false)

    useEffect(() => {
        const windowWidth = +window.innerWidth

        switch (hardlevel) {
            case 1:
                if (windowWidth <= 530) {
                    setCellWidth(40)
                }
                break
            case 2:
                if (windowWidth <= 530) {
                    setCellWidth(20)
                } else {
                    setCellWidth(25)
                }

                break
            case 3:
                if (windowWidth <= 1200) {
                    setCellWidth(15)
                } else {
                    setCellWidth(20)
                }
                break
            default:
                alert('Error! hardlevel не valid')
        }
        return () => {}
    }, [hardlevel])
    useEffect(() => {
        let timer = setInterval(() => {
            updateSeconds((prevState) => prevState + 1)
        }, 1000)
        setTimerId(timer)
        return () => clearInterval(timer)
    }, [])

    const gameFieldRender = []

    const clickOnBomb = () => {
        const copyGamefield = [...gamefield]
        copyGamefield.forEach((row) => {
            row.forEach((elem) => {
                if (elem.data === -1) {
                    elem.isOpen = true
                }
            })
        })
        setGameField(copyGamefield)
        setSmile('🥲')
        updateCanClick(false)
        clearInterval(timerId)
    }

    const checkWinner = () => {
        let count = 0
        gamefield.forEach((row) => {
            row.forEach((elem) => {
                if (elem.flag === 1 && elem.data === -1) {
                    count++
                }
            })
        })
        if (count === bombs) {
            let leadership = localStorage.getItem('leadership')
            if (leadership) {
                leadership = JSON.parse(leadership)
            } else {
                leadership = fakeLeadership
            }
            let userName = localStorage.getItem('userName')
            leadership[userName] = seconds
            localStorage.setItem('leadership', JSON.stringify(leadership))

            updateCanClick(false)
            clearInterval(timerId)
            setSmile('❤️')
        } else {
            return false
        }
    }

    const resetGame = () => {
        const newGameField = generateField(rows, cols, bombs)
        setGameField(newGameField)
        updateActiveFlags(0)
        updateCanClick(true)
        updateSeconds(0)
        clearInterval(timerId)
        const timer = setInterval(() => {
            updateSeconds((prevState) => prevState + 1)
        }, 1000)
        setTimerId(timer)
        setSmile('😀')
    }

    const flagsCounter = () => {
        let count = 0
        gamefield.forEach((row) => {
            row.forEach((elem) => {
                if (elem.flag === 1) {
                    count++
                }
            })
        })
        updateActiveFlags(count)
    }

    const setFlagOnCell = (cellCoords) => {
        const i = cellCoords[0]
        const j = cellCoords[1]
        const copyGamefield = [...gamefield]

        if (!copyGamefield[i][j].isOpen) {
            if (copyGamefield[i][j].flag === 2) {
                copyGamefield[i][j].flag = 0
            } else {
                copyGamefield[i][j].flag++
            }

            setGameField(copyGamefield)
        }
        flagsCounter()
    }

    const checkCell = (data, cellCoords) => {
        const i = cellCoords[0]
        const j = cellCoords[1]

        // Если нажали на мину
        if (gamefield[i][j].data === -1) {
            clickOnBomb()
            return
        }
        if (
            i < 0 ||
            j < 0 ||
            i >= rows ||
            j >= cols ||
            gamefield[i][j].isOpen ||
            gamefield[i][j].data === -1
        ) {
            return
        }
        const copyGamefield = [...gamefield]
        copyGamefield[i][j].isOpen = true
        setGameField(copyGamefield)
        if (data === 0 || gamefield[i][j].data === 0) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const newRow = i + dx
                    const newCol = j + dy

                    if (
                        newRow >= 0 &&
                        newRow < rows &&
                        newCol >= 0 &&
                        newCol < cols &&
                        !(dx === 0 && dy === 0) &&
                        gamefield[newRow][newCol].data !== -1
                    ) {
                        checkCell(gamefield[newRow][newCol].data, [newRow, newCol])
                    }
                }
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            row.push(
                <Cell
                    cellData={gamefield[i][j].data}
                    isOpen={gamefield[i][j].isOpen}
                    coords={[i, j]}
                    key={i + '' + j}
                    checkCell={checkCell}
                    setFlagOnCell={setFlagOnCell}
                    flag={gamefield[i][j].flag}
                    checkWinner={checkWinner}
                    canClick={canClick}
                    cellWidth={cellWidth}
                    leftClickFlag={leftClickFlag}
                />,
            )
        }
        gameFieldRender.push(row)
    }

    return (
        <>
            <div className='gameBar'>
                <Counter bombs={bombs} activeFlags={activeFlags} />
                <button onClick={() => resetGame()}>{smile}</button>
                <div>⌛ {seconds}</div>
            </div>
            <button
                className='changeRightClick'
                onClick={() => toggleLeftClickFlag((prevState) => !prevState)}
            >
                {leftClickFlag ? '🚩' : '☝'}
            </button>
            <div className='Field'>
                {gameFieldRender.map((row, i) => (
                    <div className='Field__row' key={i}>
                        {row}
                    </div>
                ))}
            </div>
            <Link className='exitButton' to='/'>
                Выйти в меню
            </Link>
        </>
    )
}

export default Field
