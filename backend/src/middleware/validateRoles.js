module.exports = function validateRoles(roles) {
    return function(req, res, next) {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                errror: 'You are unauthorized to access this resource.'
            });
        }
        next();
    };
};
