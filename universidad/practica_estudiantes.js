use("universidad"); // Selecciona la base de datos

db.estudiantes.drop(); // Limpia la colección (opcional, útil para pruebas repetibles)

// Inserción de documentos (Create)
db.estudiantes.insertMany([
	{
		legajo: 12345,
		nombre: "Juan Pérez",
		edad: 21,
		carrera: "Ingeniería en Sistemas",
		activo: true,
	},
	{
		legajo: 12346,
		nombre: "Laura Fernández",
		edad: 22,
		carrera: "Ingeniería Química",
		activo: true,
	},
]);

// Consultas con filtros y operadores (Read)
db.estudiantes.find(); // Busca todos los documentos

db.estudiantes.findOne({ nombre: "Laura Fernández" }); // Busca un documento específico usando la sintaxis correcta con llaves {}

// Busca usando operadores de comparación y lógicos
db.estudiantes.find({
	$and: [{ edad: { $gte: 20 } }, { activo: true }],
});
