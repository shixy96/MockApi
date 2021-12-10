module.exports = [
  {
    category: "MESSAGE",
    from: "/room/8888/user/2345",
    type: "groupchat",
    body: {
      text: "今晚吃什么？",
      time: Date.now() + 10
    }
  },
  {
    category: "MESSAGE",
    from: "/room/8888/user/4567",
    type: "groupchat",
    body: {
      text: "黄焖鸡米饭",
      time: Date.now() + 20
    }
  },
  {
    category: "MESSAGE",
    from: "/room/8888/user/1234",
    type: "groupchat",
    body: {
      text: "黄焖鸡米饭不好吃",
      time: Date.now() + 30
    }
  }
];
