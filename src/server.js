import express from 'express';
import bodyParser from 'body-parser';
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    
    // Pass to next layer of middleware
    next();
  });

// app.get('/api/getCountries/:name', (req, res) => {
//     const country_name = req.params.name;
//     const countryInfo = null;

//     fetch(`https://restcountries.eu/rest/v2/name/${country_name}?fullText=true`)
//     .then(response => response.json())
//     .then(data => {
//       res.status(200).send(data);
//     })
//     .catch(err => res.status(400).send(err))
// });

//Question 1 and 2
app.get('/api/getCountries/:name/:full_text_flag', (req, res) => {

    const full_text = req.params.full_text_flag;
    const country_name = req.params.name;

    
    fetch(`https://restcountries.eu/rest/v2/name/${country_name}`+ (full_text === 'true' ? `?fullText=true` : ``))
    .then(response => response.json())
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(err))
});

//Question 3
app.get('/api/getAllCountries/', (req, res) => {

  fetch(`https://restcountries.eu/rest/v2/all`)
  .then(response => response.json())
  .then(data => {
      res.status(200).send(data);
  })
  .catch(err => res.status(400).send(err))

});

app.listen(8000, () => console.log('Listening on port 8000'));