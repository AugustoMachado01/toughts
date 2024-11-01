const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    console.log(email, password);

    //find user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuário não encontrado!");

      res.render("auth/login");

      return;
    }
    //check if passwords match

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "invalida!");

      res.render("auth/login");

      return;
    }

    try {
      //inicializar a session
      req.session.userid = user.id;

      req.flash("message", "Autenticação realizada com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    console.log(name, email, password, confirmpassword);

    // password match validation
    if (password !== confirmpassword) {
      req.flash("message", "As senhas são diferente, tente novamente!");

      res.render("auth/register");

      return;
    }

    //check if user exists

    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash("message", "O email já está em uso!");

      res.render("auth/register");

      return;
    }

    //create a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createUser = await User.create(user);

      //inicializar a session

      req.session.userid = createUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(req, res) {
    req.session.destroy();

    res.redirect("/login");
  }
};
