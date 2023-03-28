export interface ComboStepTranslation {
  action: string;
  imagePath: string;
}


export interface ComboTranslation {
  combo: string;
  actions: Array<Array<ComboStepTranslation>>;
}