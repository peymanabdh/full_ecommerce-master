// controllers/authController.js
const User =require('../model/Users.js');
import OTPService from '../helpers/OTPService.js';
import { generateToken } from '../middlewares/authentication.js';
// 
export const registerUserWithOTP = async (req, res) => {
  try {
    const {phoneNumber } = req.body;
    // Generate OTP
    const otpCode = OTPService.generateOTP();
    // ذخیره سازی OTP و phoneNumber در مدل کاربر
    const user = new User({phoneNumber, otpCode });
    await user.save();
    // ارسال OTP به شماره تلفن کاربر
    await OTPService.sendOTP(phoneNumber, otpCode);
    // ایجاد و ارسال توکن JWT
    // const token = generateToken(user._id, user.isAdmin);
    res.status(201).json({ message: 'ثبت‌نام با موفقیت انجام شد. کد OTP به شماره تلفن ارسال شد.'});
  } catch (error) {
    console.error('خطا در ثبت‌نام:', error);
    res.status(500).json({ error: 'خطای سرور داخلی' });
  }
};
//
export const loginUserWithOTP = async (req, res) => {
  try {
    const { phoneNumber, otpCode } = req.body;

    // جستجوی کاربر بر اساس شماره تلفن و کد OTP
    const user = await User.findOne({ phoneNumber});

    if (!user) {
      const user = new User({phoneNumber});  
      await user.save();
      const token = generateToken(user._id);
      return res.status(201).json({ message: 'یوزر ثبت نام شد',token});
    }else{
      const token = generateToken(user._id);
      res.status(200).json({ message: 'لاگین موفقیت آمیز بود', token });
    }

    // پاک کردن کد OTP بعد از لاگین موفق
    //user.otpCode = undefined;
    //await user.save();

    // ایجاد و ارسال توکن JWT

  } catch (error) {
    console.error('خطا در ورود:', error);
    res.status(500).json({ error: 'خطای سرور داخلی' });
  }
};




export const sendOtp = async (req, res) => {
  const {phoneNumber} = req.body
  try {
    const otpCode = OTPService.generateOTP()
    const user = await User.findOne({phoneNumber}).exec()
    if(user && Object.keys(user).length){
      user.otpCode = otpCode
      user.otpExpire = 120
      await user.save()     
    }
    else{
      await User.create({phoneNumber, otpCode, otpExpire: 120})
    }
    // ارسال OTP به شماره تلفن کاربر
    await OTPService.sendOTP(phoneNumber, otpCode);
    // ایجاد و ارسال توکن JWT
    // const token = generateToken(user._id, user.isAdmin);
    res.status(201).json({ message: 'ثبت‌نام با موفقیت انجام شد. کد OTP به شماره تلفن ارسال شد.'});
    
  } catch (error) {
    
  }

}


export const verifyOtp = async (req, res) => {
  const {phoneNumber, otpCode} = req.body
  const user = await User.findOne({phoneNumber})
  if(user && Object.keys(user).length){
    if(user.otpExpire){
      if(otpCode == user.otpCode){
        const token = generateToken(user._id);
        return res.status(201).json({ message: 'یوزر ثبت نام شد', token});
      }
      else{
        // error otp is invalid
      }
    }
    else{
      // error otp expired
    }
  }
  else {
    // error user not exist
  }
}