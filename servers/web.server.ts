import * as express from 'express';
import { Server, createServer } from 'http';
import { Express } from 'express';
import { PORT, REDIRECT_URL } from "../config";

export class WebServer {
  private app: Express;
  server: Server;

  constructor() {
    this.app = express();
    this.configureRouting();
    this.server = createServer(this.app);
  }

  private configureRouting() {
    this.app.get('/', function (req, res) {
      res.redirect(301, REDIRECT_URL);
    });
  }

  public start() {
    this.server.listen(PORT, () => {
      console.log(`Listening on *:${PORT}`);
    })
  }
}
