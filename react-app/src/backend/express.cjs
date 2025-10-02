//import {Client} from 'basic-ftp';

const express = require('express')
const {Client} = require('basic-ftp')
const app = express()

app.get('/', (req, res)=> res.sendStatus(200))

app.get('/ftp-list', (req, res)=>{
    const ftpClient = new Client()
    ftpClient.access({
        host: '172.20.10.3',
        port:21,
        user:'tester',
        password: 'password'
    })
    .then(console.log)
    .chatch(console.warn)
    .finally(()=>res.sendStatus(200))
})


const port = 3333
app.listen(port, ()=> console.log('Backend server starts on port ', port))