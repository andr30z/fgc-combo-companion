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

export function splitMulti(str: string, tokens: Array<string>) {
  let tempChar = tokens[0]; // We can use the first token as a temporary join character
  for (var i = 1; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(tempChar);
  }
  return str.split(tempChar);
}


const replaceWithinBraces = (str: string, char: string) => str.replace(/\{([^}]+)\}/g, function (match) {
  return match.replace(/\s/g, char);
});

export function replaceSpacesWithinBraces(str: string) {
  return replaceWithinBraces(str, "%_#");
}


export function replaceComboWithSpaceFlagWithinBraces(str: string) {
  return str.replace(/%_#/g, ' ');

}

export function addSpacesToStringIfBeforePlus(s: string) {
  const pattern = /[a-zA-Z]\+/g;
  const result = s.replace(pattern, "$& ");
  return result;
}