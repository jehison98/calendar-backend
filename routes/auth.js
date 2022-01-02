/* 
User routes / Auth
host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fields-validator");
const { createUser, loginUser, revalidToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/jwt-validator");

const router = Router();

router.post(
  "/new",
  [
    //Middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La password debe contoner minimo 6 caracteres").isLength(
      { min: 6 }
    ),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    //Middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La password debe contoner minimo 6 caracteres").isLength(
      { min: 6 }
    ),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidToken);

module.exports = router;
