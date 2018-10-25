const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};

    //making null input an empty string for the required fields
    data.schoolName = !isEmpty(data.schoolName) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)){
        errors.email = 'Неправильный email'
    };

    if(Validator.isEmpty(data.email)){
        errors.email = 'Введите email'
    };

    if(Validator.isEmpty(data.password)){
        errors.password = 'Введите пароль'
    };

    return {
        errors,
        isValid: isEmpty(errors)
    }
};