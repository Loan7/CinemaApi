const Cinema = require("../model/cinemas")
const Cinemas_DAO = require('../DAO/cinemasDAO')
const bdNovo = require('../infra/sqlite-db'); 

 module.exports = (app) => {

  const cinemas_Dao = new Cinemas_DAO(bdNovo);
    app.get('/cinemas', async (req, res) => {
      
        try {
          const resplocal = await cinemas_Dao.select_cinemas();
          res.status(200).json(resplocal)
      } catch (error) {
          res.status(404).json({ error })
      }
      
     
    })
    app.get('/cinemas/:id', async (req, res) => {
      
      try {
        const id = req.params.id
        console.log(id)
        const respLocal = await cinemas_Dao.select_cinemas_id(id);
        res.status(200).json(respLocal)
    } catch (error) {
        res.status(404).json({ error })
    }
    
   
  })
  app.post('/cinemas', async (req, res) => {
    const body = req.body
    try {

        const novoCinema = new Cinemas(body.NOME, body.ENDERECO, body.NUMERO, body.BAIRRO, body.CIDADE, body.ESTADO, body.UF)
        const respNovoCinema = await cinemas_Dao.insert_cinemas(novoCinema);
        res.status(200).json(respNovoCinema)
    } catch (error) {
        res.status(404).json({ error })
    }

})
app.put('/cinemas/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {

    const respCinemas = await cinemas_Dao.select_cinemas_id(id);
      const confirmaId = new ConfirmaID(respCinemas.cinemas.length)
      if (confirmaId.id === -1) {
        res.send("Local não encontrado")
      } else {
      const novoCinema = new Cinema(body.NOME, body.ENDERECO, body.NUMERO, body.BAIRRO, body.CIDADE, body.ESTADO, body.UF)
      const respNovoCinema = await cinemas_Dao.update_cinemas(id, novoCinema);
      res.status(200).json(respNovoCinema)
      }
  } catch (error) {
      res.status(404).json({ error })
  }

})
app.delete('/excluir/:id', async (req, res) => {
  const id = req.params.id
  try {
    const respCinemas = await cinemas_Dao.select_cinemas_id(id);
    const confirmaId = new ConfirmaID(respCinemas.cinemas.length)
    if (confirmaId.id === -1) {
      res.send("Local não encontrado")
    } else {
      const respNovoCinema = await cinemas_Dao.delete_cinemas(id);
      res.status(200).json(respNovoCinema)
    }
  } catch (error) {
      res.status(404).json({ error })
  }

})

  }