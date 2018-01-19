import * as React from "react";
import { Textbox } from "./common/form-elements/Textbox";
import { Numberbox } from "./common/form-elements/Numberbox";

export interface FormSubComponentExampleState {
  myTextboxState: string;
  myNumberState: number;
}

export interface FormSubComponentExampleProps {}

export class FormSubComponentExample extends React.Component<
  FormSubComponentExampleProps,
  FormSubComponentExampleState
> {
  constructor(props: FormSubComponentExampleProps) {
    super(props);
    this.state = {
      myTextboxState: "aaaa",
      myNumberState: 100
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <Textbox
            form={(this as any).props.form}
            doCustomValidationOnMount={
              (this as any).props.doCustomValidationOnMount
            }
            type="text"
            label="My Textbox"
            value={this.state.myTextboxState}
            placeholder="Enter 'aaaa'"
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ myTextboxState: event.currentTarget.value });
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
            form={(this as any).props.form}
            doCustomValidationOnMount={
              (this as any).props.doCustomValidationOnMount
            }
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
    );
  }
}
