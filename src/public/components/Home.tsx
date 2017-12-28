import * as React from "react";
import { UIEvent, SyntheticEvent } from "react";
import * as axios from "axios";
import { User } from "../../shared/models/User";

export interface HomeState {}

export interface HomeProps {}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    axios.default.get<User>("/auth/user").then(response => {
      if (response.data) {
        alert("Hi " + response.data.name + "!");
      } else {
        alert("Hi Anon!");
      }
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <form>
              <div className="form-group">
                <button className="btn btn-success" onClick={this.handleSubmit}>
                  Say Hi To Me!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
