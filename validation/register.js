const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min:2, max:30})){
        errors.name = 'Имя должно быть от 2 до 30 символов'
    };

    if(Validator.isEmpty(data.name)){
        errors.name = 'Введите имя'
    };

    if(!Validator.isEmail(data.email)){
        errors.email = 'Неправильный email'
    };

    if(Validator.isEmpty(data.email)){
        errors.email = 'Введите email'
    };

    if(!Validator.isLength(data.password, {min:6, max:30})){
        errors.password = 'Неправильный пароль. От 6 до 30 символов.'
    };

    if(Validator.isEmpty(data.password)){
        errors.password = 'Введите пароль'
    };

    if(!Validator.equals(data.password,data.password2)){
        errors.password2 = "Пароли не совпадают :("
    };

    return {
        errors,
        isValid: isEmpty(errors)
    }
};