const mailStringCheck = async (email:string): Promise<any> =>{
  // @ işareti kontrolü
  if (email.indexOf("@") === -1) {
    return false;
  }

  // boşluk kontrolü
  if (/\s/.test(email)) {
    return false;
  }

  // uzunluk kontrolü
  if (email.length < 5) {
    return false;
  }

  // geçerli bir mail adresi olduğunu doğrula
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default mailStringCheck;
