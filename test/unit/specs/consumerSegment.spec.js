import {Bolder} from '@/vplots/consumerSegment'
const samples = require('./consumerSegment.sample.json')

describe('consumerSegment.js', () => {
  it('can plot bolder', () => {
    const bolder = new Bolder(...samples.bolder.input)
    expect(bolder.genGroupChildren())
      .to.deep.equal(samples.bolder.result)
  })
})
