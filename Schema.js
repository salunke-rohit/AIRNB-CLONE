import Joi from 'joi';

const listingSchema = Joi.object ({
    listing : Joi.object({
        title: Joi.string()
  .pattern(/^[A-Za-z\s]+$/)
  .required(),

  price : Joi.number().min(1).required(),

description: Joi.string()
  .pattern(/^[A-Za-z\s]+$/)
  .required(),

location: Joi.string()
  .pattern(/^[A-Za-z\s]+$/)
  .required(),

  image: Joi.string()
  .uri()
  .allow("", null)
  .optional(),

country: Joi.string()
  .pattern(/^[A-Za-z\s]+$/)
  .required(),
    }).required()
})

export default listingSchema;