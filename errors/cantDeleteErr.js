class CantDeleteErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "CantDeleteErr";
  }
}

module.exports = CantDeleteErr;
