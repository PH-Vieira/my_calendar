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

export function getContent() {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        return {
            message: 'Success',
            data: data['conteudo']
        };
    } catch (error) {
        return {
            message: `Erro: ${error}`
        };
    }
}
