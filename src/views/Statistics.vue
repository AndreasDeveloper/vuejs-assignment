<template>
  <!-- eslint-disable max-len -->
  <div class="stats-wrapper">
    <h1>Statistics Page</h1>
    <h3>Visualizing value changes on each field in past 20 seconds.</h3>
    <div class="charts">
      <div class="chart-wrap" v-for="(item, i) in fieldsData" :key="i" >
        <h3>Field "{{ item.mark }}" Graph</h3>
        <Chart :data="item.lastTenV" class="chart-component" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Chart from '../components/Chart';
import { mapState } from "vuex";

export default {
  name: "Statistics",
  data() {
    return {
      fieldsData: []
    }
  },
  components: {
    Chart
  },
  mounted() {
    this.getFieldsData();
  },
  methods: {
    getFieldsData() {
      this.$store.dispatch('getFields').then(res => {
        this.fieldsData = [];
        for (let i = 0; i < res.length; i++) {
          this.fieldsData.push(res[i]);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-wrap {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.chart-component {
  width: 600px !important;
  height: 200px !important;
  padding-bottom: 100px;
  margin: 0 auto;
}

.charts {
  display: grid;
  grid-template-columns: 40% 40%;
  grid-template-rows: auto auto auto;
  grid-column-gap: 100px;
  margin-top: 80px;
  padding-left: 100px;
}
</style>