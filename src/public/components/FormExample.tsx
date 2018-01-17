import * as React from "react";
import { Button } from "./common/form-elements/Button";
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
import { DateTimePicker } from "./common/form-elements/DateTimePicker";
import * as linq from "linq";
import * as Moment from "moment";

export interface FormExampleState {
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
  myDateTimePickerState: Moment.Moment;
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
      myDatePickerState: null,
      myDateTimePickerState: null
    };
    this.maxDate = "2020-01-01";
  }

  maxDate: string;

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert("form was submitted!");
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Form onSubmit={() => {}}>
              <Checkbox
                id="validateOnMount"
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
                id="disable"
                label="Disabled form"
                controlCol={12}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ disabled: event.currentTarget.checked });
                }}
                checked={this.state.disabled}
              />
              <Checkbox
                id="readOnly"
                label="Read-only form"
                controlCol={12}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ readOnly: event.currentTarget.checked });
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        myTextboxState: event.currentTarget.value
                      });
                    }}
                    onChangeCustomValidation={(element: HTMLInputElement) => {
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                            mySliderState: event.currentTarget.valueAsNumber
                          });
                        }}
                        onChangeCustomValidation={(
                          element: HTMLInputElement
                        ) => {
                          let isValid = true;
                          if (element.value !== "50") {
                            isValid = false;
                          }
                          return {
                            isValid: isValid,
                            validationMessage: "Value must be 50."
                          };
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
                      <DateTimePicker
                        id="MyDatePicker"
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
                        id="MyDateTimePicker"
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