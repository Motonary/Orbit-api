import * as React from 'react'
import { connect } from 'react-redux'

import Header from '../../organisms/header'
import MyPageMain from '../../organisms/mypage-main'
import Footer from '../../organisms/footer'

import { fetchRevolvingProjects } from '../../../actions/projects'

interface MyPageProps {
  currentUser: any
  history: any
  location: any
  match: any

  fetchRevolvingProjects: any
}

class MyPage extends React.Component<MyPageProps, {}> {
  componentDidMount() {
    if (sessionStorage.getItem('jwt')) this.props.fetchRevolvingProjects()
  }

  render() {
    const {
      currentUser,
      history,
      location: { pathname },
      match,
    } = this.props

    return (
      <div className="page-container">
        <Header currentUser={currentUser} history={history} pathname={pathname} />
        <MyPageMain currentUser={currentUser} history={history} match={match} />
        <Footer currentUser={currentUser} pathname={pathname} history={history} />
      </div>
    )
  }
}

export default connect(
  ({ currentUser }: any) => ({ currentUser }),
  { fetchRevolvingProjects }
)(MyPage)
