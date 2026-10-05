use("biblioteca");

db.libros.drop();

// CREACIÓN DE LA COLECCIÓN CON VALIDACIÓN (JSON Schema)
db.createCollection("libros", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["titulo", "autor", "isbn", "anio_publicacion", "disponible"],
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
					pattern:
						"^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$",
					description: "Debe ser un código ISBN válido (ISBN-10 o ISBN-13).",
				},
				anio_publicacion: {
					bsonType: "int",
					maximum: 2026,
					description:
						"El anio_publicacion debe ser un entero menor o igual al año actual (años a.C. en negativo)",
				},
				disponible: {
					bsonType: "bool",
					description: "disponible debe ser un booleano (true/false)",
				},
			},
		},
	},
});
