const express = require('express')
const router = express.Router()
const DBSchema = require('./Users')
// Get all Users
router.get('/', async (req, res) => {
    try {
        const Users = await DBSchema.find()
        res.json(Users)
    }catch(err){
        res.status(500).json({message : error.message});
    }
    
})

// Get one User
router.get('/:id', getUser, (req, res) => {
    res.json(res.Users);
})

// Create one User
router.post('/', async (req, res) => {
    const Users = new DBSchema({
      fullname: req.body.fullname,
      email: req.body.email,
      mobile : req.body.mobile,
      birthday : req.body.birthday,
      cmnd : req.body.cmnd,
      address : req.body.address,
      income : req.body.income

    })
  
    try {
      const newDBSchema = await Users.save()
      res.status(201).json(newDBSchema)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Update User
// router.patch('/:id',getUser, async (req, res) => {
//     if(req.body.fullname !=null){
//         res.Users.fullname = req.body.fullname;
//     }
//     if(req.body.email !=null){
//         res.Users.email = req.body.email;
//     }
//     if(req.body.mobile !=null){
//         res.Users.mobile = req.body.mobile;
//     }
//     if(req.body.address !=null){
//         res.Users.address = req.body.address;
//     }
//     if(req.body.cmnd !=null){
//         res.Users.cmnd = req.body.cmnd;
//     }
//     if(req.body.birthday !=null){
//         res.Users.birthday = req.body.birthday;
//     }
//     if(req.body.income !=null){
//         res.Users.income = req.body.income;
//     }try{
//             const updateUser = await Users.save()
//             res.json(updateUser)
//     }catch(err){
//         res.status(400).json({message : err.message})
//     }

// })

// Delete one User
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.Users.remove()
        res.json({message : "Deleted This User"})
    }catch(err)
    {
        res.status(500).json({message : err.message})
        }
})
// Update User
router.put('/:id', async (req, res) => {
  try {
    Users = await DBSchema.findById(req.params.id).exec()
      Users.set(req.body)
      var result = await Users.save();
      res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
});


async function getUser(req, res, next) {
    try {
      Users = await DBSchema.findById(req.params.id)
      if (Users == null) {
        return res.status(404).json({ message: 'Cant find User'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.Users = Users
    next()
  }
module.exports = router