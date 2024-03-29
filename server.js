const express = require('express')
const app = express()

app.use(express.json())

const args = require("minimist")(process.argv.slice(2))
args["port"]
const port = args.port || 5000

const server =  app.listen(port,() =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})


app.get('/app/', (req, res) =>{
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

function coinFlip() {
    let flip = Math.random();
    let result = '';
    if (flip<0.5){
      result = 'heads'
    }
    else{
      result = 'tails'
    }
    return result;
}

app.get('/app/flip/', (req, res) =>{
    res.status(200).json({'flip':coinFlip()})
})

function FlipsNew(flips) {
    const array = [];
    for (let i = 0; i<flips; i++){
      array[i] = coinFlip();
    }
    let Hnum = 0;
    let Tnum = 0;
    for (let i = 0; i<array.length; i++){
      if (array[i].localeCompare('heads') == 0){
        Hnum ++;
      }
      else{
        Tnum ++;
      }
    }
    return {"raw":array, "summary":{tails:Tnum,heads: Hnum}};
}

app.get('/app/flips/:number', (req, res)=>{
    res.status(200).json(FlipsNew(req.params.number))
})

function flipACoin(call) {
    let result = '';
    let oneFlip = coinFlip();
    if (oneFlip.localeCompare(call) == 0){
      result = 'win';
    }
    else{
      result = 'lose';
    }
    return {call:call, flip: oneFlip, result: result};
}

app.get('/app/flip/call/:guess', (req, res) =>{
    res.status(200).json(flipACoin(req.params.guess))
})


app.use(function(req,res ){
    res.status(404).send('404 Not found')
    res.type("text/plain")
})

