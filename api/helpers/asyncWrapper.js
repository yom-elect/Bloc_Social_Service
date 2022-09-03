const asyncWrapper = (requestHandler) => {
    return async(req, res) => {
        try {
            await requestHandler(req, res);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};

module.exports = asyncWrapper;