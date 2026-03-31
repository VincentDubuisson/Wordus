<template>
  <p>{{timer}}</p>
</template>

<script>
export default {
  name: "Chronometre",
  props: {
    running: Boolean,
    reset: Boolean
  },
  data: function () {
    return {
      intervalId: 0,
      timer: "10:00",
      min: 9,
      sec: 59,
    }
  },
  watch: {
    running(newVal) {
      if (newVal) {
        this.startChronometre();
      } else {
        this.stopChronometre();
      }
    },
    reset() {
      this.resetChronometre();
    }
  },
  methods: {
    startChronometre: function () {
      if (this.intervalId) return;

      this.intervalId = setInterval(() => {
        if (this.sec < 10) {
          this.timer = "0" + this.min + ":0" + this.sec;
        } else {
          this.timer = "0" + this.min + ":" + this.sec;
        }

        this.sec -= 1;

        if (this.min <= 0 && this.sec <= 0) {
          this.$emit("endChronometre"); // fin du chrono
          this.stopChronometre();
          return;
        }

        if (this.sec <= 0) {
          this.sec = 59;
          this.min -= 1;
        }
        this.$emit("tick", this.min * 60 + this.sec);
      }, 1000)
    },
    stopChronometre: function () {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    resetChronometre: function () {
      this.stopChronometre();
      this.min = 9;
      this.sec = 59;
      this.timer = "10:00";
    },
  }
}
</script>

<style scoped>

</style>