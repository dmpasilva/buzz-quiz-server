import { Handshake, Socket } from 'socket.io';
import { SECRET } from '../config';
import { RoomsDb } from '../db/rooms';

export function socketConnectionListener(socket: Socket) {
  const handshake: Handshake = socket.handshake;
  const secret = handshake?.headers['X-SECRET'] || handshake?.headers['x-secret'];
  const room = handshake?.headers['X-ROOM'] || handshake?.headers['x-room'];

  if (!secret) {
    console.error('No secret for connect');
    socket.disconnect(true);
  } else {
    handleAuthentication(socket, secret, room);
  }

  function handleAuthentication(socket: Socket, header: string, room: string) {
    if (header === SECRET) {
      const db = RoomsDb.getInstance();
      if (room) {
        if(db.join(room)) {
          joinRoom(socket, room);
        } else {
          console.error('room does not exist', room);
          socket.disconnect(true);
        }
      } else {
        const room = db.generateRoom();
        joinRoom(socket, room);
      }
    } else {
      console.error("Invalid secret");
      socket.disconnect(true);
    }
  }

  function joinRoom(socket: Socket, room: string) {
    console.error('joined room', room);
    socket.join(room);
    socket.emit('join', { room });
  }
}
