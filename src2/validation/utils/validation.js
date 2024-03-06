const isValidName = /^[a-zA-Z\s-]+$/;
const minLength = 2;
const maxLength = 30;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Regular expression for mobile number validation (assuming 10-digit numbers)
const phoneRegex = /^\d{10}$/;
// Regular expression for password validation (at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character)
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/;

export function validateName(name) {
  if (name.length < minLength || name.length > maxLength) {
    return name == ''
      ? ''
      : `Name must be between ${minLength} and ${maxLength} characters long.`;
  } else if (!isValidName.test(name) && name !== '') {
    return 'Name must contain only letters, spaces, and hyphens.';
  } else {
    return '';
  }
}

export const validateEmail = email => {
  if (!emailRegex.test(email.toLowerCase()) && email !== '') {
    return 'Please enter a valid email address';
  } else {
    return '';
  }
};

export const validatePhoneNumber = phoneNumber => {
  if (!phoneRegex.test(phoneNumber) && phoneNumber !== '') {
    return 'Please enter a valid 10-digit phone number';
  } else {
    return '';
  }
};

export const validatePassword = password => {
  if (!passwordRegex.test(password) && password !== '') {
    return 'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character';
  } else {
    return '';
  }
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!passwordRegex.test(confirmPassword) && confirmPassword !== '') {
    return 'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character';
  } else if (password !== confirmPassword && confirmPassword !== '') {
    return 'Passwords do not match';
  } else {
    return '';
  }
};

export function checkUserDetails(userInfo) {
  var arr = [];

  for (const key in userInfo) {
    if (userInfo.hasOwnProperty(key)) {
      if (userInfo[key] !== '') {
        console.log(`${key}: Data exists`);
      } else {
        let n =
          key == 'cPassword'
            ? 'Confirm password'
            : key == 'number'
            ? 'mobile number'
            : key;

        arr.push({
          field: String(n).toLowerCase(),
          error: `${n} is required`,
        });
      }
    }
  }

  return arr;
}
