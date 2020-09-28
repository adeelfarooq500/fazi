
const jwt = require('jsonwebtoken');
const becrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const User = require('../model/user');

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
        let loadedUser;
        User.findOne({ where: { email: email, isActive: true } })
            .then(user => {
                if (!user) {
                    return res.status(200).json({ msg: 'Email is invalid',hasError:true });
                }
                // if (user) {
                //     if (user.isSuspend) {
                //         return res.status(401).json({
                //             msg: 'Your Account was Suspended'
                //         })
                //     }
                // }
                loadedUser = user;
                return becrypt.compare(password, user.password);
            }).then(isEqual => {
                console.log(isEqual)
                if (isEqual) {
                    // let payload = { id: loadedUser.id };
                    let token = jwt.sign(loadedUser.id, 'abc');

                    // res.cookie('jwt', token);
                    return res.status(200).json({ msg: 'Successfull login', jwt: token,id:loadedUser.id, hasError: false });
                }

                else {
                    return res.status(200).json({ msg: 'password is invalid', hasError: true });
                }
            }).catch(err => console.log(err));
    } else {
        console.log('else runn');
        return res.status(200).json({ msg: 'password is invalid', hasError: true });
    }

}
// Post Signup
exports.postSignup = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // console.log(firstName + ' ' + lastName + ' ' + email + ' ' + password);
    getUser({ email: email }).then(user => {
        if (!user) {
            becrypt.hash(password, 12)
                .then(hashedPassword => {
                    // let userTypeId;
                    return findClientUserType().then(type => {
                        // userTypeId = type.id;
                        const userObj = new User({
                            id: uuid(),
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: hashedPassword,

                            isActive: true,

                            userType:'client',
                            createdOn: Date(Date.now()),
                            modifiedOn: Date(Date.now())
                        });
                        return userObj.save();
                    });
                }).then(result => {
                    return res.status(201).json({ msg: 'signup successfully.',hasError:false });
                })
        } else {
            return res.json({ msg: 'Email Already Exits!...'+''+email,hasError:true });
        }
    })
        .catch(err => {
            res.status(501).send('Error ' + err);
        });
}
const findClientUserType = async () => {
    return await User.findOne({ where: { userType: 'client' } });
}
exports.getUsers = (req, res, next) => {
    getAllUsers().then(users => {
        return res.status(200).json(users);
    });
};
const getAllUsers = async () => {
    return await User.findAll({ where: { isActive: true } });
};
