const server = (app) => {
    const port = 3005;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

module.exports = { server }