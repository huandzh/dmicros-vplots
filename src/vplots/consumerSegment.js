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
    dataMap[key].difference = dataAtTime[i].difference
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
 * @param {String} extraKey - The extra colunm appended of extra key.
 */
const fillData = function (key, map, template, extraKey) {
  for (var i = 0; i < template.length; i++) {
    template[i][2] = map[template[i][3]][key]
    if (typeof (extraKey) !== 'undefined') {
      template[i][4] = map[template[i][3]][extraKey]
    }
  }
  return template
}

/**
 * Make options for clusted-heatmap consumed by echarts 4.
 *
 * @param {Object} response - The response from dimicros vdatas.
 */
export const makeConsumerClustedOption = function (response) {
  // dataJson is in `.data`
  var dataJson = response.data.data
  // prepare subOptions used with timeline
  var subOptions = []
  var i
  for (i = 0; i < dataJson.datas.timeline.length; i++) {
    // build a map from core data
    var dataMap = mapCore(dataJson.datas.core[i])
    // init datas from templates
    var heatmapData = JSON.parse(JSON.stringify(dataJson.templates.heatmap))
    var scatterData = JSON.parse(JSON.stringify(dataJson.templates.scatter))
    subOptions.push({
      title: {
        text: dataJson.datas.timeline[i] + ' : ' + dataJson.datas.comments[i]
      },
      series: [
        // for heatmap
        {
          data: fillData('difference', dataMap, heatmapData)
        },
        // for scatter(bubble)
        {
          data: fillData('share', dataMap, scatterData, 'difference')
        }
      ]
    })
  }
  // prepare timeline
  var timelineData = []
  for (i = 0; i < dataJson.datas.timeline.length; i++) {
    timelineData.push({
      value: dataJson.datas.timeline[i],
      tooltip: {
        // add comments at symbol
        formatter: '{b} ' + dataJson.datas.comments[i]
      },
      symbol: 'diamond',
      symbolSize: 16
    })
  }
  var option = {
    baseOption: {
      timeline: {
        // y: 0,
        axisType: 'category',
        // realtime: false,
        // loop: false,
        autoPlay: true,
        // currentIndex: 2,
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
        // for heatmap
        {
          data: dataJson.templates.x_category
        },
        // for scatter
        {
          type: 'value',
          show: false,
          data: dataJson.templates.x_int
        }
      ],
      // as xAxis
      yAxis: [
        {
          data: dataJson.templates.y_category
        },
        {
          type: 'value',
          show: false,
          data: dataJson.templates.y_int
        }
      ],
      // need this to be overide in series
      tooltip: {
      },
      visualMap: [
        // for heatmap
        {
          // use extra data from dataJson, but can be calculated
          min: -dataJson.datas.extra.max_abs_difference,
          max: +dataJson.datas.extra.max_abs_difference,
          calculable: true,
          realtime: false,
          // set to value [x, y, value] -> value
          dimension: 2,
          seriesIndex: 0,
          // TODO: choose more eve catching colors
          inRange: {
            color: ['#007fff', '#b3d9ff', '#fff', '#ffc2c2', '#ff4747']
          },
          formatter: function (params) {
            return (params * 100).toFixed(1) + '%'
          },
          // don't show for mobile
          show: false
        },
        // for scatter
        {
          seriesIndex: 1,
          show: false
        }
      ],
      title: {
        text: '热力图'
      },
      series: [
        {
          type: 'heatmap',
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
          xAxisIndex: 1,
          yAxisIndex: 1,
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
              var obj = {top: 30}
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
