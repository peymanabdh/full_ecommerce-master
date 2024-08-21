const Joi = require('joi');

// تعریف اسکیما با استفاده از Joi و پیام‌های خطای سفارشی
const productSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(100)
    .messages({
      'string.base': 'عنوان باید یک رشته باشد.',
      'string.empty': 'عنوان الزامی است.',
      'string.min': 'عنوان باید حداقل ۳ کاراکتر باشد.',
      'string.max': 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.',
    }),
  
  slug: Joi.string()
    .required()
    .min(3)
    .max(100)
    .messages({
      'string.base': 'نامک باید یک رشته باشد.',
      'string.empty': 'نامک الزامی است.',
      'string.min': 'نامک باید حداقل ۳ کاراکتر باشد.',
      'string.max': 'نامک نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.',
    }),
  
  image: Joi.string()
    .uri()
    .required()
    .messages({
      'string.base': 'آدرس تصویر باید یک رشته باشد.',
      'string.empty': 'آدرس تصویر الزامی است.',
      'string.uri': 'آدرس تصویر باید یک URL معتبر باشد.',
    }),
  
  imageAlt: Joi.string()
    .required()
    .messages({
      'string.base': 'توضیحات تصویر باید یک رشته باشد.',
      'string.empty': 'توضیحات تصویر الزامی است.',
    }),
  
  situation: Joi.string()
    .valid('published', 'draft')
    .required()
    .messages({
      'string.base': 'وضعیت باید یک رشته باشد.',
      'string.empty': 'وضعیت الزامی است.',
      'any.only': 'وضعیت باید یکی از مقادیر "published" یا "draft" باشد.',
    }),
  
  shortDescription: Joi.string()
    .required()
    .messages({
      'string.base': 'توضیحات کوتاه باید یک رشته باشد.',
      'string.empty': 'توضیحات کوتاه الزامی است.',
    }),
  
  longDescription: Joi.string()
    .required()
    .messages({
      'string.base': 'توضیحات طولانی باید یک رشته باشد.',
      'string.empty': 'توضیحات طولانی الزامی است.',
    }),
  
  tags: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'برچسب‌ها باید یک آرایه از رشته‌ها باشند.',
    }),
  
  category: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'دسته‌بندی‌ها باید یک آرایه از رشته‌ها باشند.',
    }),
  
  features: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'ویژگی‌ها باید یک آرایه از رشته‌ها باشند.',
    }),
  
  relatedProducts: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'محصولات مرتبط باید یک آرایه از رشته‌ها باشند.',
    }),
  
  price: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'قیمت باید یک عدد باشد.',
      'number.empty': 'قیمت الزامی است.',
      'number.positive': 'قیمت باید یک عدد مثبت باشد.',
    }),
  
  offprice: Joi.number()
    .positive()
    .allow(null)
    .messages({
      'number.base': 'قیمت تخفیف باید یک عدد باشد.',
      'number.positive': 'قیمت تخفیف باید یک عدد مثبت باشد.',
    }),
  
  stock: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'موجودی باید یک عدد باشد.',
      'number.integer': 'موجودی باید یک عدد صحیح باشد.',
      'number.min': 'موجودی نمی‌تواند کمتر از ۰ باشد.',
    }),
  
  variants: Joi.array()
    .items(Joi.object({
      size: Joi.string()
        .valid('small', 'medium', 'large')
        .required()
        .messages({
          'string.base': 'اندازه باید یک رشته باشد.',
          'any.only': 'اندازه باید یکی از مقادیر "small", "medium", "large" باشد.',
          'string.empty': 'اندازه الزامی است.',
        }),
      
      color: Joi.string()
        .required()
        .messages({
          'string.base': 'رنگ باید یک رشته باشد.',
          'string.empty': 'رنگ الزامی است.',
        }),
      
      price: Joi.number()
        .positive()
        .required()
        .messages({
          'number.base': 'قیمت باید یک عدد باشد.',
          'number.positive': 'قیمت باید یک عدد مثبت باشد.',
          'number.empty': 'قیمت الزامی است.',
        }),
      
      offprice: Joi.number()
        .positive()
        .allow(null)
        .messages({
          'number.base': 'قیمت تخفیف باید یک عدد باشد.',
          'number.positive': 'قیمت تخفیف باید یک عدد مثبت باشد.',
        }),
      
      stock: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .messages({
          'number.base': 'موجودی باید یک عدد باشد.',
          'number.integer': 'موجودی باید یک عدد صحیح باشد.',
          'number.min': 'موجودی نمی‌تواند کمتر از ۰ باشد.',
        })
    }))
    .default([])
    .messages({
      'array.base': 'متغیرها باید یک آرایه از اشیاء باشند.',
    }),
  
  isVariable: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'محصول باید متغیر یا غیر متغیر باشد.',
      'boolean.empty': 'مشخص کردن متغیر بودن محصول الزامی است.',
    })
});

module.exports = productSchema;
