import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Mypage from '../pages/users/mypage'
import ProjectPage from '../pages/users/project-page'
import HistoryPage from '../pages/users/history-page'
import SettingPage from '../pages/users/setting-page'

interface Props {
  currentUser: any
  match: any
}

class UserOnly extends React.Component<Props, {}> {
  render() {
    const {
      currentUser,
      match: { url },
    }: any = this.props

    return currentUser ? (
      <div id="page-container">
        <Switch>
          <Route exact path={`${url}/:userId/projects`} component={ProjectPage} />
          <Route exact path={`${url}/:userId/history`} component={HistoryPage} />
          <Route exact path={`${url}/:userId/edit`} component={SettingPage} />
          <Route exact path={`${url}/:userId`} component={Mypage} />
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
      </div>
    ) : (
      <Redirect to="/guests" />
    )
  }
}

export default connect(({ currentUser }: any) => ({ currentUser }))(UserOnly)
