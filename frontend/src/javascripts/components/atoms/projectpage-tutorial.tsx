import * as React from 'react'

const ProjectPageTutorial: React.SFC<{}> = () => {
  return (
    <ul className="tutorial-list">
      <label className="label">リストの削除</label>
      <li>軌道上の惑星を１つクリックしてチェックマークを付けよう！</li>
      <li>そのまま右下の3つのボタンから好きなものをクリックしてみよう！</li>
      <br />
      <label className="label">リストの追加</label>
      <li>左下のプラスボタンを押してみよう！</li>
      <li>出てきた惑星をドラッグ＆ドロップして軌道上に追加しよう！</li>
    </ul>
  )
}

export default ProjectPageTutorial
