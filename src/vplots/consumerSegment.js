/**
 * Layouts for plots.
 */
const DefaultLayouts = {
  // bolder as a set of lines
  // zero point at left bottom
  bolder: [
    [0, 5, 5, 5],
    [0, 4, 3, 4],
    [0, 3, 2, 3],
    [3, 3, 5, 3],
    [0, 2, 1, 2],
    [2, 2, 4, 2],
    [1, 1, 2, 1],
    [4, 1, 5, 1],
    [0, 0, 5, 0],
    [0, 5, 0, 0],
    [1, 2, 1, 1],
    [2, 4, 2, 0],
    [3, 5, 3, 0],
    [4, 5, 4, 3],
    [4, 2, 4, 1],
    [5, 5, 5, 0]
  ],
  // heatmap as 5x5 rectangle
  heatmap: [
    [0, 0, '安稳务实族'],
    [0, 1, '安稳务实族'],
    [1, 0, '安稳务实族'],
    [2, 0, '经济体面族'],
    [2, 1, '经济体面族'],
    [3, 0, '经济享乐族'],
    [3, 1, '经济享乐族'],
    [4, 0, '经济享乐族'],
    [0, 2, '顾家进取族'],
    [1, 1, '顾家进取族'],
    [1, 2, '顾家进取族'],
    [2, 2, '稳健彰显族'],
    [2, 3, '稳健彰显族'],
    [3, 2, '现代乐活族'],
    [4, 1, '现代乐活族'],
    [4, 2, '现代乐活族'],
    [0, 3, '稳进内敛族'],
    [1, 3, '稳进内敛族'],
    [0, 4, '富有精英族'],
    [1, 4, '富有精英族'],
    [2, 4, '富有精英族'],
    [3, 3, '知性内涵族'],
    [3, 4, '知性内涵族'],
    [4, 3, '实力任性族'],
    [4, 4, '实力任性族']
  ],
  // scatter with 0 to 5 axis
  scatter: [
    [0.8, 0.8, '安稳务实族'],
    [1.5, 2.0, '顾家进取族'],
    [1.0, 3.5, '稳进内敛族'],
    [1.5, 4.5, '富有精英族'],
    [2.5, 1.0, '经济体面族'],
    [2.5, 3.0, '稳健彰显族'],
    [3.5, 1.0, '经济享乐族'],
    [4.0, 2.4, '现代乐活族'],
    [3.5, 4.0, '知性内涵族'],
    [4.5, 4.0, '实力任性族']
  ],
  // axis
  x_category: ['安逸', '进取', '驾驭', '引领', '刺激'],
  x_int: [0, 1, 2, 3, 4, 5],
  y_category: ['基层', '中下层', '中层', '中上层', '上层'],
  y_int: [0, 1, 2, 3, 4, 5]
}
/**
 * Color pattern for visual map.
 */
const DefaultVisualMapColor = ['#2971b2', '#6badd1', '#c2deec', '#f8f7f7', '#fbccb4', '#e58066', '#ba2732']
/**
 * Bolder used in echarts.
 *
 * @param {Array} position - Point O [x, y].
 * @param {Number} stepWidth - Width of one step.
 * @param {Number} stepHeight - Height of one step.
 * @param {Number} zlevel - Zlevel of the bolder.
 * @param {Number} lineWidth - Width of lines of thebolder.
 * @param {String} stroke - Color of lines of the bolder.
 */
export const Bolder = function (position, stepWidth, stepHeight, zlevel, lineWidth, stroke) {
  this.position = position
  this.stepWidth = stepWidth
  this.stepHeight = stepHeight
  this.zlevel = zlevel
  this.lineWidth = lineWidth
  this.stroke = stroke
}
// use data at `layouts`
Bolder.prototype.lines = DefaultLayouts.bolder
/**
 * Generate template for lines of the bolder.
 */
Bolder.prototype.genTemplate = function () {
  return {
    type: 'line',
    zlevel: this.zlevel,
    shape: {
    },
    style: {
      lineWidth: this.lineWidth,
      stroke: this.stroke
    }
  }
}
/**
 * Generate group children of the bolder.
 */
Bolder.prototype.genGroupChildren = function () {
  const template = this.genTemplate()
  const bolder = this
  const [x0, y0] = this.position
  const lines = this.lines.map(function (item) {
    var line = Object.assign({}, template)
    const [ox1, oy1, ox2, oy2] = item
    line.shape = {
      x1: x0 + ox1 * bolder.stepWidth,
      y1: y0 + oy1 * bolder.stepHeight,
      x2: x0 + ox2 * bolder.stepWidth,
      y2: y0 + oy2 * bolder.stepHeight,
      percent: 1
    }
    return line
  })
  return lines
}

