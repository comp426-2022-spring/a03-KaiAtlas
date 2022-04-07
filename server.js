const express = require('express')
const app = express()

var port = 5000  //change this later

const server =  app.listen(port,() =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.use(function(req,res ){
    res.status(404).send('Endpoint does not exist')
    res.type("text/plain")
})