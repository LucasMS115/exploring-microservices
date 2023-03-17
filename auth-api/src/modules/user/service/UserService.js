import UserRepository from "../repository/UserRepository.js";
import UserException from "../exception/UserException.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";

class UserService {

    async findByEmail(req) {
        console.info("[findByEmail] Starting find by email");

        try {
            const { email } = req.params;
            this.validateEmail(email);
            console.info("[findByEmail] Email validated: " + email);


            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            console.info("[findByEmail] user validated. Returning user: " + JSON.stringify(user));

            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message ? error.message : "Couldn't complete operation. Try again later."
            }
        }
    }

    validateEmail(email) {
        if (!this.emailRegexCheck(email)) {
            console.info("[validateEmail] Invalid email. Throwing user exception.");
            throw new UserException(httpStatus.BAD_REQUEST, "Invalid email: " + email);
        }
    }

    emailRegexCheck = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    validateUserNotFound(user) {
        if (!user) {
            console.info("[validateUserNotFound] User was not found. Throwing user exception.");
            throw new UserException(httpStatus.NOT_FOUND, "User not found.");
        }
    }
}

export default new UserService();