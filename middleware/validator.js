const joiValidation = require("@hapi/joi");

exports.singUpVlidator = async (req, res, next) => {
  const Schema = joiValidation.object({
    firstName: joiValidation
      .string()
      .required()
      .min(3)
      .trim()
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      .messages({
        "any.required": "please provide firstName",
        "string.empty": "firstName cannot be empty",
        "string.min": "the minium name must be at least 3 character long",
        "string.pattern.base": "first name should only contain letters",
      }),
    lastName: joiValidation
      .string()
      .required()
      .min(3)
      .trim()
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      .messages({
        "any.required": "please provide lastName",
        "string.empty": "lastName cannot be empty",
        "string.min": "the minium name must be at least 3 character long",
        "string.pattern.base": "first name should only contain letters",
      }),
    // surnName: joiValidation
    //   .string()
    //   .required()
    //   .min(3)
    //   .trim()
    //   .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    //   .messages({
    //     "any.required": "please provide surnName",
    //     "string.empty": "surnName cannot be empty",
    //     "string.min": "the minium name must be at least 3 character long",
    //     "string.pattern.base": "first name should only contain letters",
    //   }),

    email: joiValidation
    .string()
    .email()
    .min(7)
    .required()
    .messages({
      "any.required": "please provide your email address",
      "string.empty": "email cannot be empty",
      "string.email":
        "invalid email format. please enter a valid email address",
    }),

    password: joiValidation
      .string()
      .required()
      .min(8)
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
          "string.min":"password must be 8 characters long",
        "string.empty": "Password cannot be empty",
      }),
    address:joiValidation.string().required(),
        //age:joiValidation.number().required().integer(),
        sex:joiValidation.string().required().valid("male","female").messages({
          "any.only": "Sex must be either 'male' or 'female'.",
          "string.empty": "Sex is required.",
          "any.required": "Sex is required."
        }),
        phoneNumber:joiValidation.string().regex(/^\d{11}$/).message('Phone number must be exactly 11 digits, check if you are not adding space.'),
        //state:joiValidation.string().required().regex(/^[A-Za-z]+$/),
        // LGA:joiValidation.string().required().regex(/^[A-Za-z]+$/),
      //   dateOfBirth: joiValidation.string()
      //   .required()
      //   .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/)
      //   .messages({
      //     'string.pattern.base': 'Date of birth must be in the format DD/MM/YYYY.',
      //     'any.required': 'Date of birth is a required field.'
      // }),
      //userID: joiValidation.number().integer()
        
      })
      
        const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

exports.FarmerSingUpValidator = async (req, res, next) => {
  const Schema = joiValidation.object({
    firstName: joiValidation
      .string()
      .required()
      .min(3)
      .trim()
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      .messages({
        "any.required": "please provide firstName",
        "string.empty": "firstName cannot be empty",
        "string.min": "the minium name must be at least 3 character long",
        "string.pattern.base": "firstName should only contain letters",
      }),

      lastName: joiValidation
      .string()
      .required()
      .min(3)
      .trim()
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      .messages({
        "any.required": "please provide lastName",
        "string.empty": "lastName cannot be empty",
        "string.min": "the minium name must be at least 3 character long",
        "string.pattern.base": "lastName should only contain letters",
      }),

    email: joiValidation
    .string()
    .email()
    .min(7)
    .required()
    .messages({
      "any.required": "please provide your email address",
      "string.empty": "email cannot be empty",
      "string.email":
        "invalid email format. please enter a valid email address",
    }),
    password: joiValidation
      .string()
      .required()
      .min(8)
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
          "string.min":"password must be 8 characters long",
        "string.empty": "Password cannot be empty",
      }),
    
    address:joiValidation.string().required(),
        //age:joiValidation.number().required().integer(),
        //sex:joiValidation.string().required().valid("male","female"),
        phoneNumber:joiValidation.string().regex(/^\d{11}$/).message('Phone number must be exactly 11 digits'),
        //state:joiValidation.string().required().regex(/^[A-Za-z]+$/),
        // LGA:joiValidation.string().required().regex(/^[A-Za-z]+$/),
      //   dateOfBirth: joiValidation.string()
      //   .required()
      //   .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/)
      //   .messages({
      //     'string.pattern.base': 'Date of birth must be in the format DD/MM/YYYY.',
      //     'any.required': 'Date of birth is a required field.'
      // }),
      businessLicenseNo: joiValidation.string().required().regex(/^(RC|BN)?\d{7}$/)

      .message({
      "string.pattern.base":'businessLicenceNo must be 7 digits. FORMAT:RC or BN then your 7 digits number follows or just your 7 digits number, e.g:RC1234567 or 1234567',
      "string.empty": "businessLicenseNo cannot be empty",}),
        })
      
        const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};
  


exports.logInValidator = async (req, res, next) => {
  const Schema = joiValidation.object({
    email: joiValidation.string().email().min(7).required().messages({
      "any.required": "please provide your email address",
      "string.empty": "email cannot be empty",
      "string.email":"invalid email format. please enter a valid email address",
    }),
    //userID:joiValidation.number().integer().required(),
    password: joiValidation
      .string()
      .required()
      .min(8)
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        "string.pattern.base":
          "incorrect password",
        "string.empty": "Password cannot be empty",
        "any.required": "please provide your password",
      }),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

exports.FarmerlogInValidator = async (req, res, next) => {
  const Schema = joiValidation.object({
    email: joiValidation.string().email().min(7).required().messages({
      "any.required": "please provide your email address",
      "string.empty": "email cannot be empty",
      "string.email":"invalid email format. please enter a valid email address",
    }),
    //userID:joiValidation.number().integer().required(),
    password: joiValidation
      .string()
      .required()
      .min(8)
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        "string.pattern.base":
          "incorrect password",
        "string.empty": "Password cannot be empty",
        "any.required": "please provide your password",
      }),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};