import './Cell.css'

function Cell({
    cellData,
    isOpen,
    coords,
    checkCell,
    setFlagOnCell,
    flag,
    checkWinner,
    canClick,
    cellWidth,
}) {
    const cellCoords = coords

    const clickOnCell = () => {
        if (canClick) {
            checkCell(cellData, cellCoords)
            checkWinner()
        }
    }

    const rightClick = (event) => {
        if (canClick) {
            event.preventDefault()
            setFlagOnCell(cellCoords)
            checkWinner()
        }
    }

    const colors = {
        1: '#1a17cf',
        2: '#18ba18',
        3: '#cf1d1d',
        4: '#1c066b',
        5: '#591b1c',
        6: '#18f0ec',
        7: '#000000',
        8: '#ffffff',
    }

    const flags = {
        0: '',
        1: '🚩',
        2: '❓',
    }
    const currentFlag = flags[flag]

    return (
        <div
            className='Cell'
            onClick={clickOnCell}
            onContextMenu={rightClick}
            style={{
                color: colors[cellData],
                backgroundColor: cellData >= 0 && isOpen ? 'white' : '',
                width: cellWidth,
                height: cellWidth,
            }}
        >
            {isOpen
                ? (cellData === -1 ? '💣' : cellData) || (cellData === 0 ? '' : cellData)
                : currentFlag}
        </div>
    )
}

export default Cell
