const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    //making null input an empty string for the required fields
    data.email = !isEmpty(data.email) ? data.email : '';
    data.daysPerWeek = !isEmpty(data.daysPerWeek) ? data.daysPerWeek : '';
    data.lessonsPerDay = !isEmpty(data.lessonsPerDay) ? data.lessonsPerDay : '';

    if(!Validator.isLength(data.schoolName, {min:2, max:30})){
        errors.schoolName = 'От 2 до 30 символов.'
    };

    if(Validator.isEmpty(data.schoolName)){
        errors.schoolName = 'Введите название школы'
    };

    if(Validator.isEmpty(data.daysPerWeek)){
        errors.password = 'Введите число учебный дней в неделе'
    };

    if(Validator.isEmpty(data.lessonsPerDay)){
        errors.password = 'Введите максимальное число уроков в день'
    };

    return {
        errors,
        isValid: isEmpty(errors)
    }
};