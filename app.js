const http = require('http')
const url = require('url')

let tasks = []

const server = http.createServer((req,res)=>{

    let newurl = url.parse(req.url).path
    console.log(newurl)
    
    if(newurl.startsWith('/tasks') && req.method==='GET'){
        let id = newurl.split('/')[2]
        if(id!==undefined){
            res.writeHead(200,{'Content-Type':'application/json'})
        res.write(JSON.stringify(tasks[id-1]))
        }
        else{
        res.writeHead(200,{'Content-Type':'application/json'})
        res.write(JSON.stringify(tasks))
    }
        res.end()
    }
    else if(req.url === '/tasks' && req.method === 'POST'){
        let data = ''
        req.on('data',(chunk)=>{
            data += chunk
        })
        req.on('end',()=>{
            dataObj = JSON.parse(data)
            console.log('data',typeof(data))
            let tempObj = {
                name: dataObj.name,
            }
            tasks.push(tempObj)
            console.log('tasks',tasks)
            res.writeHead(200,{'Content-Type':'application/json'})
            res.write(JSON.stringify(dataObj))
            res.end()
        })
    }
    else if(req.url === '/tasks' && req.method === 'PUT'){
        res.write('put')
    }
    else if(req.url === '/tasks' && req.method === 'PATCH'){
        res.write('patch')
    }
    else if(req.url === '/tasks' && req.method=== 'DELETE'){
        tasks.length=0
        res.writeHead(200,{'Content-Type':'application/json'})
        res.write(JSON.stringify(tasks))
        res.end()
    }
    else{
        res.end('Different URL')
    }
})

server.listen(5001,()=>{
    console.log('listening at port 5001')
})