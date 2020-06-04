module.exports = (req, res, next) => {
    if (req.session && req.session.loggedin) {
        next();
    } else {
        res.status(401).json({ message: 'please logged in' });
    }
}