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

export function addClassroom(args) {
    try {
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))

        if (!data['salas'].includes(args[0])) { data['salas'].push(args[0]) }

        Object.keys(args[1]).forEach(key => {
            if (args[1][key] == true && !data['salasPorDiaDaSemana'][key].includes(args[0])) {
                data['salasPorDiaDaSemana'][key].push(args[0])
            }
        })

        fs.writeFileSync('db.json', JSON.stringify(data, null, 4))

        return {
            message: 'Success'
        }
    } catch (error) {
        return {
            message: `Erro: ${error}`
        }
    }
}

export function addContent(args) {
    try {
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))

        console.log(`\n${JSON.stringify(Object.values(data['conteudo']))}\n`)
        console.log(`\n${args}\n`)

        if (!Object.keys(data['conteudo']).includes(args[0])) {
            console.log('entrou no if')
            data['conteudo'][args[0]] = {}
            data['conteudo'][args[0]][args[1]] = []
            data['conteudo'][args[0]][args[1]].push({
                "titulo": args[2],
                "conteudo": args[3]
            })
            fs.writeFileSync('db.json', JSON.stringify(data, null, 4))
        } else if (!Object.values(data['conteudo'][args[0]]).includes(args[1])) {
            console.log('entrou no else if')
            data['conteudo'][args[0]][args[1]] = []
            data['conteudo'][args[0]][args[1]].push({
                "titulo": args[2],
                "conteudo": args[3]
            })
            fs.writeFileSync('db.json', JSON.stringify(data, null, 4))
        } else {
            console.log('entrou no else')
            data['conteudo'][args[0]][args[1]].forEach(el => {
                if (el['titulo'] == args[2]) {
                    return { message: 'Já existe conteúdo com esse título' }
                } else {
                    data['conteudo'][args[0]][args[1]].push({
                        "titulo": args[2],
                        "conteudo": args[3]
                    })
                    fs.writeFileSync('db.json', JSON.stringify(data, null, 4))
                }
            })
        }

        return {
            data: args,
            message: 'Success'
        }
    } catch (error) {
        return {
            message: `Erro: ${error}`
        }
    }
}

export function getClass(diaDaSemana = null) {
    try {
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))
        
        return {
            message: 'Success',
            data: data['salasPorDiaDaSemana'][diaDaSemana]
        }
    } catch (error) {
        return {
            message: `Erro: ${error}`
        }
    }
}

export function getContent(_class = null) {
    try {
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))
        return {
            message: 'Success',
            data: data['conteudo'][_class[1]][_class[0]]
        }
    } catch (error) {
        return {
            message: `Erro: ${error}`
        }
    }
}