const customer_base = require('@playwright/test');

exports.cust_data = customer_base.test.extend({
        fetch_crd: {
            ApplicantEmail: "email@gmail.com",
            ApplicantPhone: "password"
        },
    }
)

