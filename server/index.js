const express = require('express');
const { Server } = require('socket.io');
const { join } = require('node:path');
const axios = require('axios');
const crypto = require('crypto');
 
function md5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

const API_HOST = "sky-api.singularity-ai.com";

const url = `https://${API_HOST}/saas/api/v4/generate`
const app_key = '74585a87cb96145cb391c5796fa16518'       
const app_secret = '390f4162c1a5cf720e407870a2948e98bbc83a97fe75d16b'

headers={
    "app_key": app_key,
    "Content-Type": "application/json",
    "stream": "false"
}

const app = express();
const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
    res.end('Socket.io server is running.');
  });

app.use("/assets/images",express.static('upload'));
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('sendMessage', function(data) {
        console.log(data.message.content);
     })
     socket.on('notReceive', function(data) {
        getAnswer(data.message.content, socket);
        
     })
});

const getAnswer = (mes, socket) => {
    const time = Math.floor(Date.now() / 1000);
    const sign = md5(app_key + app_secret + time);
    const data = {
        "model": "SkyChat-MegaVerse",
        messages: [
            {
                role: 'user',
                content: mes
            }
        ],
        "param":{
            "generate_length":512,
            "top_p":1,
            "top_k":3,
            "repetition_penalty":1.0,
            "length_penalty":1.0,
            "min_len":2,
            "temperature":0.66
            }
    }
    axios({
        method: 'post',
        url,
            headers: {
                ...headers,
                timestamp: time,
                sign
        },
        data
    })
  .then(response => {
    socket.emit('getMessage', response.data.resp_data.reply);
  })
  .catch(error => {
    console.error(error); // 处理错误情况
  });
}

const PORT=3001;
//启动服务器
server.listen(PORT,()=> {
  console.info("- Local:   http://localhost:"+PORT);
});