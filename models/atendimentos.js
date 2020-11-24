const moment = require('moment')
const conexao = require('./../infra/conexao')

class Atendimento {

    adiciona(atendimento, res){
        
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao) 
        const clienteValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: "data",
                valido: dataValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: "cliente",
                valido: clienteValido,
                mensagem: "Cliente deve ter pelo menos 5 caracteres"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data} 
        
            const sql = "INSERT INTO atendimentos SET ?"

            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    res.status(400).json(erro)  
                } else {
                    res.status(201).json({
                        status:1,
                        insertId: resultado.insertId
                    })
                }
            })
        }
    }

    lista(res){

        const sql = "SELECT * FROM atendimentos"

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(200).json(erro)
            }else{
                res.status(200).json(resultado)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){

        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = "UPDATE atendimentos SET ? WHERE id=?"

        conexao.query(sql,[valores, id], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({
                    message:`Id #${id} alterado com sucesso.`
                })
            }
        })
    }

    deleta(id, res){
        const sql = `DELETE FROM atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultado)=>{
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({
                    message:`Id #${id} deletado com sucesso.`
                })
            }

        })
    }
}

module.exports = new Atendimento