use("logistica_db");

db.envios.drop(); // limpia la colección (util en pruebas repetibles)

// CREACIÓN COLECCIÓN CON VALIDACIÓN (JSON Schema)
db.createCollection("envios", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["numero_seguimiento", "estado", "ciudad_destino", "peso"],
			properties: {
				numero_seguimiento: {
					bsonType: "string",
					description: "Debe ser texto. La unicidad la garantiza el índice único",
				},
				estado: {
					enum: ["Pendiente", "En tránsito", "Entregado", "Devuelto"],
					description: "Debe ser uno de los estados permitidos",
				},
				ciudad_destino: {
					bsonType: "string",
					description: "Debe ser texto",
				},
				peso: {
					bsonType: "number",
					minimum: 0,
					description: "Debe ser número mayor o igual a 0 (kg)",
				},
			},
		},
	},
});

// Insertar 12 documentos
db.envios.insertMany([
	{ numero_seguimiento: "ar1001", estado: "Entregado", ciudad_destino: "Buenos Aires", peso: 5.5 },
	{ numero_seguimiento: "AR1002", estado: "En tránsito", ciudad_destino: "Córdoba", peso: 12 },
	{ numero_seguimiento: "AR1003", estado: "Entregado", ciudad_destino: "Rosario", peso: 25.3 },
	{ numero_seguimiento: "ar1004", estado: "Pendiente", ciudad_destino: "Buenos Aires", peso: 2.1 },
	{ numero_seguimiento: "AR1005", estado: "Entregado", ciudad_destino: "Córdoba", peso: 30 },
	{ numero_seguimiento: "AR1006", estado: "En tránsito", ciudad_destino: "Mendoza", peso: 8.7 },
	{ numero_seguimiento: "ar1007", estado: "Entregado", ciudad_destino: "Buenos Aires", peso: 18 },
	{ numero_seguimiento: "ar1008", estado: "Pendiente", ciudad_destino: "Rosario", peso: 21.5 },
	{ numero_seguimiento: "AR1009", estado: "Entregado", ciudad_destino: "Mendoza", peso: 3.4 },
	{ numero_seguimiento: "ar1010", estado: "En tránsito", ciudad_destino: "Córdoba", peso: 15 },
	{ numero_seguimiento: "AR1011", estado: "Entregado", ciudad_destino: "Rosario", peso: 40 },
	{ numero_seguimiento: "AR1012", estado: "Devuelto", ciudad_destino: "Buenos Aires", peso: 6 },
]);
