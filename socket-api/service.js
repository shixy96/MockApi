var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 3000 });

var clients = [];
var historyMessages = [
    {
        category: "MESSAGE",
        from: "/room/8888/user/2345",
        to: "/user/1234",
        type: "groupchat",
        body: {
            text: "今晚吃什么？",
            time: 1430978424249
        }
    },
    {
        category: "MESSAGE",
        from: "/room/8888/user/4567",
        to: "/user/1234",
        type: "groupchat",
        body: {
            text: "黄焖鸡米饭",
            time: 1430978425821
        }
    }
];

wss.on("connection", function(client) {
    clients.push(client);
    client.on("message", function(message) {
        message = JSON.parse(message);
        if (message.category === "PRESENCE") {
            historyMessages.forEach(historyMessage => {
                client.send(JSON.stringify(historyMessage));
            });
        } else if (message.category === "MESSAGE") {
            clients.forEach(function(socket) {
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
