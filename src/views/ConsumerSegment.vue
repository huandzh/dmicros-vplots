<template>
  <div class="consumer-segment">
    <plot-header :desc="desc"></plot-header>
    <div id="echart" class="echart"></div>
  </div>
</template>

<script>
import PlotHeader from '@/components/PlotHeader'
import echarts from 'echarts'
import {ConsumerSegmentPlot} from '@/vplots'
const samples = require('@/vplots/consumerSegment.sample.json')

export default {
  name: 'ConsumerSegment',
  components: {
    'plot-header': PlotHeader
  },
  data () {
    return {
      desc: 'The plot illustrates differences and shares of consumer segments. It\'s composed of heatmaps and scatter.',
      chart: {},
      plot: {}
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.draw('echart')
    })
  },
  beforeDestroy: function () {
    this.plot.removeBackmatter()
  },
  methods: {
    draw: function (id) {
      this.chart = echarts.init(document.getElementById(id))
      const mockResponse = {
        data: samples.vdata.doc
      }
      this.plot = new ConsumerSegmentPlot()
      const option = this.plot.genOption(mockResponse)
      this.chart.setOption(option)
      this.plot.addBackmatter(this.chart)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echart {
  height: 60vh;
  width: 80vw;
  margin: 0 auto;
  display: block;
}
</style>
