export default class BankError extends Error {
  constructor(msg, code = 500, cause = null) {
    super("Bank Error")
    this.code = code;
    this.msg = msg;
    this.cause = cause;
  }
}