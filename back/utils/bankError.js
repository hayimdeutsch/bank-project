export default class BankError extends Error {
  constructor(msg, code = 500) {
    super("Bank Error")
    this.code = code;
    this.msg = msg;
  }
}