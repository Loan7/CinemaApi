class Cinemas{

    constructor(nome, endereco, numero, bairro, cidade, estado, uf){
        this.nome = this.verificaNome(nome)
        this.endereco = this.verficaEndereco(endereco)
        this.numero = this.verificaNumero(numero)
        this.bairro = this.verificaBairro(bairro)
        this.cidade = this.verificaCidade(cidade)
        this.estado = this.verificaEstado(estado)
        this.uf = this.verificaUf(uf)
    }
}
module.exports = Cinemas