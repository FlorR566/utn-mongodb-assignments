use("tienda");

db.productos.drop(); // limpiamos la colección (util en pruebas repetibles)

// CREATE - Insertar datos:
db.productos.insertOne({
	nombre: "Laptop Dell XPS 15",
	precio: 1500,
	stock: 10,
	categoria: "Electrónica",
	tags: ["computadoras", "portátiles"],
}); // inserción única

db.productos.insertMany([
	// inserción múltiple
	{
		nombre: "iPhone 15 Pro",
		precio: 1200,
		stock: 15,
		categoria: "Electrónica",
		tags: ["celulares", "apple", "smartphones"],
	},
	{
		nombre: "Monitor LG UltraGear 27",
		precio: 350,
		stock: 8,
		categoria: "Electrónica",
		tags: ["monitores", "gaming"],
	},
	{
		nombre: "Teclado Mecánico Keychron K2",
		precio: 110,
		stock: 25,
		categoria: "Accesorios",
		tags: ["periféricos", "teclados", "oficina"],
	},
	{
		nombre: "Mouse Inalámbrico Logitech MX Master 3S",
		precio: 100,
		stock: 20,
		categoria: "Accesorios",
		tags: ["periféricos", "mouse", "productividad"],
	},
	{
		nombre: "Auriculares Sony WH-1000XM5",
		precio: 380,
		stock: 12,
		categoria: "Audio",
		tags: ["auriculares", "audio", "bluetooth"],
	},
	{
		nombre: "Silla Gamer Secretlab Titan",
		precio: 520,
		stock: 5,
		categoria: "Muebles",
		tags: ["oficina", "sillas", "gaming"],
	},
	{
		nombre: "Escritorio Elevable Eléctrico",
		precio: 450,
		stock: 7,
		categoria: "Muebles",
		tags: ["oficina", "ergonomía"],
	},
	{
		nombre: "Tablet Samsung Galaxy Tab S9",
		precio: 800,
		stock: 10,
		categoria: "Electrónica",
		tags: ["tablets", "samsung", "portátiles"],
	},
	{
		nombre: "Placa de Video Nvidia RTX 4070",
		precio: 650,
		stock: 4,
		categoria: "Componentes",
		tags: ["hardware", "gaming", "placas de video"],
	},
	{
		nombre: "Disco SSD NVMe 2TB Samsung 980 Pro",
		precio: 160,
		stock: 30,
		categoria: "Componentes",
		tags: ["almacenamiento", "hardware"],
	},
]);

// READ - Consultar datos:
db.productos.find(); // Todos los documentos de la coleccion

db.productos.find({ categoria: "Electrónica" });

db.productos.findOne({ nombre: "Parlante" });

db.productos.countDocuments(); // 11 documentos

db.productos.find().sort({ precio: -1 }).limit(3); // Devuelve los 3 productos más caros (orden descendente por precio)

db.productos.find().sort({ precio: -1 }).limit(5); // Devuelve los 5 productos más caros (orden descendente por precio)

// UPDATE - Actualizar datos:
// updateOne() --> Actualizar el PRIMERO que encuentra:
db.productos.updateOne(
	{ nombre: "iPhone 15 Pro" }, // filtro exacto
	{ $set: { precio: 1500 } }, // actualiza el precio a 1500
);

// updateMany() --> Actualizar TODOS los que coincidan:
db.productos.updateMany({ categoria: "Accesorios" }, { $inc: { stock: 5 } }); // Suma 5 unidades al stock de todos los productos en la categoría "Accesorios"

// Operador $set : actualizar un campo
db.productos.updateOne({ nombre: "Silla Gamer Secretlab Titan" }, { $set: { precio: 1450 } });

//  Operador $set : actualizar varios campos
db.productos.updateOne(
	{ nombre: "Silla Gamer Secretlab Titan" },
	{ $set: { precio: 1500, descuento: 10, destacado: true } }, // los campos descuento y destacado no existian, por ende $set los va a crear
);

// NOTA: si el campo no existe, $set lo CREA, es el operador más usado

// ===== Operadores numéricos ======
// Operador $inc : incrementar o decrementar
db.productos.updateOne({ nombre: "Tablet Samsung Galaxy Tab S9" }, { $inc: { stock: 5 } }); // sumamos 5 unidades al stock

// Operador $inc :
db.productos.updateOne({ nombre: "Tablet Samsung Galaxy Tab S9" }, { $inc: { stock: -1 } }); // restamos 1 unidad al stock

// Operador $mul : multiplicar (ultil para porcentajes)
db.productos.updateOne({ nombre: "Teclado Mecánico Keychron K2" }, { $mul: { precio: 0.9 } }); // 10% descuento

// NOTA: perfecto para inventarios y cálculos

// ===== Operadores numéricos para arrays ======
// Operador $push : agregar elemento al final
db.productos.updateOne({ nombre: "iPhone 15 Pro" }, { $push: { tags: "premium" } });

// Operador $addToSet : agrega solo si no existe
db.productos.updateOne({ nombre: "iPhone 15 Pro" }, { $addToSet: { tags: "bluetooth" } });

// Operador $pull : eliminar elementos que coinciden
db.productos.updateOne({ nombre: "Placa de Video Nvidia RTX 4070" }, { $pull: { tags: "gaming" } });

// Operador $pop : eliminar primero (-1) o último (1)
db.productos.updateOne({ nombre: "Silla Gamer Secretlab Titan" }, { $pop: { tags: 1 } }); // elimina el primer elemento

// DELETE -
// deleteOne() : elimina el PRIMERO que encuentra
db.productos.deleteOne({ nombre: "Mouse Inalámbrico Logitech MX Master 3S" });

// deleteMany() : elimina TODOS los que coincidan
db.productos.deleteMany({ stock: 0 });

// IMPORTANTE:
// NUNCA usar deleteMany({}) en producción (PORQUE ELIMINA TODOS LOS DOCUMENTOS DE LA COLECCION)
// siempre verigicar con find() antes de eliminar
// usar filtros espcíficos (mejor: _id)
