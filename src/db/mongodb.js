const MongoClient = require('mongodb').MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'flickzee'
let mongodb

MongoClient.connect(connectionURL,{useNewUrlParser: true,useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log(error)
    }

    mongodb = client.db(databaseName)

    
    
})

function get(){
    return mongodb
}

module.exports = get