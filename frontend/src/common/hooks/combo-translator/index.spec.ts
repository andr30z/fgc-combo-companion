import { tekken7Translator } from './index';

describe('useComboTranslator', () => {
  it('should return combo translation', () => {
    expect(tekken7Translator('F')).equal({
      combo: 'F',
      actions: [
        {
          action: 'F',
          imagePath: '/tekken7/special/screw.png',
        },
      ],
    });
  });
});
