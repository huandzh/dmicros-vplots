<template>
  <div class="consumer-segment">
    <plot-header :desc="desc"></plot-header>
    <div id="my_echart" class="echart"></div>
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
      desc: 'The plot illustrates differences and shares of consumer segments. It\'s composed of heatmaps and scatter.'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.draw('my_echart')
    })
  },
  methods: {
    draw: function (id) {
      var myChart = echarts.init(document.getElementById(id))
      const mockResponse = {
        data: samples.vdata.doc
      }
      const plot = new ConsumerSegmentPlot()
      const option = plot.genOption(mockResponse)
      myChart.setOption(option)
      plot.addBackmatter(myChart)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echart {
  height: 700px;
  width: 700px;
  margin: 0 auto;
}
</style>
