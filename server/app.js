require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT;
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const fileUpload = require('express-fileupload')
const path = require('path')

const WebSocket = require('ws');

const authRouter = require('./routes/authRouter');
const orders = require('./routes/ordersRouter');
const settings = require('./routes/settingsRouter')
const uploadRouter = require('./routes/cookAvatarRouter')
const uploadRouterClient = require('./routes/clientAvatarRouter')
const cuisine = require('./routes/cuisineRouter');

const povars = require('./routes/povarRouter')

const map = new Map();// for ws
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())

//SOCKET
const http = require('http');
const { Server } = require("socket.io");

app.use(morgan('dev'));
app.use(express.json({ extended: true }))
app.use(cors({
  credentials: true,
  origin: true,
}));

const sessionParser = session({
  name: 'sid',
  store: new FileStore({}),
  saveUninitialized: false,
  secret: 'dsmkalmdkl',
  resave: false,
})
app.use(sessionParser);

app.use('/orders', orders);
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);
app.use('/uploadClient', uploadRouterClient);
app.use('/povars', povars);
app.use('/settings', settings);
app.use('/cuisines', cuisine);

//WS
const server = http.createServer(app);
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });


server.on('upgrade', function (request, socket, head) {
  console.log('Parsing session from request...');

  sessionParser(request, {}, () => {

    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', function (ws, request) {
  const userId = request.session.user.id
  const name = request.session.user.name

  map.set(userId, ws);

  ws.on('message', async function (message) {
    console.log(`Received message ${message} from user ${userId}`);
    console.log(request.session.user);
    for (const [userId, wsClient] of map) {
      // wsClient.send({type:'message', payload: {message}})
      // wsClient.send(message)
      wsClient.send(`${name} =:= ${message}`)
    }
  });
});
// WS CLOSED


server.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})
