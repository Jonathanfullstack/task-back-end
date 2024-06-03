const notfoundError = (res) => {
    return res
        .status(404)
        .send("este dado nao foi encontrado no nosso banco de dados");
};

module.exports = {
    notfoundError,
};