/**
 * Create a data map using `<pop name>` as the key.
 *
 * @param {Object} dataAtTime - The data holder at a time.
 */
const mapCore = function (dataAtTime) {
  var dataMap = {}
  for (var i = 0; i < dataAtTime.length; i++) {
    var key = dataAtTime[i].pop
    dataMap[key] = {}
    dataMap[key].diff = dataAtTime[i].diff
    dataMap[key].share = dataAtTime[i].share
  }
  return dataMap
}
/**
 * Fill data to the template.
 *
 * @param {String} key - The name of the pop.
 * @param {Object} map - The data map.
 * @param {Object} template - The template used.
 * @param {String} extraKey - A extra colunm to append with extra key.
 */
const fillData = function (key, map, template, extraKey) {
  const appendingExtra = (typeof (extraKey) !== 'undefined')
  const filled = template.map(function (item) {
    const [x, y, pop] = item
    const value = map[pop][key]
    if (appendingExtra) {
      const extra = map[pop][extraKey]
      return [x, y, value, pop, extra]
    } else {
      return [x, y, value, pop]
    }
  })
  return filled
}
/**
 * Make options for scatter-graphic-heatmap consumed by echarts 4.
 *
 * @param {Object} response - The response from dimicros vdatas.
 */
export const ConsumerSegmentPlot = function (layouts = DefaultLayouts, visualMapColor = DefaultVisualMapColor) {
  this.layouts = layouts
  this.visualMapColor = visualMapColor
}
/**
 * Helper for options.
 *
 * @param {Object} data - Essential data.
 * @param {Object} cache - Cached data.
 * @param {Object} layouts - Settings for layouts.
 * @param {Array} visualMapColor - Color patttern for visualMap.
 *
 * @return {Object} option - Option ready for echarts.
 */
