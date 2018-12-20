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

      const initialHeight = 50
      const leftEnd = 100
      const rightEnd = 800
      const radius = 50

      context.beginPath()
      context.moveTo(leftEnd, initialHeight)

      context.beginPath()
      context.moveTo(50, 100)
      // 座標を指定してラインを引いていく
      context.lineTo(rightEnd, 100)
      context.arc(rightEnd, 150, radius, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, false)
      context.moveTo(rightEnd, 200)
      context.lineTo(leftEnd, 200)
      context.arc(leftEnd, 250, radius, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, true)
      context.moveTo(leftEnd, 300)
      context.lineTo(rightEnd, 300)
      context.arc(rightEnd, 350, radius, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, false)
      context.moveTo(rightEnd, 400)
      context.lineTo(leftEnd, 400)
      context.arc(leftEnd, 450, radius, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, true)
      context.moveTo(leftEnd, 500)
      context.lineTo(rightEnd, 500)
      context.arc(rightEnd, 550, radius, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, false)
      context.moveTo(rightEnd, 600)
      context.lineTo(leftEnd, 600)
      context.arc(leftEnd, 650, radius, (-90 / 180) * Math.PI, (90 / 180) * Math.PI, true)
      context.moveTo(leftEnd, 700)
      context.lineTo(rightEnd, 700)
      // 現在のパスを輪郭表示する
      context.stroke()
    }
  }

  render() {
    return (
      <div className="background-liner-parent">
        <canvas id="background-liner" width="900" height="750" />
      </div>
    )
  }
}
