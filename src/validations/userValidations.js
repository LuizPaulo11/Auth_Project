const joi = require("joi");

const UserSchema = joi.object({
    name: joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'O nome é obrigatorio',
            'string.min': 'O nome deve ter no minimo 3 caracteres',
            'string.max': 'O nome deve ter no maximo 50 caracteres',
        }),

    password: joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,64}$'))
        .required()
        .messages({
            'string.empty': 'A senha é obrigatoria',
            'string.pattern.base': 'Mínimo oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
        })
});

module.exports = {
    UserSchema
}