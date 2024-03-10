import path from 'path';
import fs from 'fs';

import { UploadedFile } from 'express-fileupload';

export class FileUploadService {


  
  private checkFolder( folderPath: string ) {
    if ( !fs.existsSync(folderPath) ) {
      fs.mkdirSync(folderPath);
    }
  }


  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png','gif', 'jpg','jpeg']
  ) {

    try {
      
      const fileExtension = file.mimetype.split('/').at(1) ?? '';
      if ( !validExtensions.includes(fileExtension) ) {
        throw new Error(`Invalid extension: ${ fileExtension }, valid ones ${ validExtensions }`);
      }

      const destination = path.resolve( __dirname, '../../../', folder );
      this.checkFolder( destination );

      const fileName = `file-${ Date.now() }.${ fileExtension }`;

      file.mv(`${destination}/${ fileName }`);

      return { fileName };

    } catch (error) {
      
      // console.log({error});
      throw error;

    }



  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png','jpg','jpeg','gif']
  ) {

    const fileNames = await Promise.all(
      files.map( file => this.uploadSingle(file, folder, validExtensions) )
    );

    return fileNames;

  }


}


