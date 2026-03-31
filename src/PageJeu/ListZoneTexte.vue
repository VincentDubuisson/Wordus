<template>
  <div class="list-zone-texte">
    <ZoneTexte
        v-for="(essai, index) in essais"
        :key="index"
        :lettres="essai"
        :couleurs="couleursEssais[index]"
        :data-testid="'essai-' + index"
    />

  </div>
</template>

<script>
import ZoneTexte from "./ZoneTexte.vue";

export default {
  name: "ListZoneTexte",
  components: { ZoneTexte },
  props: {
    tailleMot: {type: Number, default: 5},
    nbEssais: {type: Number, default: 6},
    actionClavier: {type: Object, default: null},
    couleurResultat: {type: Object, default: null},
    incrementerEssai: {type: Boolean, default: false}
  },
  data() {
    return {
      essais: Array(6).fill(null).map(() => Array(5).fill("")),
      essaiActifIndex: 0,
      couleursEssais: [[0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0] ,
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0]],
    };
  },
  computed: {
    essaiActif() {
      return this.essais[this.essaiActifIndex];
    }
  },
  watch: {
    // watcher pour les actions clavier
    actionClavier: {
      handler(newAction) {
        if (!newAction) return;

        if (newAction.type === 'lettre') {
          this.recevoirLettre(newAction.value);
        } else if (newAction.type === 'supprimer') {
          this.supprimerLettre();
        } else if (newAction.type === 'entree') {
          this.validerMot();
        }
      },
      deep: true
    },
    // watcher pour appliquer les couleurs
    couleurResultat: {
      handler(newCouleur) {
        if (!newCouleur) return;
        this.couleursEssais[newCouleur.index] = [...newCouleur.couleurs];
      },
      deep: true
    },
    // Watcher pour incrémenter l'essai
    incrementerEssai(newVal) {
      if (newVal && this.essaiActifIndex < this.nbEssais - 1) {
        this.essaiActifIndex++;
        this.$emit('essaiIncrement', this.essaiActifIndex);
      } else if (newVal && this.essaiActifIndex === this.nbEssais - 1) {
        this.essaiActifIndex++;
        this.$emit('essaiIncrement', this.essaiActifIndex);
      }
    }
  },
  methods: {
    recevoirLettre(lettre) {
      const indexLibre = this.essaiActif.findIndex(l => l === "");
      if (indexLibre !== -1) {
        this.essais[this.essaiActifIndex][indexLibre] = lettre;
      }
    },
    supprimerLettre() {
      const indexRempli = [...this.essaiActif].reverse().findIndex(l => l !== "");
      if (indexRempli !== -1) {
        const vraiIndex = this.tailleMot - 1 - indexRempli;
        this.essais[this.essaiActifIndex][vraiIndex] = "";
      }
    },
    validerMot() {
      const mot = this.essaiActif.join("");
      if (mot.length === this.tailleMot) {
        this.$emit("motEnvoye", mot, this.essaiActifIndex);
      }
    },
    keySelected() {
      this.validerMot();
    },

  }
};
</script>

<style scoped>
.list-zone-texte {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  border-radius: 6px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style>
