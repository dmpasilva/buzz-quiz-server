import { SocketServer } from '../servers/socket.server';
import { socketConnectionListener } from '../listeners/socket-connect.listener';
import { Socket } from 'socket.io';

export class GameService {
  private NAMESPACE = '/game';
  private EVENT = 'message';

  constructor(private server: SocketServer) {
    this.server.registerNamespace(this.NAMESPACE)
      .addListener('connect', (socket) => socketConnectionListener(socket))
      .addListener('button_event', (socket, message) => this.onButton(socket, message))
      .addListener('new_game', (socket, message) => this.newGame(socket))
      
  }

  testNewGame() {
    this.sendMessage('1111', { status: 'new_game' });
  }

  newGame(socket: Socket) {
    const room = socket.rooms?.[0];
    this.sendMessage(room, { status: 'new_game' });
  }

  sendMessage(gameId: string, message: any) {
    this.server.sendMessage(this.NAMESPACE, 'status', gameId, message);
  }

  onButton(socket: Socket, message: any) {
    const room = socket.rooms?.[0];
    console.log('would now send to room');
    console.log(message);
    console.log(room);
  }
}
