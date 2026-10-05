use("biblioteca");

db.libros.drop();
db.prestamos.drop();

// CREACIÓN DE LA COLECCIÓN LIBROS CON VALIDACIÓN (JSON Schema)
db.createCollection("libros", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["titulo", "autor", "isbn", "anio_publicacion", "disponible", "categorias"],
			properties: {
				titulo: {
					bsonType: "string",
					description: "El titulo es obligatorio y debe ser texto",
					minLength: 1, // Garantiza que no sea un string vacío
				},
				autor: {
					bsonType: "string",
					description: "El autor es obligatorio y debe ser texto",
					minLength: 1,
				},
				isbn: {
					bsonType: "string", // Un solo tipo no requiere ir dentro de un arreglo []
					// Expresión regular que valida ISBN-10 o ISBN-13 (con o sin guiones)
					pattern: "^(?:97[89][ -]?)?(?:[0-9][ -]?){9}[0-9X]$",
					description: "Debe ser un código ISBN válido (ISBN-10 o ISBN-13).",
				},
				anio_publicacion: {
					bsonType: "int",
					minimum: 1900,
					maximum: 2025,
					description:
						"El anio_publicacion debe ser un entero menor o igual al año actual (años a.C. en negativo)",
				},
				disponible: {
					bsonType: "bool",
					description: "disponible debe ser un booleano (true/false)",
				},
				categorias: {
					bsonType: "array",
					minItems: 1,
					items: {
						bsonType: "string",
					},
					description: "debe contener al enos una categoria en formato texto",
				},
			},
		},
	},
});

// CREACIÓN DE LA COLECCIÓN PRESTAMOS CON VALIDACIÓN (JSON Schema)
db.createCollection("prestamos", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["libro", "usuario", "fecha_prestamo", "fecha_devolucion", "estado"],
			properties: {
				// Objeto anidado con info del libro
				libro: {
					bsonType: "object",
					required: ["titulo", "autor", "isbn", "anio_publicacion", "disponible", "categorias"],
					properties: {
						titulo: { bsonType: "string" },
						autor: { bsonType: "string" },
						isbn: { bsonType: "string" },
						anio_publicacion: { bsonType: "int" },
						disponible: { bsonType: "bool" },
						categorias: { bsonType: "array" },
					},
				},
				// Objeto anidado con info del libro
				usuario: {
					bsonType: "object",
					required: ["nombre", "email"],
					properties: {
						nombre: { bsonType: "string" },
						email: { bsonType: "string" },
					},
				},
				fecha_prestamo: {
					bsonType: "date",
					description: "Fecha de inicio del préstamo",
				},
				fecha_devolucion: {
					bsonType: "date",
					description: "Fecha pactada o real de devolución",
				},
				estado: {
					bsonType: "string",
					enum: ["activo", "devuelto", "retrasado"],
					description: "El estado puede ser activo, devuelto o retrasado",
				},
			},
		},
	},
});

// Insertar 5 libros
db.libros.insertMany([
	{
		titulo: "El Señor de los Anillos",
		autor: "J.R.R. Tolkien",
		isbn: "978-0-261-10238-5",
		anio_publicacion: NumberInt(1954),
		disponible: true,
		categorias: ["Fantasía", "Aventura"],
	},
	{
		titulo: "Cien Años de Soledad",
		autor: "Gabriel García Márquez",
		isbn: "978-0-307-47472-8",
		anio_publicacion: NumberInt(1967),
		disponible: true,
		categorias: ["Ficción", "Realismo Mágico"],
	},
	{
		titulo: "1984",
		autor: "George Orwell",
		isbn: "978-0-451-52493-5",
		anio_publicacion: NumberInt(1949),
		disponible: false,
		categorias: ["Distopía", "Ciencia Ficción"],
	},
	{
		titulo: "El Principito",
		autor: "Antoine de Saint-Exupéry",
		isbn: "978-0-15-601398-7",
		anio_publicacion: NumberInt(1943),
		disponible: true,
		categorias: ["Infantil", "Filosofía"],
	},
	{
		titulo: "Ficciones",
		autor: "Jorge Luis Borges",
		isbn: "978-0-307-95092-5",
		anio_publicacion: NumberInt(1944),
		disponible: true,
		categorias: ["Ficción", "Cuentos"],
	},
]);

db.libros.find();

// Insertar 3 préstamos
// Consultar libros disponibles
// Actualizar estado de un préstamo
// Buscar préstamos atrasados
// Agregar categoría a un libro con $addToSet
