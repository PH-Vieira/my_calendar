import fs from 'fs';

let DB_PATH = 'db.json'; // Caminho padrão durante o desenvolvimento

export function setDbPath(path) {
    DB_PATH = path;
}

export function addClassroom(args) {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        if (!data['salas'].includes(args[0])) {
            data['salas'].push(args[0]);
        }

        Object.keys(args[1]).forEach(key => {
            if (args[1][key] === true && !data['salasPorDiaDaSemana'][key].includes(args[0])) {
                data['salasPorDiaDaSemana'][key].push(args[0]);
            }
        });

        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4));

        return {
            message: 'Success'
        };
    } catch (error) {
        return {
            message: `Erro: ${error}`
        };
    }
}

export function addContent(args) {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        if (!Object.keys(data['conteudo']).includes(args[1])) {
            data['conteudo'][args[1]] = {}
            data['conteudo'][args[1]][args[0]] = []
            data['conteudo'][args[1]][args[0]].push({
                "titulo": args[2],
                "conteudo": args[3]
            })
        } else if (!Object.keys(data['conteudo'][args[1]]).includes(args[0])) {
            data['conteudo'][args[1]][args[0]] = []
            data['conteudo'][args[1]][args[0]].push({
                "titulo": args[2],
                "conteudo": args[3]
            })
        } else {
            data['conteudo'][args[0]][args[1]].forEach(el => {
                if (el.titulo === args[2]) return { message: 'Já existe uma aula com esse título' }
            })
            data['conteudo'][args[0]][argg[1]].push({
                "titulo": args[2],
                "conteudo": args[3]
            })
        }

        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4));

        return {
            data: args,
            message: 'Success'
        };
    } catch (error) {
        return {
            message: `Erro: ${error}`
        };
    }
}

export function getClass(diaDaSemana = null) {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        return {
            message: 'Success',
            data: data['salasPorDiaDaSemana'][diaDaSemana]
        };
    } catch (error) {
        return {
            message: `Erro: ${error}`
        };
    }
}

/**
 * 
 * @param {Array} args [Dia selecionado, undefined]
 * @returns Retorna os conteudos de todas as salas no dia selecionado, se houver
 */
export function getContent(args) {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        let aux = {}

        let nenhuma_aula = true

        Object.values(data['salas']).forEach(sala => {
            // console.log(`\nProcurando conteudo para sala ${sala}\n`)

            if (data['conteudo'][sala]) {
                // console.log(`Essa sala tem conteudo\n`)

                aux[sala] = []

                Object.keys(data['conteudo'][sala]).forEach(dia_da_aula => {
                    // console.log(`Essa sala tem aula no dia ${dia_da_aula}`)
                    if (dia_da_aula == args[0]) {
                        nenhuma_aula = false
                        aux[sala].push(data['conteudo'][sala][dia_da_aula])
                    }
                })
            }
            // else { console.log(`Essa sala nao tem conteudo\n`) }
        })

        if (nenhuma_aula) {
            return {
                message: 'Nenhuma aula',
                data: []
            };
        } else {
            return {
                message: 'Success',
                data: aux
            };
        }
    } catch (error) {
        return {
            message: `Erro: ${error}`
        };
    }
}

export function getAllContent(args) {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))

        let aux = []

        Object.values(data['salas']).forEach(sala => {
            if(data['conteudo'][sala]) {
                Object.keys(data['conteudo'][sala]).forEach(dia => {
                    let obj = {}
                    obj[dia] = sala
                    aux.push(obj)
                })
            }
        })

        return {
            message: 'Success',
            data: aux
        }
    } catch (error) {
        return {
            message: `Erro: ${error}`
        };
    }
}