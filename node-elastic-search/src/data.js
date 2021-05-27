const client = require('./elasttic-search');
const fetch = require('node-fetch');

const createData = () => {
    fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json')
    .then(res => res.json())
    .then(cities => {
        console.log(cities);
        // declare an empty array called bulk
    const bulk = [];
    //loop through each city and create and push two objects into the array in each loop
    //first object sends the index and type you will be saving the data as
    //second object is the data you want to index
    cities.forEach(city =>{
    bulk.push({index:{
                    _index:"scotch.io-tutorial",
                    _type:"cities_list",
                }
            })
    bulk.push(city)
    });
    //perform bulk indexing of the data passed
    client.bulk({body:bulk}, function( err, response  ){
            if( err ){
                console.log("Failed Bulk operation".red, err)
            } else {
                console.log("Successfully imported %s".green, cities.length);
            }
    });
    });
}

module.exports = createData;