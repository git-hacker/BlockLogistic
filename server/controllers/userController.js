const express = require('express');
const Web3 = require('web3');
const User = require('../schema/user');
const ABI = require('../const/logisticABI');

const router = express.Router();

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f329bd0acda54b87875860bdba06515a"));
const Address = '0xa29be289dDcE36B10dc50748cfCBD52FbDa851e4';

const Contract = web3.eth.contract(ABI);
const contractInstance = Contract.at(Address);

// 注册的逻辑，先检查数据库中是否有相同的身份证号
// 如果没有，则写入数据库中
const Register = (req, res) => {
    User.findOne({ id: req.body.id })
        .then((resUser) => {
            if (resUser) {
                res.send({
                    success: false,
                    error: '该账户已注册'
                })
            } else {
                const body = req.body;
                const userRegister = new User({
                    name: body.name,
                    id: body.id,
                    password: body.password,
                    is_sign: 0,
                    userType: body.userType,
                    scoreCredit: 60,
                });
                userRegister.save((err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(user);
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err);
        })
}

const Login = (req, res) => {
    User.findOne({ name: req.body.name })
        .then((resUser) => {
            if (!resUser) {
                res.send({
                    success: false,
                    error: '该账户未注册'
                })
            } else if (req.body.password === resUser.password) {
                req.session.user = resUser;
                res.json({
                    success: true,
                    message: "登录成功",
                    id: resUser.id,
                    name: resUser.name,
                    userType: resUser.userType,
                });
            } else {
                res.json({
                    success: false,
                    message: "密码错误"
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
};

const GetSession = (req, res) => {
    if (req.session.user) {
        res.json({
            session: true
        });
    } else {
        res.json({
            error: '未登陆'
        });
    }
}

const Logout = (req, res) => {
    req.session.user = null;
    res.json({
        message: '退出成功'
    });
}

const IsSign = async (req, res) => {
    if (req.session.user) {
        const user = await User.findOne({ id: req.session.user.id });
        const signUser = contractInstance.users.call(user.id);
        if (signUser[0] === '0x0000000000000000000000000000000000000000') {
            res.json({
                message: '未签约'
            });
        } else {
            res.json({
                message: '已签约',
            });
        }
    }
    // console.log('req.session.user', req.session.user);
}
// 将is_sign更新为1，表示已经签约
const updateSign = async (req, res) => {
    const user = await User.update({ id: req.body.id }, { is_sign: 1 })
    res.json({
        message: '保存成功',
    });
}

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/issign', IsSign);
router.post('/updateSign', updateSign);
router.get('/', GetSession);

module.exports = router;