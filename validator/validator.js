async function notEmp(req, inputName) {
    inputName.forEach(item => 
        req.check(item).notEmpty().withMessage(item[0].toUpperCase() + item.slice(1) + " must not be empty")
    );
}

async function isNum(req, inputName) {
    inputName.forEach(item => 
        req.check(item).isInt().withMessage(item[0].toUpperCase() + item.slice(1) + " must be a number")
    );
}

async function checkLengthPassword(req, inputName) {
    inputName.forEach(item => 
        req.check(item).isLength({min:8}).withMessage(item[0].toUpperCase() + item.slice(1) + " must be min:8 character")
    );
}

async function checkEmailFormat(req, inputName) {
    inputName.forEach(item => 
        req.check(item).isEmail().withMessage(item[0].toUpperCase() + item.slice(1) + " format is incorrect")
    );
}

async function errorStr(link, req, res, next) {
    const errors = await req.getValidationResult();

    if (!errors.isEmpty()) {
        const strErrors = errors.array().map(item => item.msg);
        req.flash("errors", strErrors);
        res.redirect(link);
    } else {
        next();
    }
}

class Validation {
    async signUp(req, res, next) {
        await notEmp(req, ['name', 'sure']);
        await checkLengthPassword(req, ['password'])
        await checkEmailFormat(req, ['email']);
        await errorStr("/signup", req, res, next);
    }

    async signIn(req, res, next) {
        await notEmp(req, ['password']);
        await checkEmailFormat(req, ['email']);
        await errorStr("/", req, res, next);
    }
}

export default new Validation();
