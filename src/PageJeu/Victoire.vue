<template>
  <div class="victoire">
    <div class="content">
      <h1 class="title">Victoire</h1>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-value highlight">{{ mot }}</span>
        </div>

        <div class="stat-inline">
          <span class="stat-text">{{ nbTentatives }} tentatives</span>
          <span class="separator">•</span>
          <span class="stat-text">{{ temps }} sec</span>
        </div>
      </div>

      <button class="btn-home" @click="goHome">
        Revenir à la page principale
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Victoire",
  props: ["mot", "nbTentatives", "temps"],

  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
.victoire {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 2rem 1.5rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 500px;
  width: 100%;
}

.title {
  font-family: 'Spectral', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
  letter-spacing: 0.05em;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value.highlight {
  font-size: 1.5rem;
  color: #000000;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.stat-inline {
  font-size: 0.875rem;
  color: #666666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-text {
  font-weight: 400;
}

.separator {
  color: #cccccc;
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
}

.btn-home:hover {
  border-color: #000000;
}
</style>