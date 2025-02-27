const AbstractRepository = require("./AbstractRepository");

class EstimationRepository extends AbstractRepository {
  constructor() {
    super({ table: "Estimation" });
  }

  async create(estimation) {
    const result = await this.database.query(
      `insert into ${this.table} (Email,FirstClientName,LastClientName,Language_Doc) values (?, ?, ?, ?)`,
      [estimation.Email, estimation.FirstClientName, estimation.LastClientName, estimation.Language_Doc]
    );

    return result;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where Id_tarification = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async update(estimation) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}  SET Email =?, Id_Translator  =?,FirstClientName  =?,LastClientName  =?,Language_Doc  =?,Id_Doc  =? where Id_Tarification = ? `,
      [estimation.Email, estimation.Id_Translator, estimation.FirstClientName, estimation.LastClientName, estimation.Language_Doc, estimation.IdDoc, estimation.IdTarification]
    );
    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} where Id_Tarification = ?`, [id]
    );

    return result;
  }

}

module.exports = EstimationRepository;
