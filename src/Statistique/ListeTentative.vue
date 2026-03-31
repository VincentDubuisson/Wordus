<template>
  <div class="liste-tentative">
    <Tentative
        v-for="(t, i) in tentatives"
        :key="i"
        :lettres="t.lettres"
        :reussi="t.reussi"
    />
  </div>
</template>

<script>
import Tentative from "./Tentative.vue";

export default {
  name: "ListeTentative",
  components: { Tentative },
  props: {
    tentatives: { type: Array, default: () => [] }
    // chaque tentative = { lettres: [], reussi: bool }
  }
};
</script>

<style scoped>
.liste-tentative {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
