import { Router } from "express";
import Main from "../controller/controller.js";
import validaror from "../validator/validator.js";

const router = Router();

router.get('/', Main.homePage);
router.get('/signin', Main.signinPage);
router.get('/signup', Main.signupPage);
router.get('/logout', Main.logout);
router.get(`/addtelephones`, Main.addPage);
//router.get('/edit/:id', Main.editPage);
router.get('/telephones', Main.telephones);
router.get('/amplifier', Main.amplifier);
router.get('/headphones', Main.headphones);
router.get('/computer', Main.computer);
router.get('/add', Main.addPage);


router.post("/add", Main.add);
router.post("/signin",validaror.signIn, Main.signin);
router.post("/signup",validaror.signUp, Main.signup);

export default router;


