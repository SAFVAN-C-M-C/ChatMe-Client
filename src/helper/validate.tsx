export const validateEmail=(data:string)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
}
export const validatePassword=(data:string)=>{
    return data.length>=8
}
export const validateField=(data:string)=>{
    return data.trim()!==''
}
export const validateAddress=(data:string)=>{
    return data.trim()!==''
}
export const validatePhone=(data:string)=>{
    const phoneRegex = /^\d{10}$/;

  // Test if the phone number matches the regular expression
  return phoneRegex.test(data);
}
export const validateName = (data: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(data.trim()) && data.trim().length > 0;
}

export const validateYear = (data: string) => {
    const yearRegex = /^(19|20)\d{2}$/; // Matches any year from 1900 to 2099
    const trimmedData = data.trim();
    return trimmedData.length === 4 && yearRegex.test(trimmedData);
}