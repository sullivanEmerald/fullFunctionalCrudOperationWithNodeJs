const { request, response } = require('express')
const express = require('express')
const app  = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 4000
require('dotenv').config()

// INSTALLING MONGODB AND CONNECTING TO DATABASE

let db,
    connectionString = process.env.DB_STRING,
    dbName = 'star-wars'

    MongoClient.connect(connectionString)
    .then(client => {
        console.log(`connect to ${dbName} Database`)
        db = client.db(dbName)

    })
    .catch(error => console.log(error))


// INITIALIZING MIDDLEWARES
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true }))
app.use(express.json())

// CONNECTING MY ROUTES
app.get('/', (request, response) => {
    db.collection('musicians').find().toArray()
    .then(data => {
        response.render('index.ejs', { info : data })
    })

})

app.post('/addMusician', (request, response) => {
    db.collection('musicians').insertOne({stageName : request.body.rapName, birthName: request.body.birthName, likes: 0})
        .then(request  => {
            console.log(`Musician Added`)
            response.redirect('/')
        })
        .catch(error => console.log(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('musicians').updateOne({stageName : request.body.stageNameS, birthName: request.body.birthNameS, likes : request.body.likesS},{

        $set: {
            likes : request.body.likesS + 1
        }
    })

    .then(result => {
        console.log(`Added one like`)
        response.json('success')
    })
    .catch(error => console.log(error))
})

app.delete('/deleteRapper', (request,response) => {
    db.collection('musicians').deleteOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS})
        .then(result => {
            console.log('Rapper Deleted')
            response.json('Rapper Deleted')
        })
        .catch(error => console.log(error))
})

// INITIALIZING LOCAL HOST SERVER
app.listen(PORT, () => {
    console.log(`listening to ${PORT} local server`)
})