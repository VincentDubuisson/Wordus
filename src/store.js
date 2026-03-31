import {createStore} from 'vuex'

export const store = createStore({
    state() {
        return {
            /* [[lettre bien placée], [lettre mal placée (présente)]] */
            keyboardGoodLetter: [[],[]],
            parties: [] // chaque partie sera {date, nbTentatives, temps, reussi, mot }
        }
    },
    getters: {
        getKeyboardGoodLetter(state) {
            return state.keyboardGoodLetter;
        },
        parties(state) {
            return state.parties;
        },
        // statistiques globales
        temps_moyen(state) {
            if (!state.parties.length) return 0;
            const total = state.parties.reduce((sum, p) => sum + p.temps, 0);
            return Math.round(total / state.parties.length);
        },
        nbtentative_moyen(state) {
            if (!state.parties.length) return 0;
            const total = state.parties.reduce((sum, p) => sum + p.nbTentatives, 0);
            return (total / state.parties.length).toFixed(1);
        },
        pourcentage(state) {
            if (!state.parties.length) return 0;
            const gagnees = state.parties.filter(p => p.reussi).length;
            return Math.round((gagnees / state.parties.length) * 100);
        }
    },
    mutations: {
        addKeyboardGoodLetter(state, goodLetter) {

            for(const letter of goodLetter[0]) {
                // Pas de doublon dans les rouges
                if (!state.keyboardGoodLetter[0].includes(letter)) {
                    state.keyboardGoodLetter = [
                        [...state.keyboardGoodLetter[0], letter],
                        [...state.keyboardGoodLetter[1]]
                    ];
                }
                // Si une lettre est jaune dans le state et qu'elle est rouge maintenant -> on la supprime des jaunes
                if (state.keyboardGoodLetter[1].includes(letter)) {
                    let jaunes = [...state.keyboardGoodLetter[1]];
                    jaunes.splice(jaunes.indexOf(letter), 1);
                    state.keyboardGoodLetter = [
                        [...state.keyboardGoodLetter[0]],
                        jaunes
                    ];
                }
            }
            // Pas de doublon dans les jaunes
            for(const letter of goodLetter[1]) {
                if (!state.keyboardGoodLetter[1].includes(letter)) {
                    state.keyboardGoodLetter = [
                        [...state.keyboardGoodLetter[0]],
                        [...state.keyboardGoodLetter[1], letter]
                    ];
                }
            }
        },

        resetKeyboardGoodLetter(state) {
            state.keyboardGoodLetter = [[],[]];
        },
        ajouterPartie(state, partie) {
            // partie = { date, nbTentatives, temps, reussi, mot }
            state.parties.push(partie);
        }
    }
})
