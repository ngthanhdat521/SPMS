function checkRegex(regexExpression, text) {
  var isValid = regexExpression.exec(text);
  return isValid !== null;
}

export default { checkRegex };
