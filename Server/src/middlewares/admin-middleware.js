import dotenv from "dotenv";
dotenv.config({path: './.env'});

const adminMiddleware = (req, res, next) => {
    try {
        const isAdminMail =
          req.user.email === process.env.AdminMail ||
          req.user.email === process.env.SuperAdminMail
            ? true
            : false; ;
        // console.log(isAdminMail);
        if(!isAdminMail){
            return res.status(403).json({msg: "Access Denied! You are not an admin!"});
        }

        next();
    } catch (error) {
        next(error);
    }

}

export {adminMiddleware};