import Users from "../models/user.model.js";

const auth = (req, res, next) => {
  let token = req.cookies.jw_auth;

  // console.log(token);

  Users.findByToken(token, (err, user) => {
    if (err) return err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

export default auth;
