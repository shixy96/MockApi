$(function() {
  var socket = new WebSocket(
    "ws://localhost:3000/v1/socketHandler?token=zxc&self=/user/18705837259"
  );
  socket.onopen = () => send(socket, { category: "PRESENCE" });

  socket.onclose = () => console.log("connection closed.");

  $("form").submit(e => {
    e.preventDefault();
    send(socket, {
      category: "MESSAGE",
      body: {
        text: $("#m").val()
      }
    });
    $("#m").val("");
    return false;
  });

  socket.onmessage = function(MessageEvent) {
    var content = JSON.parse(MessageEvent.data);
    if (content.body) {
      $("#messages").append($("<li>").text(content.body.text));
    }
  };
});

function send(socket, message) {
  message = JSON.stringify(message);
  console.log("send\t", message);
  socket.send(message);
}
