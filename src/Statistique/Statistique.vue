<template>
  <div class="stats">
    <button class="btn-home" @click="goHome">
      Revenir à la page principale
    </button>

    <div class="stats-container">
      <div class="stats-globales">
        <h2 class="h2">Statistiques</h2>
          <div class="stat-label">Temps de jeu moyen</div>
          <div class="stat-value">{{ temps_moyen }} s</div>
          <div class="stat-label">Nombre de tentatives moyen</div>
          <div class="stat-value">{{ nbtentative_moyen }}</div>
          <div class="stat-label">Pourcentage de victoire</div>
          <div class="stat-value">{{ pourcentage }}%</div>
      </div>

      <div class="liste-parties">
        <h2 class="h2">Parties jouées</h2>
        <div v-if="parties.length === 0" class="aucune-partie">
          Aucune partie jouée pour l'instant.
        </div>
        <div v-else class="parties-list">
          <div
              v-for="(partie, index) in partiesTriees"
              :key="index"
              class="partie-card"
              :class="{ 'gagne': partie.reussi, 'perdu': !partie.reussi }"
          >
            <div class="partie-header">
              <div class="left">
                <span class="emoji">{{ partie.reussi ? '✓' : '✗' }}</span>
                <span style="text-transform:uppercase"><strong>{{ partie.mot }}</strong></span>
              </div>
              <span class="date">{{ partie.date }}</span>
            </div>
            <div class="partie-info">
              <span><strong>Temps :</strong> {{ partie.temps }} s</span>
              <span><strong>Tentatives :</strong> {{ partie.nbTentatives }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Statistiques",

  methods: {
    goHome() {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters(["temps_moyen", "nbtentative_moyen", "pourcentage", "parties"]),

    partiesTriees() {
      return [...this.parties].reverse();
    }
  },
};
</script>

<style scoped>
.stats {
  padding: 20px;
}

.stats-container {
  display: flex;
  gap: 75px;
  align-items: flex-start;
}

/* Colonne gauche */
.stats-globales {
  flex: 0 0 300px;
  position: sticky;
  top: 20px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-value {
  font-size: 30px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 12px;
}

/* Colonne droite */
.liste-parties {
  flex: 1;
}

.h2 {
  font-family: 'Spectral', serif;
  font-size: 30px;
  margin-bottom: 30px;
  color: #2c3e50;
}

.aucune-partie {
  text-align: center;
  padding: 40px;
  color: #999;
  font-style: italic;
}

.parties-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.partie-card {
  background: white;
  border-radius: 10px;
  padding: 5px 15px 10px;
  width: 50%;
  border: 1px solid #999999;
}

.partie-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.partie-header .left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.partie-header .date {
  font-size: 15px;
  color: #666;
}

.emoji {
  font-size: 30px;
  font-weight: bold;
}

.partie-card.gagne .emoji {
  color: #4caf50;
}

.partie-card.perdu .emoji {
  color: #f44336;
}

.partie-info {
  display: flex;
  gap: 20px;
  font-size: 14px;
}

.partie-info span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-home {
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  background: #ffffff;
  color: #000000;
  border: 2px solid #e5e5e5;
  width: 100%;
  max-width: 300px;
  margin-bottom: 25px;
}

.btn-home:hover {
  border-color: #000000;
}
</style>
