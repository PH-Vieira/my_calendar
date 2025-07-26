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

export function addClassroom(sala) {
    try {
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))

        if (!data['salas'].includes(sala)) {
            data['salas'].push(sala)
            fs.writeFileSync('db.json', JSON.stringify(data, null, 4))
        } else {
            throw new Error("Ja existe essa sala");
        }

        return {
            message: 'Success'
        }
    } catch (error) {
        return {
            message: error
        }
    }
}

export function addContent(args) {
    try {
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))

        if (!Object.values(data['conteudo']).includes(args[0])) {
            data['conteudo'][args[0]] = {}
            data['conteudo'][args[0]][args[1]] = []
            data['conteudo'][args[0]][args[1]].push({
                "titulo": args[2],
                "conteudo": args[3]
            })
            fs.writeFileSync('db.json', JSON.stringify(data, null, 4))
        } else if (!Object.values(data['conteudo'][args[0]]).includes(args[1])) {
            data['conteudo'][args[0]][args[1]] = []
            data['conteudo'][args[0]][args[1]].push({
                "titulo": args[2],
                "conteudo": args[3]
            })
            fs.writeFileSync('db.json', JSON.stringify(data, null, 4))
        } else {
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
            message: error
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
            message: error
        }
    }
}

export function getContent(_class = null) {
    try {
        // console.log(`Im controller receiving ${_class[0]} e ${_class[1]}`)
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))
        return {
            message: 'Success',
            data: data['conteudo'][_class[1]][_class[0]]
        }
    } catch (error) {
        return {
            message: error
        }
    }
}