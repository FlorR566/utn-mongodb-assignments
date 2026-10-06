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
