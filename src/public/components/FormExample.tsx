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
import { AutoComplete } from "./common/form-elements/AutoComplete";
import { FormSubComponentExample } from "./FormSubComponentExample";
import * as linq from "linq";
import * as Moment from "moment";
import { link } from "fs";

interface AutoCompleteSuggestion {
  name: string;
  year: number;
}

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
  myAutoCompleteSuggestion: AutoCompleteSuggestion;
  demoFormLevelErrorsOnSubmit: boolean;
}

export interface FormExampleProps {}

export class FormExample extends React.Component<
  FormExampleProps,
  FormExampleState
> {
  constructor(props: FormExampleProps) {
    super(props);
    this.suggestions = [
      { year: 1951, name: "Regional Assembly Language" },
      { year: 1952, name: "Autocode" },
      { year: 1954, name: "IPL (forerunner to LISP)" },
      { year: 1955, name: "FLOW-MATIC (led to COBOL)" },
      { year: 1957, name: "FORTRAN (First compiler)" },
      { year: 1957, name: "COMTRAN (precursor to COBOL)" },
      { year: 1958, name: "LISP" },
      { year: 1958, name: "ALGOL 58" },
      { year: 1959, name: "FACT (forerunner to COBOL)" },
      { year: 1959, name: "COBOL" },
      { year: 1959, name: "RPG" },
      { year: 1962, name: "APL" },
      { year: 1962, name: "Simula" },
      { year: 1962, name: "SNOBOL" },
      { year: 1963, name: "CPL (forerunner to C)" },
      { year: 1964, name: "Speakeasy (computational environment)" },
      { year: 1964, name: "BASIC" },
      { year: 1964, name: "PL/I" },
      { year: 1966, name: "JOSS" },
      { year: 1967, name: "BCPL (forerunner to C)" },
      { year: 1968, name: "Logo" },
      { year: 1969, name: "B (forerunner to C)" },
      { year: 1970, name: "Pascal" },
      { year: 1970, name: "Forth" },
      { year: 1972, name: "C" },
      { year: 1972, name: "Smalltalk" },
      { year: 1972, name: "Prolog" },
      { year: 1973, name: "ML" },
      { year: 1975, name: "Scheme" },
      { year: 1978, name: "SQL (a query language, later extended)" },
      { year: 1980, name: "C++ (as C with classes, renamed in 1983)" },
      { year: 1983, name: "Ada" },
      { year: 1984, name: "Common Lisp" },
      { year: 1984, name: "MATLAB" },
      {
        year: 1984,
        name:
          "dBase III, dBase III Plus (Clipper and FoxPro as FoxBASE, later developing into Visual FoxPro"
      },
      { year: 1985, name: "Eiffel" },
      { year: 1986, name: "Objective-C" },
      { year: 1986, name: "LabVIEW (Visual Programming Language)" },
      { year: 1986, name: "Erlang" },
      { year: 1987, name: "Perl" },
      { year: 1988, name: "Tcl" },
      {
        year: 1988,
        name:
          "Wolfram Language (as part of Mathematica, only got a separate name in June 2013)"
      },
      { year: 1989, name: "FL (Backus)" },
      { year: 1990, name: "Haskell" },
      { year: 1991, name: "Python" },
      { year: 1991, name: "Visual Basic" },
      { year: 1993, name: "Lua" },
      { year: 1993, name: "R" },
      { year: 1994, name: "CLOS (part of ANSI Common Lisp)" },
      { year: 1995, name: "Ruby" },
      { year: 1995, name: "Ada 95" },
      { year: 1995, name: "Java" },
      { year: 1995, name: "Delphi (Object Pascal)" },
      { year: 1995, name: "JavaScript" },
      { year: 1995, name: "PHP" },
      { year: 1997, name: "Rebol" },
      { year: 2000, name: "ActionScript" },
      { year: 2001, name: "C#" },
      { year: 2001, name: "D" },
      { year: 2002, name: "Scratch" },
      { year: 2003, name: "Groovy" },
      { year: 2003, name: "Scala" },
      { year: 2005, name: "F#" },
      { year: 2006, name: "PowerShell" },
      { year: 2007, name: "Clojure" },
      { year: 2009, name: "Go" },
      { year: 2010, name: "Rust" },
      { year: 2011, name: "Dart" },
      { year: 2011, name: "Kotlin" },
      { year: 2011, name: "Red" },
      { year: 2011, name: "Elixir" },
      { year: 2012, name: "Julia" },
      { year: 2014, name: "Swift" },
      { year: 2016, name: "Ring" }
    ];
    this.maxDate = "2020-01-01";
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
      myAutoCompleteSuggestion: linq
        .from(this.suggestions)
        .first(i => i.name === "Perl"),
      demoFormLevelErrorsOnSubmit: false
    };
  }

  maxDate: string;

  suggestions: Array<AutoCompleteSuggestion>;

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
                  <div className="row">
                    <div className="col">
                      <AutoComplete
                        controlCol={8}
                        labelCol={4}
                        label="My Auto-Complete"
                        required={true}
                        invalidFeedback="Required"
                        value={this.state.myAutoCompleteSuggestion}
                        placeholder="Type a programming language (e.g. 'C' or 'P')"
                        suggestionsContainerMaxHeight={200}
                        suggestionsContainerPosition="top"
                        onChange={(suggestion: AutoCompleteSuggestion) => {
                          this.setState({
                            myAutoCompleteSuggestion: suggestion
                          });
                        }}
                        onChangeCustomValidation={(
                          suggestion: AutoCompleteSuggestion
                        ) => {
                          let isValid = true;
                          if (suggestion != null && suggestion.name === "PHP") {
                            isValid = false;
                          }
                          return {
                            isValid: isValid,
                            validationMessage: "Use a real language!"
                          };
                        }}
                        getSuggestions={(reason: string, value: string) => {
                          //teach autocomplete how to get options based on value typed in
                          let inputValue = value.trim().toLowerCase();
                          let inputLength = inputValue.length;
                          return inputLength === 0
                            ? []
                            : linq
                                .from(this.suggestions)
                                .where(i =>
                                  i.name
                                    .toLowerCase()
                                    .startsWith(value.toLowerCase())
                                )
                                .orderBy(i => i.name)
                                .toArray();
                        }}
                        renderSuggestion={(
                          suggestion: AutoCompleteSuggestion
                        ) => {
                          //teach autocomplete how to render suggestion options
                          return (
                            <div>
                              {suggestion.name + " - " + suggestion.year}
                            </div>
                          );
                        }}
                        getSuggestionValue={(
                          suggestion: AutoCompleteSuggestion
                        ) => {
                          //tell autocomplete what string to display in the textbox for the selected option
                          return suggestion === null ? "" : suggestion.name;
                        }}
                        //renderSelectedSuggestionWhenNotSet={true}
                        renderSelectedSuggestion={(
                          suggestion: AutoCompleteSuggestion
                        ) => {
                          return (
                            <div>
                              <div className="row bg-primary text-light">
                                <div className="col-2">Year</div>
                                <div className="col">Name</div>
                              </div>
                              <div className="row">
                                <div className="col-2">
                                  {suggestion == null ? "" : suggestion.year}
                                </div>
                                <div className="col">
                                  {suggestion == null ? "" : suggestion.name}
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
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
