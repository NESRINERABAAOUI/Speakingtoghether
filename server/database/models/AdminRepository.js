const AbstractRepository = require("./AbstractRepository");

class AdminRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "admin" as configuration
    super({ table: "administrateur" });
  }

  // The C of CRUD - Create operation

  async create(admin) {
    // Execute the SQL INSERT query to add a new admin to the "administrateur" table
    const [result] = await this.database.query(
      `insert into ${this.table} (Email, Password,FirstName,LastName,NumberPhone) values (?, ?, ?, ?, ?)`,
      [admin.Email, admin.Password,admin.FirstName,admin.LastName,admin.NumberPhone]
    );

    // Return the ID of the newly inserted admin
    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific client by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where Id_Admin = ?`,
      [id]
    );

    // Return the first row of the result, which represents the client
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all clients from the "administrateur" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of administrateur
    return rows;
  }

  // The U of CRUD - Update operation
   async update(admin) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}  SET Email =?,FirstName =?,LastName =?,NumberPhone =? WHERE Id_admin = ?`,
      [admin.Email,admin.FirstName,admin.LastName,admin.NumberPhone,admin.IdAdmin]
    );
    return result;
   }

  // The D of CRUD - Delete operation
  
  async delete(id) {
    const [result] = await this.database.query(
     `DELETE FROM ${this.table} where Id_admin = ?`,[id]
   );

   return result;
 }

 async findOne(Email) {
  // Execute the SQL SELECT query to retrieve a specific user by its email an role
  const [rows, fields] = await this.database.query(
    `select * from ${this.table}  WHERE Email = ?`,[Email]
  );
  // Return the first row of the result, which represents the user
  return rows[0];
}
}

module.exports = AdminRepository;
