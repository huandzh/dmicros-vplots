import {Bolder, ConsumerSegment} from '@/vplots/consumerSegment'
const samples = require('@/vplots/consumerSegment.sample.json')

describe('consumerSegment.js::Bolder', () => {
  it('can generate bolder', () => {
    const bolder = new Bolder(...samples.bolder.input)
    expect(bolder.genGroupChildren())
      .to.deep.equal(samples.bolder.result)
  })
})

describe('consumerSegment.js::ConsumerSegment', () => {
  it('can generate option from response', () => {
    const mockResponse = {
      data: samples.vdata.doc
    }
    const plot = new ConsumerSegment()
    const option = plot.genOption(mockResponse)
    expect(samples.vdata.doc.data.timeline.length)
      .to.equal(option.options.length)
  })
})
