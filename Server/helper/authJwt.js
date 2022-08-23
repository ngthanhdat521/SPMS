const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const database = require("../db/postgresql/PostgreSQL");
const getRoles = require("./getRole");
const {
    TokenExpiredError
} = jwt;

const catchError = (err, res) => {
    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
            message: "Unauthorized! Access Token was expired!"
        });
    }

    return res.sendStatus(401).send({
        message: "Unauthorized!"
    });
}


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    database.User.findByPk(req.body.userId).then(async account => {

        const roleUser = await getRoles(account.userId);
        for (let i = 0; i < roleUser.length; i++) {
            if (roleUser[i] === "admin") {
                next();
                return;
            }
        }
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    });
};

const isStudent = (req, res, next) => {
    database.User.findByPk(req.body.userId).then(async account => {

        const roleUser = await getRoles(account.userId);
        for (let i = 0; i < roleUser.length; i++) {
            if (roleUser[i] === "student") {
                next();
                return;
            }
        }
        res.status(403).send({
            message: "Require student Role!"
        });
        return;
    });
};



const isMentor = (req, res, next) => {
    database.User.findByPk(req.body.userId).then(async account => {

        const roleUser = await getRoles(account.userId);
        for (let i = 0; i < roleUser.length; i++) {
            if (roleUser[i] === "mentor") {
                next();
                return;
            }
        }
        res.status(403).send({
            message: "Require mentor Role!"
        });
        return;
    });
};


const isEvaluator = (req, res, next) => {
    database.User.findByPk(req.body.userId).then(async account => {

        const roleUser = await getRoles(account.userId);
        for (let i = 0; i < roleUser.length; i++) {
            if (roleUser[i] === "evaluator") {
                next();
                return;
            }
        }
        res.status(403).send({
            message: "Require evaluator Role!"
        });
        return;
    });
};





const isModerator = (req, res, next) => {
    database.User.findByPk(req.body.userId).then(async account => {
        const roleUser = await getRoles(account.userId);
        for (let i = 0; i < roleUser.length; i++) {
            if (roleUser[i] === "moderator") {
                next();
                return;
            }
        }
        res.status(403).send({
            message: "Require moderator Role!"
        });
        return;
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isMentor: isMentor,
    isModerator: isModerator,
    isStudent: isStudent,
    isEvaluator: isEvaluator,
    catchError
};
module.exports = authJwt;