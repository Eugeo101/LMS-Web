exports.$ = (value = "") => {
    const validators = {};
    validators.isLowerCase = () => /^[a-z]+$/.test(value);
    validators.isUpperCase = () => /^[A-Z]+$/.test(value);
    validators.isDigit = () => value * 1 == value;
    validators.isInteger = () => value % 1 === 0;
    validators.haveLowerCase = () => /[a-z]+/.test(value);
    validators.haveUpperCase = () => /[A-Z]+/.test(value);
    validators.haveDigits = () => /[0-9]+/.test(value);

    validators.haveSpecialCh = (except = [""]) => {
        except.forEach((exception) => {
            const reg = new RegExp(`${"\\" + exception}`, "g");
            value = value.replace(reg, "");
        });
        return /[\W|_]+/.test(value);
    };

    /**
     * @param {number} min */
    validators.haveMinLength = (min) => value.length >= min;
    /**
     * @param {number} max */
    validators.haveMaxLength = (max) => value.length <= max;
    /**
     * @param {number} max */
    validators.isLessThanOrEqual = (max) => value <= max;
    /**
     * @param {number} min */
    validators.isMoreThanOrEqual = (min) => value >= min;
    /**
     * @param {string|string[]} substr */
    validators.haveSubstr = (substr) => {
        return Array.isArray(substr)
            ? substr.filter((sub) => value.indexOf(sub) !== -1).length > 0
            : typeof substr == "string" && value.indexOf(substr) !== -1;
    };

    return { ...validators };
};
exports.throwError = (message) => {
    throw new Error(message);
};
