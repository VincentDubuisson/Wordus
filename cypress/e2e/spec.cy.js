describe('Vérifier que Wordus corresponds aux exigences via des tests imposé'
    , () => {
    it('Vérifier que l’application se charge bien', () => {
        cy.visit("http://127.0.0.1:4000"); // http://localhost:4000/
    })
    it('Lorsque qu"on clique sur le bouton “démarrer une partie”, l’affichage\n' +
        'propose bien à l’utilisateur de saisir un mot', () => {
        cy.visit("http://127.0.0.1:4000");
        cy.get("#goToGame").should("be.visible")
        cy.get("#goToGame").click();

        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Entrée"]').click();

    });
    it('Lorsque qu"on saisit “zzzzz”, on as le message d’erreur\n' +
        '“mot invalide” qui apparaît', () => {
        cy.visit("http://127.0.0.1:4000");
        cy.get("#goToGame").should("be.visible")
        cy.get("#goToGame").click();

        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Z"]').click();
        cy.get('[data-key="Entrée"]').click();

        cy.get('[data-testid="error-message"]')
            .should('contain.text', 'Mot non valide.');

    });
    it('Lorsque qu"on saisit le mot ”jante”, celui-ci est bien accepté.', () => {
        cy.visit("http://127.0.0.1:4000");
        cy.get("#goToGame").should("be.visible")
        cy.get("#goToGame").click();

        cy.get('[data-key="J"]').click();
        cy.get('[data-key="A"]').click();
        cy.get('[data-key="N"]').click();
        cy.get('[data-key="T"]').click();
        cy.get('[data-key="E"]').click();
        cy.get('[data-key="Entrée"]').click();
        //lier toute les cases de champs de texte pour faire le mot
        cy.get('[data-testid="essai-0"] .case')
            .then(cases => {
                const mot = [...cases].map(c => c.innerText).join('');
                expect(mot).to.eq('JANTE');
            });

    });
    it('Vérifiez que lorsque vous appuyez sur le bouton “abandonner la partie”, vous\n' +
        'arrivez bien sur une page de défaite', () => {
        cy.visit("http://127.0.0.1:4000");
        cy.get("#goToGame").click();
        cy.get("#abandon").click();
        cy.contains("Défaite");
    });
    it('Lorsque qu"on accède aux statistiques => vérification que la page\n' +
        'des statistiques s’affiche', () => {
        cy.visit("http://127.0.0.1:4000");
        cy.get("#goToStats").click();
        cy.contains("STATISTIQUES");
    });
})