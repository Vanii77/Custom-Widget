import * as echarts from 'echarts'
import html from './GrogressGauge.html'

import { parseMetadata } from '../utils/data-binding/parse'

(function () {
  const template = document.createElement('template')
  template.innerHTML = html
  class GrogressGauge extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      this._echart = undefined
      this.render()
    }

    onCustomWidgetResize (width, height) {
      this.render()
    }

    set myDataSource (dataBinding) {
      this._myDataSource = dataBinding
      this.render()
    }

    async render () {
      this.dispose()

      if (!this._myDataSource || this._myDataSource.state !== 'success') {
        return
      }

      const { data, metadata } = this._myDataSource
      const { dimensions, measures } = parseMetadata(metadata)

      this._echart = echarts.init(this._root, 'wight')
      const option = {
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
         },
        yAxis: {
        type: 'value'
          },
        series: [
         {
            data: [150, 230, 224, 218, 135, 147, 260],
             type: 'line'
         }
      ]
    };
      this._echart.setOption(option)
    }

    dispose () {
      if (this._echart) {
        echarts.dispose(this._echart)
      }
    }
  }

  customElements.define('com-sap-sample-echarts-grogress_gauge', GrogressGauge)
})()
