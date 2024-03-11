import { Router, Request, Response } from "express";
import readline from 'readline';
import fs from 'fs';
import { handleSuccess } from "../../config/handleResponse";

export class LogsRoutes {

  static get routes(): Router {

    const router = Router();

    router.get('/', (req: Request, res: Response) => {
      console.log('Hola mundo')
      const filePath = 'request_log.txt';

      // Lee el archivo
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo:', err);
          res.status(500).send('Error al leer el archivo');
          return;
        }

        // Divide el contenido del archivo en líneas
        const lines = data.split('\n');

        // Filtra las líneas que contienen los códigos HTTP especificados
        const httpCodes = ['400', '401', '402', '403', '404', '500'];
        const linesWithHttpCodes = lines.filter(line => {
          return httpCodes.some(code => line.includes(code));
        });

        // Selecciona las primeras 10 líneas que cumplen con la condición
        const firstTenLines = linesWithHttpCodes.slice(0, 10);

        // Retorna las primeras 10 líneas como respuesta
        handleSuccess({ code: 200, message: 'Last logs', res, data: firstTenLines })
      });
    });

    return router;

  }

}