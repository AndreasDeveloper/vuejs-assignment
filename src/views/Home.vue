<template>
  <div class="home">
    <!-- eslint-disable max-len -->
    <div class="field-wrap" v-for="(field, i) in fields" :key="i">
      <span>{{ field.mark }}</span>
      <div class="field-button-wrap">
        <input type="Number" :value="field.value" disabled />
        <button
          @click="disableField(field)"
          :class="field.disabled ? 'btn-disabled' : 'btn-enabled'"
        >{{ !field.disabled ? 'Enabled' : 'Disabled' }}</button>
      </div>
      <ion-icon
        :class="field.arrowU ? 'field-icon-up field-icon' : 'field-icon-nv'"
        name="arrow-up-outline"
      ></ion-icon>
      <ion-icon
        :class="field.arrowD ? 'field-icon-down field-icon' : 'field-icon-nv'"
        name="arrow-down-outline"
      ></ion-icon>
      <span class="difference">{{ field.diff }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      fields: [
        {
          mark: "A",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "B",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "C",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "D",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "E",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "F",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "G",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "H",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "I",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        },
        {
          mark: "J",
          value: 3,
          arrowU: false,
          arrowD: false,
          diff: "",
          disabled: false,
          lastTenV: []
        }
      ],
      period: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  mounted() {
    // Populate fields with set data
    if (localStorage.getItem("fields")) {
      this.$store
        .dispatch("getFields")
        .then(res => {
          this.fields = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
    // Update Fields on every 2 seconds
    window.setInterval(() => {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].disabled === false && this.$route.path === "/") {
          let num = this.getRandomNumber(this.fields[i].value);
          // Update fields data
          // If 1 => do addition
          if (num.plusMinus === 1) {
            this.fields[i].value += num.random;
            this.fields[i].diff = `+${num.random}`;
            this.fields[i].arrowU = true;
            this.fields[i].arrowD = false;
          // Else if -1 => do subtraction
          } else if (num.plusMinus === -1) {
            this.fields[i].value -= num.random;
            this.fields[i].diff = `-${num.random}`;
            this.fields[i].arrowD = true;
            this.fields[i].arrowU = false;
          }
          // Push latest field values to lastTenV array
          this.fields[i].lastTenV.push(
            this.fields[i].value
          );
          // If lastTenV array has more than 10 elements, remove the first element in array
          if (this.fields[i].lastTenV.length > 10) {
            this.fields[i].lastTenV.shift();
          }
          // Update fields on store & localStorage
          this.$store.dispatch("setFields", this.fields);
        } else {
          this.fields[i].disabled = true;
        }
      }
    }, 2000);
  },
  methods: {
    getRandomNumber(currentValue) {
      // Get random number - range from 1 to 2
      const random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      const plusMinus = Math.random() < 0.5 ? -1 : 1;
      return { random, plusMinus };
    },
    disableField(field) {
      field.disabled = !field.disabled;
    }
  }
};
</script>

<style lang="scss" scoped>
// General page & elements styles
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  .field-wrap {
    display: flex;
    align-items: center;
    margin: 10px 0;
    & span {
      margin-right: 10px;
      width: 20px;
    }
    & input {
      margin: 10px 0;
      width: 200px;
    }
  }
}

// Up & Down Arrows
.field-icon-up {
  display: block;
  color: #2ecc71;
}
.field-icon-down {
  display: block;
  color: #e74c3c;
}
.field-icon-nv {
  display: none;
}
.field-icon {
  visibility: visible;
  width: 20px;
  margin-top: -21px;
}
// Difference Number
.difference {
  margin-top: -20px;
}

// Field & Button
.field-button-wrap {
  display: flex;
  flex-direction: column;
  button {
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 2px 0;
  }
}
.btn-enabled {
  background-color: #2ecc71;
}
.btn-disabled {
  background-color: #e74c3c;
}
</style>
