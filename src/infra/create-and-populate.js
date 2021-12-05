/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const caminhoArq = path.resolve(__dirname,'database.db')
const db = new sqlite3.Database(caminhoArq);

//==== Usuários
const CINEMAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CINEMAS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(50),
    "ENDERECO" varchar(50),
    "NUMERO" Varchar(50),
    "BAIRRO" Varchar(50),
    "CIDADE" Varchar(50),
    "ESTADO" Varchar(50),
    "UF" Char(2),
  );`;

const ADD_CINEMAS_DATA = `
INSERT INTO CINEMAS (ID, NOME, ENDERECO, NUMERO, BAIRRO, CIDADE, ESTADO, UF)
VALUES 
    (1, 'SHOPPING NOVA IGUACU', 'Av. Abílio Augusto Távora', ' 1.111', 'Bairro da Luz', 'NOVA IGUACU', 'Rio de Janeiro', 'RJ'),
    (2, 'MADUREIRA SHOPPING', 'Estrada do Portela', '222', 'Madureira', 'Madureira', 'Rio de Janeiro', 'RJ'),
   
`

function criaTabelaCinemas() {
    db.run(CINEMAS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de Cinemas");
    });
}


function populaTabelaCinemas() {
    db.run(ADD_CINEMAS_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de Cinemas");
    });
}


db.serialize( ()=> {
    criaTabelaCinemas();
    populaTabelaCinemas();
   
});