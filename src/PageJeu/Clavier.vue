<template>
  <div>
    <touche
        v-for="i in keyboard[0]"
        :key="i"
        :letter="i"
        :color="getKeyboardGoodLetter[0].includes(i) ? 'red' : (getKeyboardGoodLetter[1].includes(i) ? 'yellow' : 'white')"
        @keySelected="onKeySelected"
    />
  </div>
  <div>
    <touche
        v-for="i in keyboard[1]"
        :key="i"
        :letter="i"
        :color="getKeyboardGoodLetter[0].includes(i) ? 'red' : (getKeyboardGoodLetter[1].includes(i) ? 'yellow' : 'white')"
        @keySelected="onKeySelected"
    />
  </div>

  <div>
    <touche :letter="'Supprimer'" @keySelected="onKeySelected"/>
    <touche
        v-for="i in keyboard[2]"
        :key="i"
        :letter="i"
        :color="getKeyboardGoodLetter[0].includes(i) ? 'red' : (getKeyboardGoodLetter[1].includes(i) ? 'yellow' : 'white')"
        @keySelected="onKeySelected"
    />
    <touche :letter="'Entrée'" @keySelected="onKeySelected"/>
  </div>
</template>

<script>
import Touche from "./Touche.vue";
import {mapGetters} from "vuex";

export default {
  name: "Clavier",
  emits: ["keySelected"],
  data : function() {
    return {
      keyboard: [["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
                ["W", "X", "C", "V", "B", "N"]],
    }
  },
  computed: {
    ...mapGetters(["getKeyboardGoodLetter"]),
  },
  components: {
    Touche,
  },
  methods: {
    onKeySelected (letter) {
      this.$emit("keySelected", letter);
    }
  }
}

</script>

<style scoped>
</style>