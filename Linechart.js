var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};

(function () {
  const prepared = document.createElement("template");
  prepared.innerHTML = `
        <style>
        </style>
        <div id="root" style="width: 100%; height: 100%;">
        </div>
      `;
  class NestedPieSamplePrepped extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(prepared.content.cloneNode(true));

      this._root = this._shadowRoot.getElementById("root");

      this._props = {};

      this.render();
    }

    onCustomWidgetResize(width, height) {
      this.render();
    }
    
    set myDataSource(dataBinding) {
      this._myDataSource = dataBinding;
      this.render();
    }

    async render() {
      await getScriptPromisify(
        "https://cdn.staticfile.org/echarts/5.0.0/echarts.min.js"
        
      );

      const myChart = echarts.init(this._root, "main");
      const option = {
        xAxis: {
            type: 'category',
            value: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
        yAxis: {
            type: 'value'
            },
        series: [
            {
            name: "",
            value: [150, 230, 224, 218, 135, 147, 260], 
            type: 'line'
        },
    ],
  };
  myChart.setOption(option);
}
}

customElements.define("customlinechart", NestedPieSamplePrepped);
})();
