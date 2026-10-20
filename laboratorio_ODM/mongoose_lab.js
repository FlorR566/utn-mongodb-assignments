import mongoose from "mongoose";

const url = "mongodb://localhost:27017/"; // String de conexión local
const dbName = "lab_odm"; // Nombre de la base de datos

// Definición del esquema
const exampleSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
		},
	},
	{
		timestamps: true, // Genera automáticamente createdAt y updatedAt
	},
);

// Creación del modelo (equivalente a una colección)
const components = mongoose.model("componentes", exampleSchema);

async function main() {
	// Conexión a MongoDB usando Mongoose
	await mongoose.connect(`${url}${dbName}`);
	console.log("Conexión exitosa a MongoDB con Mongoose");

	const insertResult = await components.insertMany([
		{ nombre: "Sensor de Humedad", stock: 18 },
		{ nombre: "Servo Motor", stock: 24 },
		{ nombre: "LED RGB", stock: 22 },
	]);

	console.log("Documentos insertados =>", insertResult);

	return "Completado.";
}

try {
	const result = await main();
	console.log(result);
} catch (error) {
	console.error("Error en la conexión o ejecución:", error);
} finally {
	// Cierre de conexión
	await mongoose.connection.close();
}
