export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export function replaceAllExceptInBetweenCurlyBracket(
  originalString: string,
  searchParam: string,
  replacement: string,
) {
  const REGEX = new RegExp(`(\\b|\\W)${searchParam}(\\b|\\W)(?![^{]*\\})`, 'g');

  return originalString.replace(REGEX, `$1${replacement}$2`);
}

export function replaceAllWithNoSeparatorsExceptInBetweenCurlyBracket(
  originalString: string,
  searchParam: string,
  replacement: string,
) {
  const regex = new RegExp(`(${searchParam})(?![^{]*})`, 'g');
  return originalString.replace(regex, replacement);
}

export function splitMulti(
  str: string,
  tokens: Array<string>,
  joinToken?: string,
) {
  const token = joinToken ? joinToken : tokens[0];
  for (let i = 1; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(token);
  }
  return str.split(token);
}

const replaceWithinBraces = (str: string, char: string) =>
  str.replace(/\{([^}]+)\}/g, function (match) {
    return match.replace(/\s/g, char);
  });

export function replaceSpacesWithinBraces(str: string) {
  return replaceWithinBraces(str, '%_#');
}

export function replaceComboWithSpaceFlagWithinBraces(str: string) {
  return str.replace(/%_#/g, ' ');
}

export function addSpacesToStringIfBeforePlus(s: string) {
  const pattern = /[a-zA-Z]\+/g;
  const result = s.replace(pattern, '$& ');
  return result;
}
