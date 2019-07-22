const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 3000, path: "/v1/socketHandler" });

const roomId = 8888;

let clients = [];
let users = require("./model/users");
let historyMessages = require("./model/history");

wss.on("connection", function(client, req) {
  const preToken = /[?&]token=(([^&#]*)|&|#|$)/.exec(req.url);
  const token = preToken && preToken[2];
  const preSelf = /[?&]self=(([^&#]*)|&|#|$)/.exec(req.url);
  const self = preSelf && preSelf[2];
  const userId = self.split('/').slice(-1);
  client.on("message", function(message) {
    message = typeof message === 'string' ? JSON.parse(message) : message;
    console.log('recive\t',message)
    if (message.category === "PRESENCE") {
      if (message.type === "unavailable") {
        clients = clients.filter(function(socket) {
          return socket !== client;
        });
        console.log(24, clients)
        users = users.filter(function(user) {
          return user.id !== userId;
        });
        console.log(27, users)
        return;
      }
      users.forEach(user => {
        const content = JSON.stringify({
          category: "PRESENCE",
          from: `/room/${roomId}/user/${user.id}`,
          to: `/user/${userId}`,
          fromNick: user.nick,
          fromAvatar: user.avatar
        })
        console.log('send\t',content)
        client.send(content);
      });
      historyMessages.forEach(historyMessage => {
        client.send(JSON.stringify(historyMessage));
      });
      users.push({ id: userId, nick: userId });
      clients.push(client)
    } else if (message.category === "MESSAGE") {
      clients.forEach(function(socket) {
        console.log('send\t',message)
        socket.send(JSON.stringify(message));
      });
    }
  });

  client.on("close", function() {
    clients = clients.filter(function(socket) {
      return socket !== client;
    });
  });
});

var app = require("express")();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client.html");
});

app.listen(3010, function() {
  console.log("client on 3010, \nserver on 3000");
});
