'use strict';
let express = require('express');
let router = express.Router();
const userService = require('../services/userService');

router.post('/register', async (req, res, next) => {
  const { email, name, password } = req.body
  console.log("------------", process.env.SECRET_KEY);
  console.log(JSON.stringify(req.body));
  let newUser = {
    email,
    name,
    password
  }
  try {
    const token = await userService.create(newUser)
    newUser.token=token
    newUser.password = undefined
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).send({message:"loi roi",error})
  }
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try{

    const user = await userService.findByCredentials(email,password)
    if(!user){
      const result = {name: user.name, token: userService.generateAuthToken(user)}
      res.status(200).json(result)
    }
    else{
      res.status(401).send({error:"email or password is not correct"})
    }
  }catch(error){
    res.status(400).send({message:"loi roi",error})
  }
})

// router.post('/refresh_token', async (req, res) => {
//   // User gửi mã Refresh token kèm theo trong body
//   const { refreshToken } = req.body;
//   // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
//   if ((refreshToken) && (refreshToken in tokenList)) {
//     try {
//       // Kiểm tra mã Refresh token
//       await 
//       verifyJwtToken(refreshToken, config.refreshTokenSecret);
//       // Lấy lại thông tin user
//       const user = tokenList[refreshToken];
//       // Tạo mới mã token và trả lại cho user
//       const token = jwt.sign(user, config.secret, {
//         expiresIn: config.tokenLife,
//       });
//       const response = {
//         token,
//       }
//       res.status(200).json(response);
//     } catch (err) {
//       console.error(err);
//       res.status(403).json({
//         message: 'Invalid refresh token',
//       });
//     }
//   } else {
//     res.status(400).json({
//       message: 'Invalid request',
//     });
//   }
// });

// router.post('/login', async (req, res, next) => {
//   try {
//     const { password } = req.body
//     const email = req.body.email || ""
//     const username = req.body.username || ""

//     const user = await (email !== "" ? userService.findOne({ email }) : userService.findOne({ username }))
//     console.log('---------------------', user);
//     if (!user) {
//       res.status(401).json({ message: 'Authentication failed. User not found.' });
//     } else if (user) {
//       if (!userService.checkPassword(user, password)) {
//         res.status(401).json({ message: 'Authentication failed. Wrong password.' });
//       } else {
//         return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ message: 'something wrong try again!!' });
//   }
// })


// const verifyJwtToken= (token, secretKey) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(decoded);
//     });
//   });
// }
module.exports = router