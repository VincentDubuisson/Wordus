<template>
  <div class="home">
    <div class="content">
      <div class="logo">
        <h2 class="title">WORDUS</h2>
      </div>

      <div class="buttons">
        <button class="btn-primary" @click="goToGame">
          Démarrer une partie
        </button>
        <button class="btn-secondary" @click="goToStats">
          Consulter les parties précédentes
        </button>
      </div>

      <div class="credits">
        <span>Léo Marcq</span>
        <span class="separator">•</span>
        <span>Vincent Dubuisson</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  methods: {
    goToGame() {
      this.$router.push('/pagedejeu');
    },
    goToStats() {
      this.$router.push('/statistique');
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: #ffffff;
  padding: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 500px;
  width: 100%;
}

.logo {
  text-align: center;
}

.title {
  font-family: 'Spectral', serif;
  font-size: 4rem;
  font-weight: 700;
  color: #000000;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.05em;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 360px;
}

button {
  font-family: 'Inter', sans-serif;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #000000;
  color: #ffffff;
  border: 2px solid #000000;
}

.btn-primary:hover {
  background: #1a1a1a;
  border-color: #1a1a1a;
}

.btn-secondary {
  background: #ffffff;
  color: #000000;
  border: 2px solid #e5e5e5;
}

.btn-secondary:hover {
  border-color: #000000;
}

.credits {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #999999;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.separator {
  color: #cccccc;
}
</style>