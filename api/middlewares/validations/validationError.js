
const validationError = (res, errors) => {
    const returnErrors = errors.map(error => ({
            parameter: error.param,
            message: error.msg,
        })
    );

    return res.status(400).json({
        success: false,
        errors: returnErrors,
    });
};

module.exports = validationError;