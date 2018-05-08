// 单例模式
let ws = null
export const webSocket = (SOCKET_URL) => {
  if(ws == null) {
    ws = new WebSocket(SOCKET_URL)
  }
  return ws
}