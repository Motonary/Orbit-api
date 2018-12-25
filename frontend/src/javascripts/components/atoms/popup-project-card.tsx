import * as React from 'react'

interface PopupProjectCardProps {
  project: any
}

const PopupProjectCard: React.SFC<PopupProjectCardProps> = ({ project }: any) => {
  const { title, description }: any = project

  return (
    <div className="project-data">
      <div className="project-title">{title}</div>
      <div className="project-title">{description}</div>
    </div>
  )
}

export default PopupProjectCard
