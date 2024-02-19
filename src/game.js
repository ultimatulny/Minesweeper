const generateField = (rows, cols, bombs) => {
    // Создаем пустое поле
    const field = []
    for (let i = 0; i < rows; i++) {
        field[i] = []
        for (let j = 0; j < cols; j++) {
            field[i][j] = { data: 0, isOpen: false, flag: 0 }
        }
    }

    // Расставляем бомбы случайным образом
    let bombsCount = 0
    while (bombsCount < bombs) {
        const row = Math.floor(Math.random() * rows)
        const col = Math.floor(Math.random() * cols)
        if (field[row][col].data !== -1) {
            field[row][col].data = -1
            bombsCount++
        }
    }

    // Вычисляем количество бомб вокруг каждой клетки
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (field[i][j].data === -1) continue
            let count = 0
            // Проверяем все соседние клетки
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const newRow = i + dx
                    const newCol = j + dy
                    if (
                        newRow >= 0 &&
                        newRow < rows &&
                        newCol >= 0 &&
                        newCol < cols &&
                        field[newRow][newCol].data === -1
                    ) {
                        count++
                    }
                }
            }
            field[i][j].data = count
        }
    }

    return field
}

export { generateField }
