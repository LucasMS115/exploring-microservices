class UserException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
        console.log(this.constructor)
        Error.captureStackTrace(this.constructor);
    }
}

export default UserException;