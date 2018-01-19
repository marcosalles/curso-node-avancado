module.exports = {
	Payment: {
		id: "bigint(20)",
		customerName: "varchar(255)",
		customerEmail: "varchar(255)",
		product: "varchar(255)",
		value: "decimal(12,2)",
		amount: "int(3)",
		discount: "decimal(12,2)",
		status: "enum('PAID','EXPIRED','FAILED','ON_HOLD')"
	}
};