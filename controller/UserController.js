const Usuario = require('../model/Usuario');

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
  
module.exports.buscarUsuarios = async function(req, res){ //Deu erro
    const user = await Usuario.findByPk(req.params.email); //Email é o Primary Key
  
    if(user){
      res.status(200).send(user);
    }else{
      res.status(404).send('Usuário não encontrado');
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