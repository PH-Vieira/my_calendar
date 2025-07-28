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

        if (!Object.keys(data['conteudo']).includes(args[0])) {
            data['conteudo'][args[0]] = {};
            data['conteudo'][args[0]][args[1]] = [{
                "titulo": args[2],
                "conteudo": args[3]
            }];
        } else if (!Object.keys(data['conteudo'][args[0]]).includes(args[1])) {
            data['conteudo'][args[0]][args[1]] = [{
                "titulo": args[2],
                "conteudo": args[3]
            }];
        } else {
            const exists = data['conteudo'][args[0]][args[1]].some(el => el['titulo'] === args[2]);
            if (exists) {
                return { message: 'Já existe conteúdo com esse título' };
            } else {
                data['conteudo'][args[0]][args[1]].push({
                    "titulo": args[2],
                    "conteudo": args[3]
                });
            }
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

export function getContent(_class = null) {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        return {
            message: 'Success',
            data: data['conteudo'][_class[1]][_class[0]]
        };
    } catch (error) {
        return {
            message: `Erro: ${error}`
        };
    }
}
