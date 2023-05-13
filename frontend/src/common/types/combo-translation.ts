export interface ComboStepTranslation {
  action: string;
  imagePath: string | Array<string>;
  width?: number;
  height?: number;
  style?: string;
  actionTitle?: string;
}

export interface ComboTranslationInterface {
  combo: string;
  actions: Array<Array<ComboStepTranslation>>;
}
