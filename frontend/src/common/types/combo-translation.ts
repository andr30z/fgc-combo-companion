export interface ComboStepTranslation {
  action: string;
  imagePath: string;
  width?: number;
  height?: number;
}

export interface ComboTranslationInterface {
  combo: string;
  actions: Array<Array<ComboStepTranslation>>;
}
