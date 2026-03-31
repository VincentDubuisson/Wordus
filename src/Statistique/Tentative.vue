<template>
  <div class="tentative" :class="{ reussi: this.reussi, perdu: !this.reussi }">
    <p>{{ lettres.join('') }}</p>
  </div>
</template>

<script>
export default {
  name: "Tentative",
  props: {
    lettres: { type: Array, required: true },
    reussi: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.tentative {
  display: flex;
  gap: 5px;
  margin-bottom: 4px;
}
.reussi p {
  color: green;
}
.perdu p {
  color: red;
}
</style>
