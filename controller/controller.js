import {hash, compare} from "bcrypt";

import myUser from "../database/myUser.js";
import gadget from "../database/gadget.js";

class Main {

    homePage(req, res){
        res.render('main/home', {title: "bosh sahifa"});
    }
    signupPage(req, res){
        res.render('main/signup', {title: "signup"});
    }
    signinPage(req, res){
        res.render('main/signin', {title: "signin"});
    }
    addPage(req, res){
        res.render('main/add', {title: "add gadgets "})
    }
    async telephones(req, res){
        const data = await gadget.find({example:{ $regex: '1', $options: 'i' }})
        res.render('main/list', {title: "telephones", data}) 
    }
    async computer(req, res){
        const data = await gadget.find({example:{ $regex: '0', $options: 'i' }})
        res.render('main/list', {title: "computer", data})
    }
    async headphones(req, res){
        const data = await gadget.find({example:{ $regex: '2', $options: 'i' }})
        res.render('main/list', {title: "headphones", data})
    }
    async amplifier(req, res){
        const data = await gadget.find({example:{ $regex: '3', $options: 'i' }})
        res.render('main/list', {title: "amplifier", data})
    }
    
    editPage(req, res){
        res.render('main/edit', {title: "edit gadgets "})
    }
    async signup(req,res){
        const user = await myUser.findOne({email:req.body.email});
        if(user){
        req.flash("errors", ["email exist"])
        return res.redirect("/signup");
        }else{
            req.body.password = await hash(req.body.password, 10);
            await myUser.create(req.body);
            req.flash("success", "User created");
            res.redirect("/signin")
        }
}

    async signin(req, res){
        const {email, password } = req.body;
        const user = await myUser.findOne({email});
        if(!user){
            req.flash("errors", ["User not find"])
            return res.redirect("/signin");
        }else{
            const isMach = await compare(password, user.password);
            if(isMach){
                req.session.user = user;
                return res.redirect("/")
            }else{
                req.flash("errors", ["User not find"])
                return res.redirect("/siginin")
            }
        }
    }
    async add(req, res){
        req.body.number2 = 0
            if(req.body.name !== "" && req.body.number1 > 0){
                await gadget.create(req.body);
                return res.redirect("/") 
            }else{
                req.flash("errors", ["drug nod find"]);
                return res.redirect('/add')
         }
         
        
}

logout(req, res) {
    delete req.session.user;
    res.redirect("/");
}
}

export default new Main();
