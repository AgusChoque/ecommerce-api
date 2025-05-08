# 🛒 Proyecto Individual - API Ecommerce

Este es el **backend de una tienda virtual** (ecommerce), desarrollado como proyecto individual. Está pensado para que el dueño de una tienda pueda gestionar productos, categorías, usuarios y órdenes de compra. Incluye autenticación, manejo de roles y carga de imágenes en la nube.

---

## 🎯 Propósito

El objetivo de este proyecto es simular el funcionamiento interno de un ecommerce, ofreciendo una API robusta que maneje:

- Registro y login de usuarios  
- Visualización y gestión de productos  
- Manejo de stock  
- Órdenes de compra  
- Carga y actualización de imágenes usando Cloudinary

---

## 🧑‍🤝‍🧑 Roles de usuario

El sistema contempla tres niveles de acceso:

- **Usuario sin registrar:** puede ver la lista de productos, registrarse y iniciar sesión.
- **Usuario registrado:** puede hacer compras y gestionar su propia cuenta. No puede acceder a datos de otros usuarios ni modificar productos.
- **Administrador:** puede ver todos los usuarios, gestionar productos, imágenes y órdenes de compra.

---

## 🔍 Casos de uso

- Una persona quiere registrarse y hacer una compra.
- El administrador desea cargar nuevos productos y categorías.
- El dueño de la tienda necesita ver las órdenes realizadas.
- Se desea subir una nueva imagen para un producto.
- Se requiere consultar el stock disponible de los productos.

---

## 🛠️ Tecnologías utilizadas

- **Node.js + NestJS** como framework principal  
- **TypeScript** para una programación más segura y estructurada  
- **TypeORM** como ORM para interactuar con la base de datos  
- **PostgreSQL** como sistema de base de datos  
- **Jest** para realizar tests unitarios y end to end  
- **Cloudinary** para subir y administrar imágenes  
- **Docker + Docker Compose** para contenerizar el proyecto

---

## ⚙️ Instalación y puesta en marcha

### 1. Requisitos previos

- Tener instalado **Docker** y **Docker Compose**
- Tener instalado **Git**

### 2. Clonar el repositorio

Cloná el repositorio con el siguiente comando:
```bash
# Clonar el repositorio
git clone https://github.com/AgusChoque/ecommerce-api.git

# Acceder al directorio del proyecto
cd ecommerce-api/ecommerce-aguschoque
```

### 3. Crear archivo `.env`

Dentro de la raíz del proyecto, crea un archivo llamado `.env` y completalo con estas variables:
```ini
# Conexión con base de datos ( PostgreSQL )
DB_NAME=<nombre de la base de datos>
DB_HOST=<host de la base de datos, generalmente localhost>
DB_PORT=<puerto de la base de datos, normalmente 5432>
DB_USERNAME=<nombre de usuario para PostgreSQL>
DB_PASSWORD=<contraseña para PostgreSQL>

# Conexión con Cloudinary
CLOUDINARY_CLOUD_NAME=<nombre de tu cuenta de Cloudinary>
CLOUDINARY_API_KEY=<clave de API de Cloudinary>
CLOUDINARY_API_SECRET=<secreto de la API de Cloudinary>

# Configuración de secreto para los tokens
JWT_SECRET=<secreto para los JWT>

# Conexión a base de datos vía Docker
POSTGRES_PASSWORD=<contraseña de PostgreSQL>
POSTGRES_DB=<nombre de la base de datos de PostgreSQL>
```
📌 **Asegúrate de que `DB_NAME` y `POSTGRES_DB` tengan el mismo valor, lo mismo para `DB_PASSWORD` y `POSTGRES_PASSWORD`.**

### 4. Levantar el proyecto con Docker

Una vez configurado el archivo `.env`, puedes levantar el proyecto con Docker y Docker Compose. Ejecutá el siguiente comando:
```bash
docker compose up
```
Esto creará los contenedores y dejará corriendo la API en `http://localhost:3000`.

