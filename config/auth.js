// auth settings
module.exports = {

    enabled : false,

    SECRET_KEY : "MAKE_THIS_SECRET_RANDOM",     // server secret key
    TIME_STEP  : 30 * 24 * 60 * 60,             // 30 daysh in seconds
    exceptions : ["/login", "/register"]
};
