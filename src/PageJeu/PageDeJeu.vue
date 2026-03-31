<template>
  <div class="pagedejeu">
    <div class="top">
      <button
          v-if="!partieTerminee || !reussi"
          id="abandon"
          @click="abandon"
          class="abandon"
      >
        Abandonner
      </button>
    </div>

    <!-- Affichage victoire directement dans la page -->
    <Victoire
        v-if="partieTerminee && reussi"
        :mot="MotATrouver"
        :nbTentatives="nbTentativesCorrect"
        :temps="tempsEcoule"
    />

    <div class="zone-texte">
      <Chronometre
          :running="chronometreEnCours"
          :reset="resetChronometre"
          @endChronometre="terminerPartie(false)"
          @tick="updateTemps"
      />
      <div class="error-message">{{ error }}</div>
      <ListZoneTexte
          :actionClavier="actionClavier"
          :couleurResultat="couleurResultat"
          :incrementerEssai="incrementerEssai"
          @motEnvoye="processMot"
          @essaiIncrement="onEssaiIncrement"
      />
    </div>

    <Clavier @keySelected="onKeyPressed" />
  </div>
</template>

<script>
import Victoire from "@/PageJeu/Victoire.vue";
import Chronometre from "@/PageJeu/Chronometre.vue";
import ListZoneTexte from "@/PageJeu/ListZoneTexte.vue";
import Clavier from "@/PageJeu/Clavier.vue";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "PageDeJeu",
  data(){
    return {
      ListeEssaie: [],
      error: "",
      MotATrouver: "",

      //partie utile pour stat
      partieTerminee: false,
      reussi: false,
      nbTentativesCorrect: 0,
      chronometreEnCours: false,
      resetChronometre: false,
      tempsEcoule: 0,

      dernierMotValide: false,

      actionClavier: null,
      couleurResultat: null,
      incrementerEssai: false,
      essaiActifIndex: 0
    };
  },
  components: {
    Chronometre,
    ListZoneTexte,
    Clavier,
    Victoire
  },
  /* La page s'affiche */
  async mounted() {
    await this.NouvellePartie();
    this.chronometreEnCours = true;
    window.addEventListener("keydown", this.handleKeypress);
  },
  /* L'utilisateur quitte la page */
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeypress);
    this.chronometreEnCours = false;
  },
  methods: {
    ...mapMutations(["addKeyboardGoodLetter"]),
    ...mapMutations(["ajouterPartie"]),
    ...mapMutations(["resetKeyboardGoodLetter"]),

    /**
     * Termine la partie (victoire ou défaite),
     * calcule les statistiques et les sauvegarde.
     */
    terminerPartie(reussi) {
      this.reussi = reussi;
      this.partieTerminee = true;
      this.chronometreEnCours = false;

      // Victoire : mot trouvé AVANT incrément → essais + 1
      // Défaite : incrément déjà effectué → essais
      this.nbTentativesCorrect = reussi
          ? this.essaiActifIndex + 1
          : this.essaiActifIndex;

      // Sauvegarde dans le store
      const partie = {
        date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        nbTentatives: this.nbTentativesCorrect,
        temps: this.tempsEcoule,
        reussi,
        mot: this.MotATrouver
      };
      this.ajouterPartie(partie);

      // Si défaite, on continue de router vers la page de défaite
      if (!reussi) {
        this.$router.push({
          name: "PageDeDefaite",
          params: {
            mot: this.MotATrouver,
            nbTentatives: this.nbTentativesCorrect,
            temps: this.tempsEcoule
          }
        });
      }
    },

    abandon() {
      if (this.partieTerminee) return;
      this.terminerPartie(false);
    },

    motTrouve() {
      // Appeler quand le mot est deviné correctement
      this.terminerPartie(true);
    },

    // Pour gérer la partie clavier physique
    handleKeypress(event) {
      console.log("Touche détectée :", event.key);
      const key = event.key;

      if (/^[a-zA-Z]$/.test(key)) {
        event.preventDefault(); // Empêche un bug entre clavier virtuel et physique
        this.onKeyPressed(key.toUpperCase());
      }
      if (key === "Backspace") {
        event.preventDefault(); // Empêche un bug entre clavier virtuel et physique
        this.onKeyPressed("Supprimer");
      }
      if (key === "Enter") {
        event.preventDefault(); // Empêche un bug entre clavier virtuel et physique
        this.onKeyPressed("Entrée");
      }
    },

    // Pour gérer la partie clavier virtuel
    onKeyPressed(key) {
      if (this.partieTerminee) return;

      const listZone = this.$refs.listZone;
      this.error = "";
      if (key === "Supprimer") {
        this.actionClavier = { type: 'supprimer', timestamp: Date.now() };
      } else if (key === "Entrée") {
        this.actionClavier = { type: 'entree', timestamp: Date.now() };
      } else {
        this.actionClavier = {type: 'lettre', value: key, timestamp: Date.now()};
      }
    },

    async VerifierMot(word) {
      const response = await axios.post(
          "https://vue-project-backend-eta.vercel.app/api/check-word",
          { word }
      );
      const { isWord, ListeEssaie } = response.data;
      if (!isWord) {
        return false;
      }

      this.ListeEssaie = ListeEssaie;
      return true;
    },

    async NouvellePartie() {
      // Reset du clavier virtuel pour une nouvelle partie
      this.resetKeyboardGoodLetter();

      const response1 = await axios.get(
          "https://vue-project-backend-eta.vercel.app/api/new-game", {});
      this.MotATrouver = response1.data.word;
      console.log(this.MotATrouver);
    },

    //---------------------------- Factorisation de processMot
    async processMot(motTeste, indexEssai) {
      if (!await this.estMotValide(motTeste)) return;

      const motDevine = this.MotATrouver.toLowerCase();
      motTeste = motTeste.toLowerCase();

      const occur = this.calculerOccurrences(motDevine);

      const { zoneColor, rouges } =
          this.calculerRouges(motTeste, motDevine, occur);

      const jaunes =
          this.calculerJaunes(motTeste, occur, zoneColor);

      this.appliquerResultatEssai(zoneColor, rouges, jaunes, indexEssai);

      this.gererFinDeTour(motTeste, motDevine);
    },

    async estMotValide(mot) {
      const valide = await this.VerifierMot(mot.toLowerCase());
      if (!valide) {
        this.error = "Le mot n'est pas dans la liste";
        return false;
      }
      return true;
    },

    calculerOccurrences(mot) {
      const occur = {};
      for (const c of mot) {
        occur[c] = (occur[c] || 0) + 1;
      }
      return occur;
    },

    calculerRouges(motTeste, motDevine, occur) {
      const zoneColor = [0, 0, 0, 0, 0];
      const rouges = [];

      for (let i = 0; i < 5; i++) {
        if (motTeste[i] === motDevine[i]) {
          zoneColor[i] = 2;
          occur[motTeste[i]]--;
          rouges.push(motTeste[i].toUpperCase());
        }
      }

      return { zoneColor, rouges };
    },

    calculerJaunes(motTeste, occur, zoneColor) {
      const jaunes = [];

      for (let i = 0; i < 5; i++) {
        if (zoneColor[i] === 2) continue;

        const lettre = motTeste[i];
        if (occur[lettre] > 0) {
          zoneColor[i] = 1;
          occur[lettre]--;
          jaunes.push(lettre.toUpperCase());
        }
      }

      return jaunes;
    },

    appliquerResultatEssai(zoneColor, rouges, jaunes, indexEssai) {
      this.couleurResultat = {
        index: indexEssai,
        couleurs: [...zoneColor],
        timestamp: Date.now()
      };
      this.addKeyboardGoodLetter([rouges, jaunes]);
    },

    gererFinDeTour(motTeste, motDevine) {
      // Victoire
      if (motTeste === motDevine) {
        this.motTrouve();
        return;
      }

      // Tentative suivante
      if (this.essaiActifIndex < 5) {
        this.incrementerEssai = true;
      } else {
        // Défaite après la dernière tentative
        this.essaiActifIndex++;
        this.terminerPartie(false);
      }
    },
    updateTemps(tempsRestant) {
      this.tempsEcoule = 601 - tempsRestant;
    },
    onEssaiIncrement(index) {
      this.essaiActifIndex = index;
      this.incrementerEssai = false; // Reset du trigger
    },
  }
};
</script>

<style scoped>
.pagedejeu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.top {
  width: 90%;
  display: flex;
  justify-content: flex-end; /* haut droite */
  margin-bottom: 10px;
}

.abandon {
  background: #d9534f;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  box-shadow: 0 1px 0 #9f3937;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.abandon:focus {
  outline: none;
}

.abandon:hover {
  background: #c64b48;
}

.abandon:active {
  transform: translateY(2px);
  box-shadow: 0 0 0 #ccc;
}

.zone-texte {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>