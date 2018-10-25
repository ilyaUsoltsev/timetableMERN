const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateKlassesInput(data){
    let errors = {};

    //making null input an empty string for the required fields
    data.klassName = !isEmpty(data.klassName) ? data.klassName : '';

    if(Validator.isEmpty(data.klassName)){
        errors.klassName = 'Введите имя для класса (например, 10Б)'
    };

    return {
        errors,
        isValid: isEmpty(errors)
    }
};