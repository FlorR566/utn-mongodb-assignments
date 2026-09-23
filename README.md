# UTN - MongoDB & NoSQL Assignments

Contiene los trabajos prácticos, ejercicios y scripts de consulta desarrollados en NoSQL / MongoDB para la materia de **Bases de Datos II**.

## Tecnologías y Herramientas

- **Motor de BBDD:** MongoDB Community Server (v8.x / v7.x)
- **Shell interactivo:** `mongosh`
- **GUI / Cliente:** MongoDB Compass
- **Entorno:** macOS / JavaScript (Node.js engine)

## Estructura del Repositorio

```text
.
├── 📄 .gitignore
├── 📄 README.md
├── 📁 guias_practicas/
│   ├── 📄 01_introduccion_crud.js
│   └── 📄 02_operadores_y_filtros.js
└── 📁 proyectos/
    └── 📁 universidad/
        ├── 📄 insert_estudiantes.js
        └── 📄 consultas.js
```

## Cómo ejecutar los scripts localmente

1. Iniciar el servicio de MongoDB
   Asegurate de tener corriendo la instancia de MongoDB en tu máquina local:

```bash
start-mongo
```

2. Ejecutar un script mediante `mongosh`
   Podes ejecutar cualquier archivo `.js` directamente en la terminal pasando la cadena de conexión:

```bash
mongosh "mongodb://localhost:27017" guias_practicas/01_introduccion_crud.js
```

O bien abrirlos dentro de VS Code utilizando la extensión oficial MongoDB for VS Code para correr los comandos de forma interactiva.

## Contenido cubierto

[x] Operaciones CRUD básicas (insertOne, insertMany, find, updateOne, deleteMany)

[x] Operadores de comparación/relacionales ($eq, $gt, $gte, $lt, $lte, $in, $nin)

[x] Operadores lógicos ($and, $or, $not)
