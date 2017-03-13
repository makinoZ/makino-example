// 验证手机
function checkphone(phone) {
  let rule = /^1[3,4,5,7,8,9]\d{9}$/
  if (rule.test(phone)) {
    return true
  }
  return false
}

//验证邮箱
function checkMail(mail) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  if (filter.test(mail)) {
    return true
  }
  return false
}

// 验证密码安全等级
function AnalyzePasswordSecurityLevel(password) {
  var securityLevel = 0

  if (/[a-z]/.test(password)) {
    securityLevel++ //lowercase
  }
  if (/[A-Z]/.test(password)) {
    securityLevel++ //uppercase
  }
  if (/[0-9]/.test(password)) {
    securityLevel++ //digital
  }

  if(containSpecialChar(password)){
    securityLevel++ //specialcase
  }
  return securityLevel
}

// 是否含有特殊符号
function containSpecialChar(str) {
  var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
  return (containSpecial.test(str));
}


export {
  checkphone,
  checkMail,
  AnalyzePasswordSecurityLevel
}
