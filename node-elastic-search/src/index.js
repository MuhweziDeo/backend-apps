const app = require('express')();
const createData = require('./data');

const client = require('./elasttic-search');

// creates query data
createData();
app.get('/', (req, res) => res.send({message: "hello"}));

app.get('/search', (req, res) => {
 // declare the query object to search elastic search and return only 200 results from the first result found.
  // also match any data where the name is like the query string sent in
  let body = {
    size: 200,
    from: 0,
    query: {
      match: {
          name: req.query['q'] || ''
      }
    }
  }
  // perform the actual search passing in the index, the search query and the type
  client.search({index:'scotch.io-tutorial',  body:body, type:'cities_list'})
  .then(results => {
    res.send(results.hits.hits);
  })
  .catch(err=>{
    console.log(err)
    res.send([]);
  });

});

app.listen(process.env.PORT || 3000, () => console.log('server running'))