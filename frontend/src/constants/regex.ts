export const regexConstant = {
    EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    PHONE: /^((8|\+[0-9])[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{5,}$/,
};