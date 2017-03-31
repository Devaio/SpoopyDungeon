import crypto = require('crypto');

class Password {
    public encrypt (password: string, unique: string){
        return crypto.createHash('sha512').update(password).digest('hex');
    }

    public compare (password : string, unique:string,  userPassword: string, cb: Function){
        

        cb(this.encrypt(password, unique) === userPassword ? true : false);
    }
}

export = new Password()