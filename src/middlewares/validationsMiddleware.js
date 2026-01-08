const { UserSchema } = require('../validations/userValidations');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => ({
            field: detail.context.key,
            message: detail.message
        }));
        
        return res.status(422).json({
            status: 'error',
            message: 'Erro de validação',
            errors
        });
    }
    
    next();
}

module.exports = {
    validateUser: validate(UserSchema)
}
