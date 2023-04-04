describe('combo-translator', () => {
  it('should translate combo when type on input', () => {
    cy.visit('http://localhost:3001/combo-translator');
    cy.get('[data-testid="combo-input-id"]').type(
      '{TEST-COMBO} f,b+2,1, f+3 {DYNAMIC ENTRY} 2, df+3 d {DYNAMIC ENTRY} 2, f+2,1 {SILENT ENTRY} 3+4 S!, f,f,f+3+4 {DYNAMIC ENTRY} 1 f, {SILENT ENTRY} 1 {CHAR: Lars}',
      { parseSpecialCharSequences: false },
    );
    cy.get('[data-testid="combo-action-TEST-COMBO"]').contains('TEST-COMBO');
    cy.get(
      '[data-testid="TEST-COMBO FORWARD, BACK+ TRIANGLE, SQUARE,  FORWARD+ CROSS DYNAMIC ENTRY TRIANGLE,  DOWN-FORWARD+ CROSS DOWN DYNAMIC ENTRY TRIANGLE,  FORWARD+ TRIANGLE, SQUARE SILENT ENTRY 3+4 S!,  FORWARD, FORWARD, FORWARD+ 3+4 DYNAMIC ENTRY SQUARE FORWARD,  SILENT ENTRY SQUARE CHAR: Lars"]',
    ).should('not.be.undefined');
  });

  it('should load random combo when user press button', () => {
    cy.visit('http://localhost:3001/combo-translator');

    cy.get('[data-testid="combo-input-id"]').should('have.value', '');

    cy.get('[data-testid="random-combo-button"]').click();
    cy.get('[data-testid="combo-input-id"]').should('not.have.value', '');
  });
});