### 5. Levantar el proyecto sin Docker (opcional)

Si prefieres no usar Docker, puedes ejecutar el proyecto directamente en tu máquina. Para eso, seguí estos pasos:

1. Instala las dependencias con `npm`:
    ```bash
    npm install
    ```
2. Ejecuta el proyecto en el modo que necesites:
   - **Modo de desarrollo**: Este modo permite ejecutar el proyecto en un entorno de desarrollo, ideal para hacer pruebas y modificaciones.
       ```bash
        npm run start
        ```
   - **Modo watch**: En este modo, el proyecto se ejecuta de forma continua y se recarga automáticamente cuando hay cambios en el código.
       ```bash
        npm run start:dev
        ```
   - **Modo producción**: Este modo ejecuta el proyecto de manera optimizada para producción.
       ```bash
        npm run start:prod
        ```

La API estará disponible en `http://localhost:3000`.

---

## 🧪 Pruebas

Este proyecto utiliza **Jest** para ejecutar pruebas automatizadas. Los comandos disponibles son:

- **Pruebas unitarias**  
  Ejecutan tests sobre funciones o módulos individuales del sistema.
  ```bash
  npm run test
  ```

- **Pruebas end-to-end (e2e)**  
  Simulan el uso completo de la API para verificar que todo funcione correctamente.
  ```bash
  npm run test:e2e
  ```

- **Cobertura de pruebas**  
  Muestra qué partes del código están cubiertas por los tests.
  ```bash
  npm run test:cov
  ```
  Al correr este comando, verás una tabla con estadísticas como funciones cubiertas, líneas de código evaluadas y más.

---

## 📂 Estructura principal de la API

- **/auth:** registro y login
- **/users:** gestión de usuarios (solo admins pueden ver a todos)
- **/products:** listado y gestión de productos
- **/categories:** creación y visualización de categorías
- **/orders:** creación de órdenes de compra asociadas a usuarios
- **/files:** subida y actualización de imágenes a Cloudinary

La documentación completa de los endpoints está disponible mediante Swagger en `http://localhost:3000/api` (cuando el proyecto está corriendo).

---

## 📌 Próximos pasos 

- Agregar filtros de búsqueda por categoria para productos
- Mejorar el control de stock para compras
- Agregar tests unitarios
- Deploy del proyecto

---

## 👨‍💻 Contribuciones

Si deseas contribuir a este proyecto, puedes seguir estos pasos:

1. Haz un fork del repositorio.
    
2. Clona tu fork a tu máquina local.
    
3. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
    
4. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
    
5. Empuja tus cambios (`git push origin feature/nueva-funcionalidad`).
    
6. Crea un pull request desde tu fork hacia el repositorio original.

---

## 🚀 ¡Gracias por leer! 

### 🙌 Agradecimientos

Quiero agradecer especialmente a la institución **[Henry](https://www.soyhenry.com/)** 🚀 por brindarme el espacio, las herramientas y los desafíos necesarios para desarrollar este proyecto. En particular, al instructor **Joaquín Cortés Conde**, cuyo acompañamiento y claridad fueron claves en mi proceso de aprendizaje.

### 📚 Referencias

- [NestJS - Official Documentation](https://docs.nestjs.com/)
- [Swagger - OpenAPI Documentation](https://swagger.io/docs/)
- [Cloudinary - API Documentation](https://cloudinary.com/documentation)
- [Class Validator - GitHub Repository](https://github.com/typestack/class-validator)

### 📩 Contacto

🚀¡Gracias por tomarte el tiempo de explorar este proyecto! Si te interesa charlar sobre desarrollo web, arquitectura, o tenés algún feedback o sugerencia, estaré encantado de leerte.

Podés contactarme por acá, en [LinkedIn](https://www.linkedin.com/in/agustinchoque), o al mail asociado a mi cuenta de GitHub.

¡Hasta la próxima!