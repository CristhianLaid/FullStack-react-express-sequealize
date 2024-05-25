export const handleCookies = (req, res, next) => {
    res.cookieHandler = (token) => {
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
    };

    next();
}