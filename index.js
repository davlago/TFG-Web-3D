const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(req,res){
    fs.readFile('./index.html', function(error, data){
        if(error){
            res.writeHead(404);
            res.write("Error: No file")
        }
        else{
            res.write(data)
            res.write("Load")
        }
    })
});

server.listen(port, function(error){
    if(error){
        console.log("Error ", error);
    }
    else{
        console.log("Correct", port);
    }

})