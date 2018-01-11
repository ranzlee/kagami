import * as React from "react";
import { UIEvent, SyntheticEvent } from "react";
import * as axios from "axios";
import { User } from "../../shared/models/User";
import { Button } from "./common/form-elements/Button";
import { Card } from "./common/containers/Card";
import { Form } from "./common/form-elements/Form";
import { Radio } from "./common/form-elements/Radio";
import { RadioOption } from "./common/form-elements/RadioOption";
import { Slider } from "./common/form-elements/Slider";
import { Textbox } from "./common/form-elements/Textbox";
import { Toggle } from "./common/form-elements/Toggle";
import { Checkbox } from "./common/form-elements/Checkbox";
import { Numberbox } from "./common/form-elements/Numberbox";
import { TextArea } from "./common/form-elements/TextArea";
import { Select } from "./common/form-elements/Select";
import { DateTime } from "./common/form-elements/DateTime";
import * as linq from "linq";
import * as Moment from "moment";

export interface HomeState {
  validateFormOnMount: boolean;
  readOnly: boolean;
  disabled: boolean;
  myTextboxState: string;
  myCheckboxState: boolean;
  myNumberState: number;
  myTextAreaState: string;
  myToggleState: boolean;
  myRadioState: string;
  mySelectState: string;
  myMultiSelectState: Array<string>;
  mySliderState: number;
  myDatePickerState: Moment.Moment;
}

