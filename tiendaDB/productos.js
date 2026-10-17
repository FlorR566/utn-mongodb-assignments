use("tiendaDB");

db.productos.drop(); // limpia la colección (util en pruebas repetibles)

// insertamos 2 productos:
db.productos.insertMany([
	{
		nombre: "Teclado Mecánico Redragon",
		precio: 65000,
		stock: 15,
		tags: ["gaming", "perifericos"],
	},
	{
		nombre: "Mouse Inalámbrico Logitech",
		precio: 20000,
		stock: 30,
		tags: ["perifericos", "oficina"],
	},
]);

// actualizamos el stock del teclado mecánico:
db.productos.updateOne(
	{ nombre: "Teclado Mecánico Redragon" }, // filtro exacto
	{ $set: { stock: 7 } }, // actualiza el stock a 7 unidades
);

// otra forma de actualizar por id:
// db.productos.updateOne(
// 	{ _id: ObjectId("6ad21e183e29349d2872fc51") }, // filtro exacto por id
// 	{ $set: { stock: 7 } }, // actualiza el stock a 7 unidades
// );

// agregamos la etiqueta "RGB" al array "tags":
db.productos.updateOne({ nombre: "Teclado Mecánico Redragon" }, { $addToSet: { tags: "RGB" } });

// eliminamos el tag "oficina":
db.productos.updateOne({ nombre: "Mouse Inalámbrico Logitech" }, { $pull: { tags: "oficina" } });

// Creación Indice Simple
db.productos.createIndex({ precio: 1 }); // crea el index -> precio_1

// busca productos con precio > 40000
db.productos.find({ precio: { $gt: 40000 } }); // usa el index y devuelve solo el Teclado Mecánico

// creación de Indice Compuesto (siguiendo el principio de index prefixing)
db.productos.createIndex({ nombre: 1, precio: 1 }); // crea el index ->

// revisión con explain("executionStats");
db.productos.find({ tags: "gaming" }).explain("executionStats"); // para confirmar que el índice fué
// utilizado correctamente debería verce IXSCAN (uso de un índice). Ahora se ve COLLSCAN, no se usó un índice.

// pipeline que devuelve el stock total de todos los productos y el precio promedio general
db.productos.aggregate([
	{
		$group: {
			_id: null,
			stock_total: { $sum: "$stock" },
			_id: null,
			precio_promedio_general: { $avg: "$precio" },
		},
	},
]);
