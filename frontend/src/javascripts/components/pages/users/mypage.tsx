import * as React from 'react'
import { connect } from 'react-redux'
import { fetchRevolvingProjects } from '../../../actions/projects'
import Header from '../../organisms/header'
import MyPageMain from '../../organisms/mypage-main'
import Footer from '../../organisms/footer'

interface Props {
  currentUser: any,
  location: any,
  history: any,
  match: any,
  fetchRevolvingProjects: any
}

class MyPage extends React.Component<Props, {}> {
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
        <Header
          currentUser={currentUser}
          history={history}
          pathname={pathname}
        />
        <MyPageMain currentUser={currentUser} history={history} match={match} />
        <Footer currentUser={currentUser} pathname={pathname} />
      </div>
    )
  }
}

export default connect(
  ({ currentUser }: any) => ({ currentUser }),
  { fetchRevolvingProjects }
)(MyPage)
