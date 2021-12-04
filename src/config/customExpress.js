// Chamo express declarando ele como uma constante cujo o valor é a própria requisição.
const express = require("express");
// Chamo o gerenciador de módulos consign declarando ele como uma constante cujo o valor é a própria requisição.
const consign = require("consign");
// Exporto a configuração do express como módulo para ser usado em arquivo separado deste, atribuindo como valor a ele uma callback que executa a própria configuração.
const cors = require("cors");

module.exports = () => {
    
    const app = express();
    app.use(cors())
    app.use(express.json());
    
    consign() // chamo o gerenciador.
        .include('/src/controllers') // informo o que eu quero que o gerenciador inclua.
        .into(app) // informo onde eu quero que o gerenciador inclua.

    return app
}