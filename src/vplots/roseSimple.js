/**
 * Make options for clusted-heatmap consumed by echarts 4.
 *
 * @param {Object} response - The response from dimicros vdatas.
 */
export const makeRoseOption = function (response) {
  // dataJson is in `.data`
  var dataJson = response.data.data
  var option = {
    title: {
      // multiple lines of comments
      text: dataJson.datas.comments.join('\n')
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} ({d}%)',
      // place tooltip near top in box
      position: function (pos, params, el, elRect, size) {
        var obj = {
          top: 60
        }
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
        return obj
      }

    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    series: [
      {
        name: 'pie',
        type: 'pie',
        radius: dataJson.templates.radius,
        center: dataJson.templates.center,
        roseType: 'area',
        data: dataJson.datas.core
      }
    ]
  }
  return option
}
