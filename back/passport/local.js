const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "userid", // 프론트에서 받은 데이터
                passwordField: "password",
            },
            async (userId, password, done) => {
                try {
                    const user = await User.findOne({
                        where: { userId },
                    });
                    if (!user) {
                        return done(null, false, {
                            reason: "존재하지 않는 아이디입니다!",
                        });
                    }
                    const result = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (result) {
                        return done(null, user);
                    }
                    return done(null, false, {
                        reason: "비밀번호가 틀렸습니다.",
                    });
                } catch (error) {
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};
