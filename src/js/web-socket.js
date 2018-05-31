import { SOCKET_IP } from './util-data'

// 单例模式
let ws = null
export const webSocket = () => {
  if(ws == null) {
    ws = new WebSocket(SOCKET_IP)
  }
  return ws
}