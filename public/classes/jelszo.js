const bcrypt = require('bcryptjs');
async function hashIt(password){
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
}
hashIt(password);
// compare the password user entered with hashed pass.
async function compareIt(password, hashedPassword){
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
}
/*

//const bcrypt = require('bcryptjs'); // npm i bcryptjs
const password = "12345"
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync(password, salt);
// check hash password
// bcrypt.compareSync(password, hashPassword);

//hash password
const hashedPassword = bcrypt.hashSync(yourPasswordFromSignupForm, bcrypt.genSaltSync());

//verify password
const doesPasswordMatch = bcrypt.compareSync(yourPasswordFromLoginForm, yourHashedPassword)
*/