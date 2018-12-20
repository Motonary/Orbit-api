import * as React from 'react'

export default class HistoryCanvas extends React.Component<{}, {}> {
  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props !== nextProps) {
      this.updateCanvas()
    }
  }

  updateCanvas() {
    const canvas: any = document.getElementById('background-liner')
    const context = canvas.getContext('2d')
    this.drawLiner(context)
  }

  drawLiner(context: any) {
    if (context) {
      context.strokeStyle = 'rgb(255, 255, 255)'

      context.beginPath()
      context.moveTo(50, 20)

      // 座標を指定してラインを引いていく
      context.lineTo(250, 20)
      context.arc(250, 50, 30, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, false)
      context.moveTo(250, 80)
      context.lineTo(50, 80)
      context.arc(50, 110, 30, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, true)
      context.moveTo(50, 140)
      context.lineTo(250, 140)
      context.arc(250, 170, 30, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, false)
      // 現在のパスを輪郭表示する
      context.stroke()
    }
  }

  render() {
    return <canvas id="background-liner" />
  }
}
