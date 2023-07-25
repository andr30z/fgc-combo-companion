export interface ComboStepTranslation {
  action: string;
  imagePath: string | Array<string>;
  width?: number;
  height?: number;
  style?: string;
  actionTitle?: string;
  regex?: RegExp;
  replaceString?: string;
  uppercaseBeforeTranslation?: boolean;
}

export interface ComboTranslationInterface {
  combo: string;
  actions: Array<Array<ComboStepTranslation>>;
}