ConsumerSegmentPlot.prototype.genOptionHelper = function (data, cache, layouts, visualMapColor) {
  // dataJson is in `.data`
  // var dataJson = response.data.data
  // whether use cache
  const hasCached = cache.hasOwnProperty('heatmap')
  // loop for length of the timeline
  var timelineData = []
  var subOptions = []
  var heatmapDataCached
  var i // counter
  var dataMap // dataMap
  for (i = 0; i < data.timeline.length; i++) {
    // build a map from core data
    dataMap = mapCore(data.core[i])
    if (hasCached) {
      heatmapDataCached = cache.heatmap.data[i]
    }
    subOptions.push({
      title: {
        text: data.timeline[i] + ' : ' + data.comments[i]
      },
      series: [
        // for plain heatmap with bolder
        {
          data: fillData('diff', dataMap, layouts.heatmap)
        },
        // for heatmap better for eyes
        {
          data: heatmapDataCached || fillData('diff', dataMap, layouts.heatmap)
        },
        // for scatter(bubble)
        {
          data: fillData('share', dataMap, layouts.scatter, 'diff')
        }
      ]
    })
    // prepare timeline
    timelineData.push({
      value: data.timeline[i],
      tooltip: {
        // add comments at symbol
        formatter: '{b} ' + data.comments[i]
      },
      symbol: 'diamond',
      symbolSize: 16
    })
  }
  // prepare option
  var heatmapCached
  if (hasCached) {
    heatmapCached = cache.heatmap
  }
  var option = {
    baseOption: {
      toolbox: {
        feature: {
          saveAsImage: {
            show: true
          },
          dataView: {
            show: true
          }
        }
      },
      grid: {}, // required when determining position of bolders
      graphic: [],
      timeline: {
        // y: 0,
        axisType: 'category',
        // realtime: false,
        // loop: false,
        autoPlay: false,
        playInterval: 4000,
        // controlStyle: {
        //     position: 'left'
        // },
        data: timelineData,
        label: {
          formatter: function (s, i) {
            return s
          }
        }
      },
      xAxis: [
        // for plain heatmap
        {
          data: layouts.x_category
        },
        // for heatmap
        {
          type: 'category',
          show: false,
          data: heatmapCached.x || layouts.x_category
        },
        // for scatter
        {
          type: 'value',
          show: false,
          min: layouts.x_int[0],
          max: layouts.x_int[layouts.x_int.length - 1]
        }
      ],
      // as xAxis
      yAxis: [
        {
          data: layouts.y_category
        },
        {
          type: 'category',
          show: false,
          data: heatmapCached.y || layouts.y_category
        },
        {
          type: 'value',
          show: false,
          min: layouts.y_int[0],
          max: layouts.y_int[layouts.y_int.length - 1]
        }
      ],
      // need this to be overide in series
      tooltip: {
      },
      visualMap: [
        // for plain heatmap
        {
          min: heatmapCached.min || data.extra.min,
          max: heatmapCached.max || data.extra.max,
          calculable: true,
          realtime: false,
          // set to value [x, y, value] -> value
          dimension: 2,
          seriesIndex: 0,
          inRange: {
            opacity: 0, // invisable
            color: visualMapColor
          },
          // don't show for mobile
          show: false
        },
        // for heatmap
        {
          min: heatmapCached.min || data.extra.min,
          max: heatmapCached.max || data.extra.max,
          calculable: true,
          realtime: false,
          // set to value [x, y, value] -> value
          dimension: 2,
          seriesIndex: 1,
          // colors: per seaborn
          inRange: {
            opacity: 1,
            color: visualMapColor
          },
          formatter: function (params) {
            return (params * 100).toFixed(1) + '%'
          },
          show: true
        },
        // for scatter
        {
          seriesIndex: 2,
          show: false
        }
      ],
      title: {
        text: '热力图'
      },
      series: [
        {
          type: 'heatmap',
          xAxisIndex: 0,
          yAxisIndex: 0,
          zlevel: 1,
          tooltip: {
            formatter: function (params) {
              return params.value[3] + ':' + (params.value[2] * 100).toFixed(2) + '%'
            }
          },
          // use 1st to init
          data: subOptions[0].series[0].data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          type: 'heatmap',
          xAxisIndex: 1,
          yAxisIndex: 1,
          zlevel: 0,
          // use 1st to init
          data: subOptions[0].series[1].data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          type: 'scatter',
          // turn off viusal map
          visualMap: false,
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
              color: '#ffe066'
            }
          },
          data: subOptions[0].series[0].data,
          // must set axis
          xAxisIndex: 2,
          yAxisIndex: 2,
          zlevel: 2,
          symbolSize: function (value) {
            return Math.sqrt(value[2]) * 100
          },
          label: {
            normal: {
              show: true,
              fontSize: 14,
              color: '#000',
              formatter: function (params) {
                return params.value[3]
              }
            }
          },
          tooltip: {
            // place tooltip near top
            position: function (pos, params, el, elRect, size) {
              var obj = { top: 30 }
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
              return obj
            },
            formatter: function (params) {
              var differClass, differPrefix
              // use rich
              if (params.value[4] > 0) {
                differPrefix = '+'
                differClass = '{'
              } else {
                differPrefix = ' '
                differClass = '{'
              }
              return [
                '{' + params.value[3] + '}',
                '{份额:' + (params.value[2] * 100).toFixed(1) + '%}' +
                                differClass + '差异:' + differPrefix + (params.value[4] * 100).toFixed(1) + '%}'
              ].join('\n')
            },
            color: '#000',
            fontSize: 14
          }
        }
      ]
    },
    options: subOptions
  }
  return option
}
/**
 * Generate options with response.
 *
 * @param {Object} response - Response from API.
 *
 * @return {Object} option - Option ready for echarts.
 */
ConsumerSegmentPlot.prototype.genOption = function (response) {
  return this.genOptionHelper(response.data.data,
    response.data.cache,
    this.layouts,
    this.visualMapColor)
}
/**
 * Update bolder.
 *
 * @param {Object} chart - Echart instance.
 * @param {Number} zlevel - Zlevel of the bolder, default as 10.
 * @param {Number} lineWidth - Width of lines of the bolder, default as 3.
 * @param {String} stroke - Color of lines of the bolder, default as `#fff`.
 */
const updateBolder = function (chart, zlevel = 10, lineWidth = 3, stroke = '#fff') {
  // add customer segmentation map
  const pStart = chart.convertToPixel({
    xAxisIndex: 2,
    yAxisIndex: 2
  }, [0.0, 0.0])
  const p1Step = chart.convertToPixel({
    xAxisIndex: 2,
    yAxisIndex: 2
  }, [1.0, 1.0])
  const stepWidth = p1Step[0] - pStart[0]
  const stepHeight = p1Step[1] - pStart[1]
  const bolder = new Bolder(pStart, stepWidth, stepHeight,
    zlevel, lineWidth, stroke)
  const children = bolder.genGroupChildren()
  chart.setOption({
    baseOption: {
      graphic: [{
        type: 'group',
        zlevel: zlevel,
        children: children,
        invisible: false,
        draggable: false
      }]
    }
  })
}
/**
 * Add backmatter after initializing an echart instance.
 *
 * @param {Object} chart - Echart instance.
 */
ConsumerSegmentPlot.prototype.addBackmatter = function (chart) {
  updateBolder(chart)
  window.addEventListener('resize', function () {
    updateBolder(chart)
  })
}
