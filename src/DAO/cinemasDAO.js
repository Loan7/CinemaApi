class CinemasDAO {
    constructor(bdCinemas) {
        this._bdCinemas = bdCinemas

    }
    select_cinemas() {
        return new Promise((resolve, reject) => {
            this._bdCinemas.all('SELECT * FROM CINEMAS', (err, linhas) => {
                if (err) {
                    reject(({ "mensagem": err.message, "error": true }))
                } else {
                    resolve({
                        "cinemas": linhas,
                        "count": linhas.length,
                        "error": false
                    })
                }
            })
        })
    }
    select_cinemas_id(id) {
        return new Promise((resolve, reject) => {
            this._bdCinemas.all(`SELECT * FROM CINEMAS WHERE ID = ${id}`, (err, linhas) => {
                if (err) {
                    reject(({ "mensagem": err.message, "error": true }))
                } else {
                    resolve({
                        "cinemas": linhas,
                        "count": linhas.length,
                        "error": false
                    })
                }
            })
        })
    }
    insert_cinemas(novoCinema) {
        return new Promise((resolve, reject) => {
            this._bdCinemas.run(`
           INSERT INTO CINEMAS (NOME, ENDERECO, NUMERO, BAIRRO, CIDADE, ESTADO, UF)
            VALUES 
           (?, ?, ?, ?, ?, ?, ?)
            `, [novoCinema.nome, novoCinema.endereco, novoCinema.numero, novoCinema.bairro, novoCinema.cidade, novoCinema.estado, novoCinema.uf], (error) => {
                if (error) {
                    reject({
                        "cinema": error.message,
                        "erro": true
                    })
                } else {
                    resolve({
                        "cinema": novoCinema,
                        "erro": false
                    })
                }
            })
        })
    }
    update_cinemas(id, novoCinema) {
        return new Promise((resolve, reject) => {
            this._bdCinemas.run(`
            UPDATE CINEMAS SET (NOME, ENDERECO, NUMERO, BAIRRO, CIDADE, ESTADO, UF) = 
           (?, ?, ?, ?, ?, ?, ?)
           where ID = ${id}
            `, [novoCinema.nome, novoCinema.endereco, novoCinema.numero, novoCinema.bairro, novoCinema.cidade, novoCinema.estado, novoCinema.uf], (error) => {
                if (error) {
                    reject({
                        "cinema": error.message,
                        "erro": true
                    })
                } else {
                    resolve({
                        "cinema": novoCinema,
                        "erro": false
                    })
                }
            })
        })
    }
    delete_cinemas(id) {
        return new Promise((resolve, reject) => {
            this._bdCinemas.run(`
            DELETE FROM CINEMAS 
           where ID = ${id}
            `,  (error) => {
                if (error) {
                    reject({
                        "cinema": error.message,
                        "erro": true
                    })
                } else {
                    resolve({
                        "mensage": "item removido com sucesso",
                        "erro": false
                    })
                }
            })
        })
    }


}

module.exports = CinemasDAO