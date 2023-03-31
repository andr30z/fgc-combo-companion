import { GameTypes } from '@/common/types/game-types';
import React from 'react';
import { ComboTranslation } from './index';

describe('<ComboTranslation />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ComboTranslation
        game={GameTypes.TEKKEN_7}
        combo="f,n,d,df+2, f,n,d,df+2, f,n,d,df+2, B+2,1 S!, {DASH} f,n,d,df+4,1"
      />,
    );
  });
});
