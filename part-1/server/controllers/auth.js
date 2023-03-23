
const bcrypt = require(`bcryptjs`)

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for(let i = 0; i < users.length; i++){
        if(users[i].username === username){
          let existingPassword = bcrypt.compareSync(password, users[i].pinHash)

          if(existingPassword) {
            let secureMessage = {...users[i]}
            delete secureMessage.pinHash
            return res.status(200).send(secureMessage)
          }
        } else {
          res.status(400).send("User not found.")
        }
      }
    },
    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body
        
        const salt = bcrypt.genSaltSync(5)
        
        const pinHash = bcrypt.hashSync(password, salt)
        
        
        let regObj = {
          pinHash, 
          username,
          email,
          firstName, 
          lastName,
        }
        
        users.push(regObj)

        res.status(200).send(regObj)

        console.log(users)



    }
}