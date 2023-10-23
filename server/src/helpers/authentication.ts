import bcrypt from "bcrypt";
const saltRounds = 10

const Authenticate = {
    hash: async (password) => {
        return bcrypt.genSalt(saltRounds)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => ({result: hash, error: false}))
            .catch(err => ({result: err.message, error: true}));
    },
    verify: async (clientPassword, storedHash) => {
        bcrypt
        .compare(clientPassword, storedHash)
        .then( async res => {
          if(res){
            return {result: true, error: false}
          }else{
            return {result: "Could not validate password", error: true}
          }
        })
        .catch(err => {
            return {result: err.message, error: true}
        })    
    }
};
export {Authenticate}