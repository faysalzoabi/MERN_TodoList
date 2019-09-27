const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    //validation
    if(!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    //check for exisiting user
    try {
        const user = await User.findOne({email:email})
        if(user) {
            return res.status(409).json({msg: 'User already exist'})
        } else {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error:err
                        })
                    } else {
                        const newUser = new User({
                            name:name,
                            email:email,
                            password:hash
                        })

                        const hashedUser = await newUser.save()

                        const token = jwt.sign(
                            {
                            email:hashedUser.email,
                            id:hashedUser._id
                            }, 
                             process.env.JWT_SECRET,
                            {
                            expiresIn:'1h'
                            })

                            res.status(201).json({
                                token,
                                user:{
                                    id: hashedUser._id,
                                    name: hashedUser.name,
                                    email: hashedUser.email
                                    }
                                })
                        }
                })
        }

    }catch(err) {
        res.status(400).json({message: err.message})
    }
   
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log('backend', email, password)
    //validation
    if(!email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    try {
        const user = await User.findOne({email:email})
        if(user === null) {
            return res.status(401).json({
                msg: 'User Does not exist'
            })
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    msg:'Auth Failed'
                })
            }
            if(result) {
                const token = jwt.sign(
                    {
                    email:user.email,
                    id:user._id
                    }, 
                     process.env.JWT_SECRET,
                    {
                    expiresIn:'1h'
                    })
                
                return res.status(200).json({
                    message:'Auth Successful',
                    token:token,
                    user: {
                        id:user._id,
                        email:user.email,
                        name:user.name,
                    }
                })
            }
            res.status(401).json({
                message:'Auth failed'
            })
        })
    }catch(err) {
        res.json(500).json({
            error: err
        })
    } 
})

module.exports = router;