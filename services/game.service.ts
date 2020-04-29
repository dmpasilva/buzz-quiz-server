import { SocketServer } from '../servers/socket.server';
import { socketConnectionListener } from '../listeners/socket-connect.listener';
import { Socket } from 'socket.io';
import { ReadMessage } from '../models/read-message';

export class GameService {
  private NAMESPACE = '/game';
  private EVENT = 'message';

  constructor(private server: SocketServer) {
    this.server.registerNamespace(this.NAMESPACE)
      .addListener('connect', (socket) => socketConnectionListener(socket))
      .in('1111').on('button', (socket, message) => this.onButton(socket, message))
      //.addListener('new_game', (socket, message) => this.newGame(socket))
      
  }

  /*testNewGame() {
    this.sendMessage('1111', { status: 'new_game' });
  }

  newGame(socket: Socket) {
    const room = socket.rooms?.[0];
    this.sendMessage(room, { status: 'new_game' });
  }*/

  sendRead(gameId: string, message: ReadMessage) {
    this.server.sendMessage(this.NAMESPACE, 'read', gameId, message);
  }

  sendStopRead(gameId: string) {
    this.server.sendMessage(this.NAMESPACE, 'stop_read', gameId, {});
  }
  
  sendWrite(gameId: string, message: number[]) {
    this.server.sendMessage(this.NAMESPACE, 'write', gameId, message);
  }

  onButton(socket: Socket, message: any) {
    console.log('on button', socket, message);
    const room = socket.rooms?.[0];
    console.log('would now receive button');
    console.log(message);
    console.log(room);
  }
}
