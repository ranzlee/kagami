import * as React from "react";
import { Router } from "react-router";
import { createHashHistory } from "history";
import * as Axios from "axios";
import KagamiRoutes from "./../routes/KagamiRoutes";
import * as UserService from "./../services/userService"
import NotificationsList from "./../containers/NotificationsListContainer";

const history = createHashHistory();

export default class Root extends React.Component {
  componentDidMount() {
    UserService.syncUserOnMount(this);
  }

  render() {
    return (
      <>
      <NotificationsList />
      <Router history={history}>
        <KagamiRoutes children={this.props.children} />
      </Router>
      </>
    );
  }
}
