export const isValidCardNumber = (number) => {
    // Implement Luhn Algorithm for card number validation
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    return sum % 10 === 0;
  };
  
  export const isValidExpiryDate = (date) => {
    const [month, year] = date.split('/').map(Number);
    if (!month || !year) return false;
    if (month < 1 || month > 12) return false;
  
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
  
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
  
    return true;
  };
  
  export const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };
  