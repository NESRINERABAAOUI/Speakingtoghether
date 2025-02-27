const AbstractRepository = require("./AbstractRepository");

class ModelDocumentRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "translators" as configuration
    super({ table: "Model_Docs" });
  }

  // The C of CRUD - Create operation
  async create(model) {
    // Execute the SQL INSERT query to add a new model to the "Model_docs" table
    const [result] = await this.database.query(
      `insert into ${this.table} (Type_Doc,Languages_source,Status,Real_Path_Emplacement,Id_Client,Id_Translator) values (?, ?, ?, ?, ?, ?)`,
      [model.TypeDocument,model.LanguageSource,model.Status,model.PathUploadedFile,model.IdClient,model.idTranslator]
    );

    // Return the ID of the newly inserted client
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific translator by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where Id_Doc = ?`,
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
   async update(model) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}  SET Type_Doc=?,Languages_source=?,Status=?,Real_Path_Emplacement=?,Id_Client=?,Id_Translator=? WHERE Id_Doc = ?`,
      [model.TypeDocument,model.LanguageSource,model.Status,model.PathUploadedFile,model.IdClient,model.idTranslator]
    );
    return result;
   }

  // The D of CRUD - Delete operation
  
  async delete(id) {
    const [result] = await this.database.query(
     `DELETE FROM ${this.table} where Id_Doc = ?`,[id]
   );

   return result;
 }

}

module.exports = ModelDocumentRepository;
