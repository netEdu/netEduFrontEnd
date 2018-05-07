// const LATENCY = 16

// 前面的对象是载荷，传递三个参数，分别是消息，线程和发出者
export function sendMessage ({ text, thread, author, websocket }) {
  let timestamp = Date.now()
  // Websocket 消息发送(异步方法，es2017)
  const send = async () => {
    await websocket.ws.send(
      '0,'+ 
      'm_' + timestamp + ',' + 
      thread.id + ',' + 
      thread.name + ',' + 
      author + ']' + 
      text
    )
  }
  send().then().catch( err => {
    console.log(err)
  })

  // const id = 'm_' + timestamp
  // const message = {
  //   id,
  //   text,
  //   threadID: thread.id,
  //   threadName: thread.name,
  //   authorName: author
  // }

  // // 发送消息
  // setTimeout(async () => {
  //   // 发送消息时，连接服务器的webSocket方法应该写在这里
  //   // flag,groupId,...,]message

  //   cb(message)
  // }, LATENCY)
}