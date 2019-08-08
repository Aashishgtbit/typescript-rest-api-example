import * as Joi from "@hapi/joi";

const userJoiSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

export default userJoiSchema;
