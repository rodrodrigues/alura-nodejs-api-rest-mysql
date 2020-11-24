const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')

//conexão do banco de dados
conexao.connect((erro)=>{
    if(erro){
        console.log(erro)
    }else{
        console.log('db works')
        Tabelas.init(conexao)
        //recebe App com nova configuração
        const app = customExpress()

        //Indica onde o servidor vai escutar as requests
        app.listen(3000, () => console.log('server running'))
    }
})



