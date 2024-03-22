const { userService } = require("../services");
const { hashData, compareData } = require("../utils/password.util");
const {
    generateAccessToken,
    blacklistToken
} = require("../utils/token.util");
const apiResponse = require("../dtos/apiResponse");
const _ = require("lodash");


const register = async (req, res) => {
    const data = { ...req.body };
    const encryptPass = hashData(data.password);
    const registerUser = {
        name: data.name,
        email: data.email,
        password: encryptPass,
    };
    try {
        const user = await userService.findOneByEmail(data.email)
        if (user) return apiResponse.notFoundResponse(res, "Email already exists");
        await userService.create(registerUser)
        return apiResponse.successResponse(
            res,
            "User account created."
        );
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const login = async (req, res) => {
    const data = { ...req.body };
    try {
        const user = await userService.findOneByEmail(data.email);
        if (_.isNil(user))
            return apiResponse.notFoundResponse(res, "Email not found");
        const passwordIsValid = compareData(data.password, user.password);
        if (!passwordIsValid)
            return apiResponse.validationErrorWithData(
                res,
                "Invalid password provided"
            );

        const accessToken = generateAccessToken(user._id);
        const profile = await userService.findFilter(
            { _id: user._id },
            "-password"
        );

        return apiResponse.successResponseWithData(res, "login successfully", {
            accessToken: accessToken || '',
            profile: profile,
        });
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const updateUser = async (req, res, next) => {
    const id = req.id;
    const data = req.body;
    try {
        const [isId] = await Promise.all([
            userService.findOneById(id),
            userService.updateById(id, data),
        ]);
        if (!isId) return apiResponse.notFoundResponse(res, "User not found");
        return apiResponse.successResponse(res, "User updated successfully");
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [isId] = await Promise.all([
            userService.findOneById(id),
            userService.deleteById(id),
        ]);
        if (!isId) return apiResponse.notFoundResponse(res, "User not found");
        return apiResponse.successResponse(res, "User deleted successfully");
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};


const getProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await userService.findFilter({ _id: userId }, "-password");
        return apiResponse.successResponseWithData(
            res,
            "get profile successfully",
            data
        );
    } catch (err) {
        console.error(err);
        return apiResponse.ErrorResponse(res, err.message);
    }
};


const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        await blacklistToken(token);
        return apiResponse.successResponse(res, "Logout Successfully")
    } catch (error) {
        return apiResponse.ErrorResponse(res, error.message);
    }
}

module.exports = {
    register,
    login,
    getProfile,
    updateUser,
    deleteUser,
    logout
};
