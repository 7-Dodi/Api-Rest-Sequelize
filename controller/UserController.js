const Usuario = require('../model/Usuario');
const Client = require('../database/redis');

module.exports.listarUsuarios = async function (req, res) {
    const usuarios = await Usuario.findAll();
    res.status(200).send(usuarios);
};
  
module.exports.adicionarUsuario = async function (req, res){
    const usuario = Usuario.build(req.body);
    try{
      await usuario.save();
      res.status(201).send('Salvo');
    }catch{
      res.status(400).send('Falha ao salvar');
    }
  };
  
module.exports.buscarUsuarios = async function(req, res){
    console.time(); //Verificando o tempo de busca dessa informação
    const cachedData = await Client.get(`user-${req.params.email}`);
    console.timeEnd();

    if(cachedData){ //Caso seja encontrado os dados
      console.log("Data retrieved from cache memory");
      res.status(200).send(JSON.parse(cachedData)); //Retorna os dados encontrados
    }else{
      //Caso não encontre, procura no Banco de Dados
      const user = await Usuario.findByPk(req.params.email); //Email é o Primary Key
      
      if(user){
        res.status(200).send(user); //Retorna os dados
        Client.setEx(`user-${req.params.email}`, 300, JSON.stringify(user)); //Usando o método setEx para settar a key em perído de 3min
        console.log("Data retrieved from the database and stored in cache memory");
      }else{
        res.status(404).send('Usuário não encontrado');
      }
    }
  };
  
module.exports.deleteUsuarios = async function(req, res){
    try{
      const deletados = await Usuario.destroy({
        where: { email : req.params.email } });
  
      if(deletados > 0){
        res.status(200).send('Usuário removido');
      }else{
        res.status(404).send('Usuário não encontrado');
      }
    }catch(err){
      res.status(400).send('Falha ao deletar');
    }
  };
  
module.exports.atualizarUsuarios = async function (req, res){
    try{
      const atualizado = await Usuario.update(
        req.body, {where: { email: req.params.email }});
      
      if(atualizado > 0){
        res.status(200).send('Usuário atualizado');
      }else{
        res.status(404).send('Usuário não encontrado'); 
      }
    }catch(err){
      res.status(400).send('Falha ao atualizar');
    }
  };