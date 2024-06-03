const notAllowedFieldsToUpdateErrors = (res) => {
    return res
        .status(500)
        .send("Um ou mais campos inseridos nao sao editaveis.");
};

module.exports = {
    notAllowedFieldsToUpdateErrors,
};
