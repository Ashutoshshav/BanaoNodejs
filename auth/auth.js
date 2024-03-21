const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const JWT_SECRET = "Banao";

const verifyToken = async (req, res, next) => {
        const token = req.cookies.token;
    
        if (!token) {
            return res.redirect('/login');
        }
    
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.redirect('/login');
            }
            req.user = decoded;
            next();
        });
};

module.exports = {
        verifyToken,
}