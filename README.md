## **Configuración del Proyecto**

### 1. Clonar el repositorio

```bash
git clone https://github.com/alejo2987/rest-client-products.git
cd rest-client-products

### 2. Crear la tabla productos en una base de datos postgres

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100) NOT NULL
);

### 3. Intalar dependencias con npm install

### 4. Arrancar el servidor ejecutando npm start

### 5. Hacer peticion post a http://localhost:3000/productos

Body json
{
    "nombre": "Laptop",
    "precio": 1200.99,
    "categoria": "Electrónica"
}


