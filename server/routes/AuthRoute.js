const {
  Signup,
  Login,
  checkAuth,
  logout,
} = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);

router.get("/me", checkAuth);
router.post("/logout", logout);

module.exports = router;