export interface HomeProps {}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      validateFormOnMount:
        localStorage.getItem("validateFormOnMount") === "true",
      readOnly: false,
      disabled: false,
      myTextboxState: "aaaa",
      myCheckboxState: true,
      myNumberState: 100,
      myTextAreaState:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      myToggleState: true,
      myRadioState: "yes",
      mySelectState: "r",
      myMultiSelectState: ["r", "g"],
      mySliderState: 50,
      myDatePickerState: Moment()
    };
    this.maxDate = "2020-01-01";
  }

  maxDate: string;

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
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Card title="Form Control Examples" iconName="fa-cog">
                <div className="row">
                  <div className="col">
                    <Form onSubmit={() => {}}>
                      <Checkbox
                        id="validateOnMount"
                        label="Validate form on mount (refresh browser after changing to take effect)"
                        controlCol={12}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
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
                      <Checkbox
                        id="disable"
                        label="Disabled form"
                        controlCol={12}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.setState({
                            disabled: event.currentTarget.checked
                          });
                        }}
                        checked={this.state.disabled}
                      />
                      <Checkbox
                        id="readOnly"
                        label="Read-only form"
                        controlCol={12}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.setState({
                            readOnly: event.currentTarget.checked
                          });
                        }}
                        checked={this.state.readOnly}
                      />
                    </Form>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Form
                      onSubmit={this.handleSubmit}
                      validateOnMount={this.state.validateFormOnMount}
                      readOnly={this.state.readOnly}
                      disabled={this.state.disabled}
                    >
                      <div className="row">
                        <div className="col-lg-6 col-sm-12">
                          <Textbox
                            id="MyTextbox"
                            type="text"
                            label="My Textbox"
                            value={this.state.myTextboxState}
                            placeholder="Enter 'aaaa'"
                            required={true}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              this.setState({
                                myTextboxState: event.currentTarget.value
                              });
                            }}
                            onChangeCustomValidation={(
                              element: HTMLInputElement
                            ) => {
                              let isValid = true;
                              if (element.value !== "aaaa") {
                                isValid = false;
                              }
                              return {
                                isValid: isValid,
                                validationMessage: "Value must be aaaa."
                              };
                            }}
                            invalidFeedback="Required"
                            controlCol={8}
                            labelCol={4}
                          />
                        </div>
                        <div className="col-lg-6 col-sm-12">
                          <Numberbox
                            id="MyNumber"
                            type="number"
                            label="My Number"
                            value={this.state.myNumberState}
                            placeholder="Enter 100 or 1000"
                            required={true}
                            min={100}
                            max={200}
                            step={50}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              this.setState({
                                myNumberState: event.currentTarget.valueAsNumber
                              });
                            }}
                            invalidFeedback="Required and between 100 and 200 with step of 50"
                            controlCol={8}
                            labelCol={4}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-sm-12">
                          <TextArea
                            id="MyTextArea"
                            label="My Text Area"
                            value={this.state.myTextAreaState}
                            placeholder="Enter some text"
                            minLength={10}
                            maxLength={100}
                            required={true}
                            onChange={(
                              event: React.ChangeEvent<HTMLTextAreaElement>
                            ) => {
                              this.setState({
                                myTextAreaState: event.currentTarget.value
                              });
                            }}
                            invalidFeedback="Required as length between 10 and 100"
                            controlCol={8}
                            labelCol={4}
                            rows={5}
                          />
                        </div>
                        <div className="col-lg-6 col-sm-12">
                          <div className="row">
                            <div className="col">
                              <Checkbox
                                id="MyCheckbox"
                                label="My Checkbox"
                                controlCol={8}
                                labelCol={4}
                                required={true}
                                invalidFeedback="Required"
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  this.setState({
                                    myCheckboxState: event.currentTarget.checked
                                  });
                                }}
                                checked={this.state.myCheckboxState}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Radio
                                id="myRadio"
                                label="My Radio"
                                controlCol={8}
                                labelCol={4}
                                required={true}
                                invalidFeedback="Required"
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  this.setState({
                                    myRadioState: event.currentTarget.value
                                  });
                                }}
                                onChangeCustomValidation={(
                                  element: HTMLInputElement
                                ) => {
                                  let isValid = true;
                                  if (element.value !== "yes") {
                                    isValid = false;
                                  }
                                  return {
                                    isValid: isValid,
                                    validationMessage: "Value must be Yes."
                                  };
                                }}
                                value={this.state.myRadioState}
                              >
                                <RadioOption label="Yes" value="yes" />
                                <RadioOption label="No" value="no" />
                                <RadioOption label="Maybe" value="maybe" />
                              </Radio>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-sm-12">
                          <div className="row">
                            <div className="col">
                              <Select
                                id="MySelect"
                                label="My Select"
                                placeholderOption="Pick a color, any color"
                                controlCol={8}
                                labelCol={4}
                                required={true}
                                invalidFeedback="Required"
                                onChange={(
                                  event: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  this.setState({
                                    mySelectState: event.currentTarget.value
                                  });
                                }}
                                value={this.state.mySelectState}
                              >
                                <option value="r">Red</option>
                                <option value="g">Green</option>
                                <option value="b">Blue</option>
                              </Select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                id="MyMultiSelect"
                                label="My Multi-Select"
                                controlCol={8}
                                labelCol={4}
                                required={true}
                                invalidFeedback="Required"
                                multiple={true}
                                size={5}
                                onChange={(
                                  event: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  this.setState({
                                    myMultiSelectState: linq
                                      .from(event.currentTarget.selectedOptions)
                                      .select(x => x.value)
                                      .toArray()
                                  });
                                }}
                                value={this.state.myMultiSelectState}
                              >
                                <option value="r">Red</option>
                                <option value="g">Green</option>
                                <option value="b">Blue</option>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                          <div className="row">
                            <div className="col">
                              <Toggle
                                id="MyToggle"
                                label="My Toggle"
                                controlCol={8}
                                labelCol={4}
                                required={true}
                                invalidFeedback="Required"
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  this.setState({
                                    myToggleState: event.currentTarget.checked
                                  });
                                }}
                                checked={this.state.myToggleState}
                                labelOn="Yes"
                                labelOff="No"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Slider
                                id="MySlider"
                                label="My Slider"
                                controlCol={8}
                                labelCol={4}
                                required={true}
                                invalidFeedback="Required"
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  this.setState({
                                    mySliderState:
                                      event.currentTarget.valueAsNumber
                                  });
                                }}
                                value={this.state.mySliderState}
                                step={10}
                                showToolTip={true}
                                showHorizontal={true}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <DateTime
                                id="MyDateTime"
                                label="My Date"
                                type="date"
                                value={this.state.myDatePickerState}
                                placeholder="Pick a date"
                                required={true}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  this.setState({
                                    myDatePickerState: Moment(
                                      event.currentTarget.valueAsDate
                                    )
                                  });
                                }}
                                invalidFeedback={
                                  "Required and must be a valid date between " +
                                  Moment().format("MM/DD/YYYY") +
                                  " and " +
                                  Moment(this.maxDate).format("MM/DD/YYYY")
                                }
                                controlCol={8}
                                labelCol={4}
                                min={Moment()}
                                max={Moment(this.maxDate)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col text-right">
                          <Button
                            type="submit"
                            className="primary"
                            buttonText="Submit!"
                            iconName="fa-check"
                          />
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}
