import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import { Main } from '../../pages/Main'
import { Game } from '../../pages/Game'
import { Leadership } from '../../pages/Leadership'
import { Notfoundpage } from '../../pages/Notfoundpage'

function App() {
    const [hardlevel, updateHardLevel] = useState(1)
    const [rows, updateRows] = useState(8)
    const [cols, updateCols] = useState(8)
    const [bombs, updateBombs] = useState(10)

    const setHardLevel = (level) => {
        updateHardLevel(level)

        if (level === 1) {
            updateRows(8)
            updateCols(8)
            updateBombs(10)
        }
        if (level === 2) {
            updateRows(16)
            updateCols(16)
            updateBombs(40)
        }
        if (level === 3) {
            updateRows(16)
            updateCols(32)
            updateBombs(100)
        }
    }

    return (
        <>
            <div className='App'>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Main setHardLevel={setHardLevel} hardlevel={hardlevel} />
                        }
                    />
                    <Route
                        path='/game'
                        element={
                            <Game
                                rows={rows}
                                cols={cols}
                                bombs={bombs}
                                hardlevel={hardlevel}
                            />
                        }
                    />
                    <Route path='/leadership' element={<Leadership />} />
                    <Route path='*' element={<Notfoundpage />} />
                </Routes>
            </div>
        </>
    )
}

export default App
