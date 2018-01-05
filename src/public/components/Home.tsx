import * as React from "react";
import { UIEvent, SyntheticEvent } from "react";
import * as axios from "axios";
import { User } from "../../shared/models/User";
import { Button } from "./common/form-elements/Button";
import { Card } from "./common/containers/Card";
import { Form } from "./common/form-elements/Form";
import { Radio } from "./common/form-elements/Radio";
import { RadioOption } from "./common/form-elements/RadioOption";
import { Textbox } from "./common/form-elements/Textbox";
import { Checkbox } from "./common/form-elements/Checkbox";
import * as FormControl from "./common/form-elements/FormControl";

export interface HomeState {
  validateFormOnMount: boolean;
  myTextboxState: string;
}

export interface HomeProps {}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      validateFormOnMount:
        localStorage.getItem("validateFormOnMount") === "true",
      myTextboxState: ""
    };
  }

  handleHello = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.default.get<User>("/auth/user").then(response => {
      if (response.data) {
        alert("Hi " + response.data.name + "!");
      } else {
        alert("Hi Anon!");
      }
    });
  };

  handleMyTextboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      myTextboxState: event.currentTarget.value
    });
  };

  handleMyTextboxCustomValidation = (
    element: HTMLInputElement
  ): FormControl.CustomValidationResult => {
    let isValid = true;
    if (element.value !== "aaaa") {
      isValid = false;
    }
    return {
      isValid: isValid,
      validationMessage: "Value must be aaaa."
    };
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert("form was submitted!");
  };

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
                    onClick={this.handleHello}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3" />
            <div className="col-6">
              <Card title="Form Controls" iconName="fa-cog">
                <Form onSubmit={() => {}}>
                  <Checkbox
                    id="validateOnMount"
                    label="Validate form on mount"
                    controlCol={12}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      localStorage.setItem(
                        "validateFormOnMount",
                        event.currentTarget.checked ? "true" : "false"
                      );
                      this.setState({
                        validateFormOnMount: event.currentTarget.checked
                      });
                    }}
                    checked={this.state.validateFormOnMount}
                  />
                </Form>
                <Form
                  onSubmit={this.handleSubmit}
                  validateOnMount={this.state.validateFormOnMount}
                >
                  <Textbox
                    id="MyTextbox"
                    type="text"
                    label="My Textbox"
                    value={this.state.myTextboxState}
                    placeholder="Enter 'aaaa'"
                    required={true}
                    onChange={this.handleMyTextboxChange}
                    onChangeCustomValidation={
                      this.handleMyTextboxCustomValidation
                    }
                    invalidFeedback="Required"
                    controlCol={8}
                    labelCol={4}
                  />
                  <Checkbox
                    id="MyCheckbox"
                    label="My Checkbox"
                    controlCol={8}
                    labelCol={4}
                    required={true}
                    invalidFeedback="Required"
                    checked={false}
                  />
                  <Radio
                    id="yes"
                    label="Yes"
                    name="required"
                    controlCol={4}
                    labelCol={4}
                    required={true}
                    invalidFeedback="Required"
                  >
                    <RadioOption label="Yes" value="yes" />
                    <RadioOption label="No" value="no" />
                  </Radio>
                  <div className="row">
                    <div className="col-4" />
                    <div className="col-8 text-right">
                      <Button
                        type="submit"
                        className="primary"
                        buttonText="Submit!"
                        iconName="fa-check"
                      />
                    </div>
                  </div>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}
