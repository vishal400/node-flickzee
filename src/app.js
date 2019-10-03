const express = require('express')
const path = require('path')
const db = require('./db/mongodb')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const port = process.env.PORT || 3000


app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.send('index')
})

app.get('/auto', (req, res) => {
    
    db().collection('movies').find({'Alt Text': {$regex: new RegExp(req.query.find)}}).project({ score: { $meta: "textScore" } }).sort({score:{$meta:"textScore"}}).limit(10).toArray((error, result) => {
            if(error){
                return res.send(error)
            }
    
            res.send(result)
        })
})

app.get('/search', (req, res) => {
    db().collection('movies').find({$text: {$search: req.query.find}}).project({ score: { $meta: "textScore" } }).sort({score:{$meta:"textScore"}}).limit(10).toArray((error, result) => {
            if(error){
                return res.send(error)
            }
    
            res.send(result)
        })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})