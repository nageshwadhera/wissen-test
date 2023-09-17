export const EMAIL_REGEX = "^[a-z._0-9]+@[a-z]+\\.[a-z]{2,3}$";
export const CHECKREG = (regex, value) => {
    const Reg = new RegExp(regex);
    return Reg.test(value);
  };