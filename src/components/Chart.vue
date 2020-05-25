<template>
  <!-- eslint-disable max-len -->
  <apexchart ref="chart" width="600" type="line" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
/* eslint-disable */
/*eslint linebreak-style: ["error", "windows"]*/
import Chart from "chart.js";

export default {
  name: "Chart",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "20s",
            "18s",
            "16s",
            "14s",
            "12s",
            "10s",
            "8s",
            "6s",
            "4s",
            "2s"
          ]
        }
      },
      series: [
        {
          name: "Desktops",
          data: []
        }
      ],
      newCat: []
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.series = [{ data: this.$props.data }];

      const dataLen = this.series[0].data.length;
      const categoriesLen = this.chartOptions.xaxis.categories.length;
      this.newCat = this.chartOptions.xaxis.categories.slice(Math.max(categoriesLen - dataLen, 0));
      this.$refs.chart.updateOptions({
        xaxis: {
          categories: this.newCat
        }
      });
    }
  }
};
</script>