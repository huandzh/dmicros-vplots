import { shallowMount } from '@vue/test-utils'

import ConsumerSegment from '@/views/ConsumerSegment'

const factory = () => {
  const wrapper = shallowMount(
    ConsumerSegment,
    {attachToDocument: true})
  // manually draw the chart
  wrapper.vm.draw('echart')
  const chart = wrapper.find('#echart')
  const echart = wrapper.vm.chart
  return {wrapper: wrapper,
    echart: echart,
    plot: wrapper.vm.plot,
    chart: chart
  }
}

describe('ConsumerSegment.vue', (done) => {
  it('draw echarts plot', (done) => {
    const wrapped = factory()
    expect(wrapped.chart.exists())
      .to.equal(true)
    // more than 5 canvas : 3 series 1 graphic and others
    expect(wrapped.chart.findAll('canvas').length)
      .to.gt(5)
    done()
  })
  it('draw bolder', (done) => {
    const wrapped = factory()
    const nElements = wrapped.echart.getOption()
      .graphic[0].elements.length
    // 1 group + 16 lines
    expect(nElements)
      .to.equal(17)
    done()
  })
  it('resize bolder when resize', (done) => {
    const wrapped = factory()
    const getLineShape = (wrapped, i) => {
      return wrapped.echart.getOption()
        .graphic[0].elements[i].shape
    }
    const getSizes = () => {
      const lineHFirstShape = getLineShape(wrapped, 1)
      const lineVLastShape = getLineShape(wrapped, 16)
      const chartWidth = wrapped.echart.getWidth()
      const chartHeight = wrapped.echart.getHeight()
      return [lineHFirstShape.x2 - lineHFirstShape.x1,
        lineVLastShape.y2 - lineVLastShape.y1,
        chartWidth,
        chartHeight]
    }
    const sizes = getSizes()
    // fake a window resize to smaller size
    wrapped.echart.resize({width: sizes[2] * 0.9,
      height: sizes[3] * 0.9 })
    const newSizes = getSizes()
    for (var i; i < sizes.length; i++) {
      expect(sizes[i])
        .to.be.gt(newSizes[i])
    }
    done()
  })
})
