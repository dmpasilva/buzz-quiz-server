import { WebServer } from './web.server';
import * as io from 'socket.io';
import { Namespace, Server } from 'socket.io';
import { socketConnectionListener } from '../listeners/socket-connect.listener';

export class SocketServer {
  private socket: Server;

  constructor(web: WebServer) {
    this.socket = io(web.server);
    this.initSocket();
  }

  private initSocket() {
    this.socket.on('connection', (socket) => socketConnectionListener(socket));
  }

  registerNamespace(namespace: string): Namespace {
    return this.socket.of(namespace);
  }

  sendMessage(namespace: string, event: string, room: string, message: any) {
    this.socket.of(namespace)
      .in(room)
      .emit(event, message);
  }

  broadcastMessage(namespace: string, event: string, message: any) {
    this.socket.of(namespace)
      .emit(event, message);
  }
}
