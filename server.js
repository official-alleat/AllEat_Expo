// 웹소켓 서버 생성
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });
console.log('server start');

// 식당들 자리 DB
db = {
  "1": {
    "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
    "available": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  "2": {
    "tables": [[1, 2, 3, 4, 0], [5, 6, 0, 0, 7], [8, 9, 0, 10, 0]],
    "available": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
}

// 연결된 모든 클라이언트들을 저장할 배열
const clients = [];

// 웹소켓 서버 연결 이벤트 바인드
wss.on("connection", ws => {
  console.log('connection success');
  // 클라이언트를 clients 배열에 추가
  clients.push(ws);

  // 클라이언트로부터 메시지를 수신할 때
  ws.on("message", data => {
    console.log(`Received from user: ${data}`);

    var jsonData = JSON.parse(data); // storeId, tableNum, command
    var storeId = jsonData['storeId'];
    var tableNum = jsonData['tableNum'];
    var command = jsonData['command'];

    // 예약 요청 (자리 reserved)
    if (command == 'reserve') {
      db[storeId]['available'][tableNum] = 0;
    }
    // 예약 취소 (자리 available)
    else if (command == 'cancel') {
      db[storeId]['available'][tableNum] = 1;
    }

    // 클라이언트로부터 수신한 메시지를 모든 클라이언트에게 브로드캐스팅
    broadcast(JSON.stringify([storeId, db[storeId]]));
  })

  // 클라이언트와 연결이 끊어졌을 때
  ws.on('close', () => {
    // 클라이언트를 clients 배열에서 제거
    clients.splice(clients.indexOf(ws), 1);
    console.log('close');
  });
})

// 모든 클라이언트에게 메시지를 브로드캐스팅하는 함수
function broadcast(message) {
  clients.forEach((client) => {
    if (client.readyState == 1) {
      client.send(message);
    }
  });
}