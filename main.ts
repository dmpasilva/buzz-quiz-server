import { WebServer } from './servers/web.server';
import { SocketServer } from './servers/socket.server';
import { GameService } from './services/game.service';
import { TestService } from './test/test.service';
import {ENVIRONMENT} from "./config";

console.info('Starting Game Server...');
console.info('Environment is', ENVIRONMENT);

const server = new WebServer();
const socket = new SocketServer(server);
const game = new GameService(socket);

new TestService(game);
server.start();
