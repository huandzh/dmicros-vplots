import {Bolder, ConsumerSegment} from '@/vplots/consumerSegment'
// sample data
const samples = require('./consumerSegment.sample.json')

describe('consumerSegment.js::Bolder', () => {
  it('can generate bolder', () => {
    const bolder = new Bolder(...samples.bolder.input)
    expect(bolder.genGroupChildren())
      .to.eql(samples.bolder.result)
  })
})

describe('consumerSegment.js::ConsumerSegment', () => {
  it('has genOption and addBackmatter', () => {
    const plot = new ConsumerSegment()
    expect(plot)
      .has.property('genOption')
    expect(plot)
      .has.property('addBackmatter')
  })
  it('can generate desired option from response', () => {
    const mockResponse = {
      data: samples.vdata.doc
    }
    const plot = new ConsumerSegment()
    const option = plot.genOption(mockResponse)
    expect(option.options)
      .to.eql(samples.vdata.option.options)
    expect(option.baseOptions)
      .to.eql(samples.vdata.option.baseOptions)
  })
})
