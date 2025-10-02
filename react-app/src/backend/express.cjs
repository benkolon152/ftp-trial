//import {Client} from 'basic-ftp';

const express = require('express')
const {Client} = require('basic-ftp')
const app = express()

app.get('/', (req, res)=> res.sendStatus(200))

app.get('/ftp-list', async (req, res)=>{
    let statusCode = 200
    const responsebody = {
        data: [],
        error: null
    }
    try{
        const ftpClient = new Client()
        await ftpClient.access({
            host: '172.20.10.3',
            port: 21,
            user:'tester',
            password: 'password'
        })

            await ftpClient.cd('/')
            const fileList = await ftpClient.list()
            ftpClient.close()
            responsebody.data = fileList
    }catch(e){
        statusCode = 404
        responsebody.error = e
    }
    res.sendStatus(statusCode).json(responsebody)

})

app.get('/ftp-file-constent', async (req, res)=>{
    let statusCode = 200
    const responsebody = {
        data: null,
        error: null
    }
    try{
        const {fileName} = req.body

        const ftpClient = new Client()
        await ftpClient.access({
            host: '172.20.10.3',
            port: 21,
            user:'tester',
            password: 'password'
        })

            await ftpClient.cd('/')

            const chunks = []
            await ftpClient.downloadTo(
                new require('stream').Writeable({
                    write(chunk, _, callback){
                        chunks.push.push(chunk)
                        callback()
                    }
                }), fileName
            )
            console.log

            const fileList = await ftpClient.list()
            ftpClient.close()
            responsebody.data = fileList
    }catch(e){
        statusCode = 404
        responsebody.error = e
    }
    res.sendStatus(statusCode).json(responsebody)
})


const port = 3333
app.listen(port, ()=> console.log('Backend server starts on port ', port))