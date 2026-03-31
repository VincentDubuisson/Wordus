<template>
  <div class="zone-texte">
    <div class="cases">
      <div
          v-for="(lettre, index) in lettres"
          :key="index"
          class="case"
          :style="{ backgroundColor: getColor(couleurs[index]) }"
          :data-testid="'case-' + index">
        {{ lettre }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZoneTexte",
  props: {
    lettres: {
      type: Array,
      required: true },
    couleurs: {
      type: Array,
      required: true,
      default() {
        return [0, 0, 0, 0, 0];
      }
    }
  },
  methods: {
    getColor (couleur) {
      switch (couleur) {
        case 0: return "white";
        case 1: return "yellow";
        case 2: return "red";
      }
    }

  }
};
</script>

<style scoped>
.zone-texte {
  display: flex;
  justify-content: center;
}

.cases {
  display: flex;
  gap: 6px;
}

.case {
  width: 50px;
  height: 50px;
  border: 2px solid #333;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 25px;
  text-transform: uppercase;
  background-color: #fff;
}
</style>
