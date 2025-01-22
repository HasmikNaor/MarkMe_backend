
class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'document not found';
  }
}

module.exports = NotFoundErr;
