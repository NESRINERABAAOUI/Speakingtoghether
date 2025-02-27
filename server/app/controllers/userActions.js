const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tables = require("../../database/tables");
const jwtSecretKey = process.env.JWT_SECRET_TOKEN;

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.user.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const userBody = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.user.create(userBody);
    console.log(req.body);
    // Respond with HTTP 201 (Created) user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the user data from the request body
  const userBody = req.body;

  try {
    // modifiey the user in the database
    const modifiedId = await tables.user.update(userBody);

    // Respond with HTTP 200 (updated) user
    res.status(200).json({ modifiedId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the user id from the request params
  const userId = req.params.id;

  try {
    // Insert the user into the database
    const deletedId = await tables.user.delete(userId);

    // Respond with HTTP 204 (deleted) user
    res.status(204).json({ deletedId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Handling login
const login = async (req, res) => {
  const { Email, Password } = req.body;
  let RoleUser;

  try {
    let user;
    // Vérifier si l'utilisateur est un client
    user = await tables.client.findOne(Email);
    if (user) RoleUser = "C";

    // Si pas trouvé, vérifier si c'est un traducteur
    if (!user) {
      user = await tables.translator.findOne(Email);
      if (user) RoleUser = "T";
    }

    // Si pas trouvé, vérifier si c'est un admin
    if (!user) {
      user = await tables.admin.findOne(Email);
      if (user) RoleUser = "A";
    }

    // Si aucun utilisateur trouvé
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Incorrect password.",
      });
    }

    const payload = {
      userId: user.Id_Client || user.Id_Translator || user.Id_admin,
      email: user.Email,
      roleUser: RoleUser,
    };

    const token = jwt.sign(payload, jwtSecretKey, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    return res.status(200).json({
      success: true,
      data: {
        userId: payload.userId,
        email: user.Email,
        firstName: user.FirstName,
        lastName: user.LastName,
        phoneNumber: user.NumberPhone,
        roleUser: RoleUser,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Error during login process." });
  }
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const signup = async (req, res, next) => {
  const {
    Email,
    RoleUser,
    Password,
    FirstName,
    LastName,
    NumberPhone,
    Language,
  } = req.body;

  const hash = await hashPassword(Password);
  const user = {
    Email,
    RoleUser,
    Password: hash,
    FirstName,
    LastName,
    NumberPhone,
    Language,
  };
  let userSpecId;
  let newUser;
  try {
    console.log(req.body);

    if (user.RoleUser === "C" || user.RoleUser === "") {
      const existingUser = await tables.client.findOne(Email);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exits" });
      }
      newUser = await tables.client.create(user);
      userSpecId = newUser.Id_Client;
    } else if (user.RoleUser === "T") {
      const existingUser = await tables.translator.findOne(Email);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exits" });
      }

      newUser = await tables.translator.create(user);
      userSpecId = newUser.Id_Translator;
    }
  } catch (err) {
    console.log(err.message)
    return res
      .status(500)
      .json({ success: false, message: "Error creating user" });
  }

  let token;
  try {
    const payload = {
      userId: userSpecId,
      email: user.Email,
    };

    token = jwt.sign(payload, jwtSecretKey, {
      algorithm: "HS256",
      expiresIn: "24h",
    });
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  return res.status(201).json({
    success: true,
    data: {
      userId: userSpecId,
      email: newUser.Email,
      roleUser: user.RoleUser,
      token,
    },
  });
};

const updateClient = async (req, res, next) => {
  const { firstName, lastName, email, phone, role, userId } = req.body;
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  const updateData = {
    Email: email,
    RoleUser: role,
    FirstName: firstName,
    LastName: lastName,
    NumberPhone: phone,
    IdClient: userId,
  };

  let updatedUser;
  try {
    if (role === "C" || role === "") {
      updatedUser = await tables.client.updateClient(updateData);
    } else if (role === "T") {
      updatedUser = await tables.translator.updateClient(updateData);
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating user" });
  }

  return res.status(200).json({
    success: true,
    data: {
      userId,
      email: updatedUser.Email,
      roleUser: updatedUser.RoleUser,
    },
  });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  signup,
  updateClient,
};
