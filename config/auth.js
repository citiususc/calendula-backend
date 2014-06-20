// auth settings
module.exports = {

    enabled : true,

    SALT_WORK_FACTOR : 10,

    SECRET_KEY : "MAKE_THIS_SECRET_RANDOM",     // server secret key
    TIME_STEP  : 30 * 24 * 60 * 60,             // 30 daysh in seconds
    exceptions : ["/login", "/register"]
};
