const AbstractRepository = require("./AbstractRepository");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserConnectionRepository extends AbstractRepository {
  constructor() {
    super({ table: "users_app" });
  }

  async create(user) {
    try {
      const hashedPassword = await bcrypt.hash(user.Password, saltRounds);
      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (Email, RoleUser, Pass_word) VALUES (?, ?, ?)`,
        [user.Email, user.RoleUser, hashedPassword]
      );
      return result;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error(`Error: Duplicate entry '${user.Email}' for key 'Email'`);
      }
      console.error(err);
      throw new Error('Error creating user');
    }
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE Id_User = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(user) {
    try {
      const hashedPassword = await bcrypt.hash(user.Password, saltRounds);
      const [result] = await this.database.query(
        `UPDATE ${this.table} SET Email = ?, Pass_word = ? WHERE Id_User = ?`,
        [user.Email, hashedPassword, user.IdUser]
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error updating user');
    }
  }

  async delete(id) {
    try {
      const [result] = await this.database.query(
        `DELETE FROM ${this.table} WHERE Id_User = ?`,
        [id]
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error deleting user');
    }
  }

  async findOne(obj) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE Email = ? AND RoleUser = ?`,
      [obj.Email, obj.RoleUser]
    );
    return rows[0];
  }

  // Static password handling functions
  static async codePassWord(passWord) {
    try {
      const hash = await bcrypt.hash(passWord, saltRounds);
      return hash;
    } catch (err) {
      console.error(err);
      throw new Error('Error hashing password');
    }
  }

  static async comparePassWord(passWord, passHash) {
    try {
      const ok = await bcrypt.compare(passWord, passHash);
      return ok;
    } catch (err) {
      console.error(err);
      throw new Error('Error comparing passwords');
    }
  }
}

module.exports = UserConnectionRepository;
