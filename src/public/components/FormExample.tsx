import * as React from "react";
import { Button } from "./common/form-elements/Button";
import { Form } from "./common/form-elements/Form";
import { Radio } from "./common/form-elements/Radio";
import { RadioOption } from "./common/form-elements/RadioOption";
import { Slider } from "./common/form-elements/Slider";
import { Toggle } from "./common/form-elements/Toggle";
import { Checkbox } from "./common/form-elements/Checkbox";
import { TextArea } from "./common/form-elements/TextArea";
import { Select } from "./common/form-elements/Select";
import { DateTimePicker } from "./common/form-elements/DateTimePicker";
import { FormSubComponentExample } from "./FormSubComponentExample";
import * as linq from "linq";
import * as Moment from "moment";

export interface FormExampleState {
  validateFormOnMount: boolean;
  readOnly: boolean;
  disabled: boolean;
  myCheckboxState: boolean;
  myTextAreaState: string;
  myToggleState: boolean;
  myRadioState: string;
  mySelectState: string;
  myMultiSelectState: Array<string>;
  mySliderState: number;
  myDatePickerState: Moment.Moment;
  myDateTimePickerState: Moment.Moment;
  demoFormLevelErrorsOnSubmit: boolean;
}

export interface FormExampleProps {}

export class FormExample extends React.Component<
  FormExampleProps,
  FormExampleState
> {
  constructor(props: FormExampleProps) {
    super(props);
    this.state = {
      validateFormOnMount:
        localStorage.getItem("validateFormOnMount") === "true",
      readOnly: false,
      disabled: false,
      myCheckboxState: true,
      myTextAreaState:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      myToggleState: true,
      myRadioState: "yes",
      mySelectState: "r",
      myMultiSelectState: ["r", "g"],
      mySliderState: 50,
      myDatePickerState: Moment(),
      myDateTimePickerState: Moment()
        .set("hour", 8)
        .set("minute", 0),
      demoFormLevelErrorsOnSubmit: false
    };
    this.maxDate = "2020-01-01";
  }

  maxDate: string;

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <Form>
              <Checkbox
                label="Validate form on mount (refresh browser after changing to take effect)"
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
              <Checkbox
                label="Disabled form"
                controlCol={12}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ disabled: event.currentTarget.checked });
                }}
                checked={this.state.disabled}
              />
              <Checkbox
                label="Read-only form"
                controlCol={12}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ readOnly: event.currentTarget.checked });
                }}
                checked={this.state.readOnly}
              />
              <Checkbox
                label="Demo form level errors"
                controlCol={12}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({
                    demoFormLevelErrorsOnSubmit: event.currentTarget.checked
                  });
                }}
                checked={this.state.demoFormLevelErrorsOnSubmit}
              />
            </Form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form
              onSubmit={(
                event: React.FormEvent<HTMLFormElement>
              ): Array<string> => {
                if (this.state.demoFormLevelErrorsOnSubmit) {
                  return [
                    "This is a form level validation error",
                    "This is another form level validation error"
                  ];
                } else {
                  alert("form was submitted!");
                }
              }}
              validateOnMount={this.state.validateFormOnMount}
              readOnly={this.state.readOnly}
              disabled={this.state.disabled}
              modal={(this as any).props.modal}
            >
              <FormSubComponentExample />
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <TextArea
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
                        labelOn="YES"
                        labelOff="NO"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Slider
                        label="My Slider"
                        controlCol={8}
                        labelCol={4}
                        required={true}
                        invalidFeedback="Required"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.setState({
                            mySliderState: event.currentTarget.valueAsNumber
                          });
                        }}
                        onChangeCustomValidation={(
                          element: HTMLInputElement
                        ) => {
                          let isValid = true;
                          let validationMessage = "";
                          if (parseFloat(element.value) !== 50) {
                            isValid = false;
                            validationMessage = "Value must be 50.";
                          }
                          return {
                            isValid: isValid,
                            validationMessage: validationMessage
                          };
                        }}
                        value={this.state.mySliderState}
                        step={10}
                        showToolTip={true}
                        showHorizontal={true}
                        verticalPixels={150}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <DateTimePicker
                        label="My Date Picker"
                        value={this.state.myDatePickerState}
                        invalidFeedback={
                          "Required and must be a valid date between " +
                          Moment().format("MM/DD/YYYY") +
                          " and " +
                          Moment(this.maxDate).format("MM/DD/YYYY") +
                          " (Sundays are not valid). "
                        }
                        controlCol={8}
                        labelCol={4}
                        required={true}
                        minDate={Moment()}
                        maxDate={Moment(this.maxDate)}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        useInputMask={true}
                        onChange={(moment: Moment.Moment) => {
                          this.setState({ myDatePickerState: moment });
                        }}
                        onChangeCustomValidation={(moment: Moment.Moment) => {
                          if (moment == null) {
                            return;
                          }
                          let isValid = true;
                          if (moment.toDate().getDay() === 0) {
                            isValid = false;
                          }
                          return {
                            isValid: isValid,
                            validationMessage: "No Sundays, sorry!"
                          };
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <DateTimePicker
                        label="My Date Time Picker"
                        value={this.state.myDateTimePickerState}
                        invalidFeedback={
                          "Required and must be a valid date between " +
                          Moment().format("MM/DD/YYYY") +
                          " and " +
                          Moment(this.maxDate).format("MM/DD/YYYY") +
                          ". Time must be between 08:00 AM and 05:00 PM in a 15 minute interval."
                        }
                        controlCol={8}
                        labelCol={4}
                        required={true}
                        minDate={Moment()}
                        maxDate={Moment(this.maxDate)}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        showTimeSelect={true}
                        timeIntervalInMinutes={15}
                        useInputMask={true}
                        onChange={(moment: Moment.Moment) => {
                          this.setState({ myDateTimePickerState: moment });
                        }}
                        onChangeCustomValidation={(moment: Moment.Moment) => {
                          if (moment == null) {
                            return;
                          }
                          let minutesOfDay = (moment: Moment.Moment) => {
                            return moment.minutes() + moment.hours() * 60;
                          };
                          let isValid = true;
                          let startTime = Moment(
                            moment.format("MM/DD/YYY") + " 08:00 AM",
                            "MM/DD/YYYY hh:mm A"
                          );
                          let endTime = Moment(
                            moment.format("MM/DD/YYYY") + " 05:00 PM",
                            "MM/DD/YYYY hh:mm A"
                          );
                          let startMinutes = minutesOfDay(startTime);
                          let endMinutes = minutesOfDay(endTime);
                          let thisMinutes = minutesOfDay(moment);
                          if (
                            thisMinutes < startMinutes ||
                            thisMinutes > endMinutes
                          ) {
                            isValid = false;
                          }
                          return {
                            isValid: isValid,
                            validationMessage:
                              "Time must be between 8:00 AM and 5:00 PM and in a 15 minute interval, sorry!"
                          };
                        }}
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
      </div>
    );
  }
}
