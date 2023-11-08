const validation = (schema) => {
    return async (req, res, next) => {
        const body = req.body;
        try {
            await schema.validate(body, { abortEarly: false }); // Collect all validation errors
            next(); 
        } catch (error) {
            const errors = error.inner.map(err => err.message); // Extract error messages
            res.status(400).json( {"errors":errors});
        }
    };
};

module.exports = validation;