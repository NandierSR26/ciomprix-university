
# Universidad Ciomprix

proyecto para prueba tecnica.



## Instalación del proyecto

1. copia el repositorio y abrelo localmente, seguido ejecura
   el comando ``` npm install ```, para recontruir los modulos de 
   node.

2. Ejecutar el comando ``` npm run dev ``` para inciar el proyecto

3. en el archivo .env crear la variable DATABASE_URL y 
   asignarle la url de conexion proporcionada en el documento. 
   adicionalmente tambien el puerto y el JWT_SEED

4. ejecutar comando ``` prisma migrate dev ```, con esto se creara la 
   estructura de la base de datos a la semejanza del schema.

5. Ejecutar el comando ``` prisma generate ```