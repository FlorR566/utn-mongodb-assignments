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
├── .gitignore
├── README.md
├── guias_practicas/
│   ├── 01_introduccion_crud.js
│   └── 02_operadores_y_filtros.js
└── universidad/
      ├── practica_estudiantes.js
      └── consultas.js
```

## Cómo ejecutar los scripts localmente

### 1. Iniciar el servicio de MongoDB

Asegurate de tener corriendo la instancia de MongoDB en tu máquina local.

Con Homebrew (macOS):

```bash
brew services start mongodb-community
```

Con alias / script personalizado:

```bash
start-mongo
```

### 2. Ejecutar un script mediante `mongosh`

Abrí una terminal en la carpeta donde se encuentra el archivo `.js` y seguí estos pasos:

**a.** Ingresar a la consola interactiva de MongoDB:

```bash
mongosh
```

**b.** Cargar y ejecutar el archivo con `load()`:

```js
load("practica_estudiantes.js");
```

> **Tip:** si el comando devuelve `true`, el script se ejecutó correctamente y vas a ver el prompt cambiar al nombre de la base de datos correspondiente.

### 3. Verificar los datos creados

Dentro del shell interactivo (`mongosh`), podés comprobar los resultados con los siguientes comandos:

Listar las colecciones creadas:

```js
show collections
```

Consultar los documentos guardados:

```js
db.estudiantes.find();
```

> **Tip:** también se pueden abrir y ejecutar los scripts dentro de VS Code utilizando la extensión oficial **MongoDB for VS Code**.

## Contenido cubierto

[x] Operaciones CRUD básicas (insertOne, insertMany, find, updateOne, deleteMany)

[x] Operadores de comparación/relacionales ($eq, $gt, $gte, $lt, $lte, $in, $nin)

[x] Operadores lógicos ($and, $or, $not)
