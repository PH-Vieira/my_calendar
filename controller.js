import fs from 'fs'

// export function writeDb(data) {
//     try {
//         fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf8')
//         return {
//             message: 'Success'
//         }
//     } catch (error) {
//         return {
//             message: 'Error'
//         }
//     }
// }

export function getClass(diaDaSemana = null) {
    try {
        const data = fs.readFileSync('db.json', 'utf8')
        return {
            message: 'Success',
            data: JSON.parse(data)['salasPorDiaDaSemana'][diaDaSemana]
        }
    } catch (error) {
        return {
            message: 'Error'
        }
    }
}

export function getContent(_class = null) {
    try {
        // console.log(`Im controller receiving ${_class[0]} e ${_class[1]}`)
        const data = fs.readFileSync('db.json', 'utf8')
        return {
            message: 'Success',
            data: JSON.parse(data)['conteudo'][_class[1]][_class[0]]
        }
    } catch (error) {
        return {
            message: 'Error'
        }
    }
}