const roomId = 8888;

let clients = [];
let users = require("../model/users");
let historyMessages = require("../model/history");

function connection(client, req) {
  const preToken = /[?&]token=(([^&#]*)|&|#|$)/.exec(req.url);
  const token = preToken && preToken[2];
  const preSelf = /[?&]self=(([^&#]*)|&|#|$)/.exec(req.url);
  const self = preSelf && preSelf[2];
  let userId = self.split("/").slice(-1);
  Array.isArray(userId) && (userId = userId[0]);

  client.on("message", function(message) {
    message = typeof message === "string" ? JSON.parse(message) : message;
    console.log("recive\t", message);
    if (message.category === "PRESENCE") {
      processPresence(message, client, userId);
    } else if (message.category === "MESSAGE") {
      processMessage(message, userId);
    }
  });

  client.on("close", () => leaveRoom(userId));
}

function processPresence(message, client, userId) {
  if (message.type === "unavailable") {
    leaveRoom(userId);
  } else {
    enterRoom(client, userId);
  }
}

function leaveRoom(userId) {
  clients = clients.filter(user => user.userId !== userId);
  users = users.filter(user => user.id !== userId);
}

function enterRoom(client, userId) {
  users.forEach(user => {
    const content = {
      category: "PRESENCE",
      fromDetail: {
        type: user.type,
        participantRole: user.participantRole,
        userId: user.id,
        nick: user.nick,
        avatar: user.avatar
      }
    };
    send({
      socket: client,
      message: content,
      fromUserId: user.id,
      toUserId: userId
    });
  });
  historyMessages.forEach(message =>
    send({
      socket: client,
      message: message,
      toUserId: userId
    })
  );
  const content = {
    category: "PRESENCE",
    fromDetail: {
      type: "CHAT_ROOM_PARTICIPANT",
      participantRole: "MEMBER",
      userId: userId,
      nick: userId
    }
  };
  clients.forEach(user => {
    send({
      socket: user.socket,
      message: content,
      toUserId: user.userId
    });
  });
  users.push({ id: userId, nick: userId });
  clients.push({ userId, socket: client });
}

function processMessage(message, userId) {
  message.body = {
    ...message.body,
    time: Date.now()
  };
  clients.forEach(function(user) {
    send({
      socket: user.socket,
      message: message,
      fromUserId: userId,
      toUserId: user.userId
    });
  });
}

function send({ socket, message, fromUserId, toUserId }) {
  console.log(fromUserId);
  message = {
    ...message,
    from: fromUserId ? `/room/${roomId}/user/${fromUserId}` : message.from,
    to: toUserId ? `/user/${toUserId}` : message.to
  };
  message = JSON.stringify(message);
  console.log("send\t", message);
  socket.send(message);
}

module.exports = connection;
