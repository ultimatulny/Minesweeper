import Field from '../components/Field'

function Game({ rows, cols, bombs, hardlevel }) {
    return <Field rows={rows} cols={cols} bombs={bombs} hardlevel={hardlevel} />
}

export { Game }
