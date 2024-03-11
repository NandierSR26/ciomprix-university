import express, { NextFunction, Request, Response, Router } from 'express';
import fs from 'fs';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  public LOG_FILE_PATH = 'request_logs.txt';

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {


    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const ip = req.ip;
      const endpoint = req.originalUrl;
      let statusCode: number;
      const user = req.user?.email || "Unknow";
      const timestamp = new Date().toISOString();

      res.on('finish', () => {
        statusCode = res.statusCode;
        const logEntry = `${ip} | ${endpoint} | ${statusCode} | ${user} | ${timestamp}\n`;

        fs.appendFile('request_log.txt', logEntry, (err) => {
          if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
          }
        });
      });

      next();
    });

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
    //   res.sendFile(indexPath);
    // });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}