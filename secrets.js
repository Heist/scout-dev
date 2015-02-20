// secrets.js
// nodemon server --watch /public --watch /server


var config_data = module.exports = {
    // app.locals.real_url = 'app.fieldguide.com'; // THIS IS FOR EMAILS
    // real_url = process.env.FIELD_GUIDE_BASEURL || '104.236.16.159:'+port,
    secret: '$2a$10$Zl85yFNH6JVtlF0thUHete0BH80QbOpGw0lMJmN86mI8tnejLHKE4NrAUVgEtpUdOjMOXC3F9dW35FXI7TybjxnQ6tQl5UmOiNcqXg4Uz9QG67hXAY2G5At1yaBtvcEFeYVUnsKLW2aHU5VRT1FjMlIF07220mBhkCOZ6GgWDz48DcDwowNHKelzHqvpIy8tyBl3GYBK2h6FT8xiGRddV49pFRmCSRlKZOoBQuNQlvcTIC3JpRHFWW1V2NHCxjWfrEzZvYauyhkR0MZ1oNFiDPB8TdrWxPJph2j6U3aBqHlyrCP3Ty70jqAdxCCuAbCLfF9Csf2pViqOvwJqIObR4ZNhZCfdsNn9KcNMRLCEZ6OuqO1tKuI5tsz5Ax4bo96EMjSuSmJeO07YY40W2G9JmOyIpRTlOcvPUZFmkrkQwhpEDNvRE9bAh7fauXP8AQWS1Rl0EZQ3Yg1qVnCf9snkZoBdY2UCxrDDLLjyxL5xojvpELZvMxHPiqTp99SRz8St3aoc0mGPxAOx5ykFoMfzQ98Zdknk8CU5LQkfoKhSQIxqUcOmUZx',
    cookie_name: 'connect.sid',
    stripeSecret: 'sk_test_IaKQLgGmIQ4mDatJVhOlmVw4',
    mandrillSecret: 'bMsKb-GUxBkpBbIBJ4XW4g'
};