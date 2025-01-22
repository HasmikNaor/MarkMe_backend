class AlreadyExistsErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'alreadyExists';
  }
}

module.exports = AlreadyExistsErr;
