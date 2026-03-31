<template>
  <button
      class="touche"
      :style="{ backgroundColor: color }"
      @click="$emit('keySelected', letter)"
      :data-key="letter"
  >
    {{ letter }}
  </button>
</template>

<script>
export default {
  name: "Touche",
  props: {
    letter: { type: String, required: true },
    color: {
      type: String,
      default() { return "white"; }
    }
  },
  emits: ["keySelected"],
}
</script>

<style scoped>
.touche {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 40px;
  height: 40px;
  margin: 3px;

  border: 1px solid #ccc;
  border-radius: 6px;

  box-shadow: 0 1px 0 #ccc;
  font-size: 1.2rem;

  cursor: pointer; /* mettre pointer pour que ça ressemble à un bouton */
}

.touche:focus {
  outline: none;
}

.touche:active {
  transform: translateY(2px);
  box-shadow: 0 0 0 #ccc;
}
</style>
