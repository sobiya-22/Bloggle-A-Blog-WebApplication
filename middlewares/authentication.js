import User from '../models/userAccess.js';


async function comparePasswords(email, password) {
    const user = await User.findOne({ email });
    const storedPass = user.password;
    if (password === storedPass) {
        return true;
    }
    else return false;
}

export default comparePasswords;