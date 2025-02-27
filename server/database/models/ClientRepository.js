const AbstractRepository = require("./AbstractRepository");

class ClientRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "client" as configuration
    super({ table: "clients" });
  }

  // The C of CRUD - Create operation
  async create(client) {
    // Execute the SQL INSERT query to add a new client to the "clients" table
    const [result] = await this.database.query(
      `insert into ${this.table} (Email, Password,FirstName,LastName,NumberPhone) values (?, ?, ?, ?, ?)`,
      [client.Email, client.Password, client.FirstName, client.LastName, client.NumberPhone]
    );

    // Return the ID of the newly inserted client
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific client by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where Id_Client = ?`,
      [id]
    );

    // Return the first row of the result, which represents the client
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all clients from the "CLIENTS" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of clients
    return rows;
  }

  // The U of CRUD - Update operation
  async update(client) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}  SET Email =?,FirstName =?,LastName =?,NumberPhone =? WHERE Id_Client = ?`,
      [client.email, client.firstName, client.lastName, client.phone, client.userId]
    );
   if(result.affectedRows > 0){
    return this.read(client.userId)
   }
    return result;
  }

  async updateClient(client) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}  SET Email =?, FirstName =?,LastName =?,NumberPhone =? WHERE Id_Client = ?`,
      [client.Email, client.FirstName, client.LastName, client.NumberPhone, client.IdClient]
    );
    return result;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} where Id_Client = ?`, [id]
    );

    return result;
  }

  async findOne(Email) {
    const [row] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE Email = ?`,
      [Email]
    );

    return row[0];
  }

}

module.exports = ClientRepository;
