import * as React from "react";
import * as axios from "axios";
import { User } from "../../shared/models/User";
import { Button } from "./common/form-elements/Button";
import { FormExample } from "./FormExample";
import { Modal } from "./common/containers/Modal";
import { Card } from "./common/containers/Card";

export interface HomeState {}

export interface HomeProps {}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <Button
                    type="button"
                    className="primary"
                    buttonText="Say hi to me!"
                    iconName="fa-user"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      axios.default.get<User>("/auth/user").then(response => {
                        if (response.data) {
                          alert("Hi " + response.data.name + "!");
                        } else {
                          alert("Hi Anon!");
                        }
                      });
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="col">
              <Modal id="formExampleModal" width="1200px">
                <FormExample />
              </Modal>
            </div>
          </div>
        </div>
        <Card title="Form Control Examples" iconName="fa-cog">
          <div className="row">
            <div className="col">
              <FormExample />
            </div>
          </div>
        </Card>
      </>
    );
  }
}
