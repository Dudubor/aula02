const http = require('http');

let usuarios = [];

const servidor = http.createServer((req, res) => {
    const rota = url.parse(req.url, true);
    
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST' && rota.pathname === '/usuarios') {
        let corpo = '';

        req.on('data', chunk => {
            corpo += chunk.toString(); 
        });

        req.on('end', () => {
            const usuario = JSON.parse(corpo);
            usuarios.push(usuario); 
            res.writeHead(201); 
            res.end(JSON.stringify({ message: 'Usuário adicionado com sucesso!' }));
        });

    } else if (req.method === 'GET' && rota.pathname === '/usuarios') {
        res.writeHead(200); 
        res.end(JSON.stringify(usuarios)); 

    } else {
        res.writeHead(404); 
        res.end(JSON.stringify({ message: 'Rota não encontrada' }));
    }
});

const PORT = 3000;
servidor.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
