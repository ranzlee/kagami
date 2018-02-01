import * as React from "react";
import * as ReactDOM from "react-dom";
import * as FormControl from "./FormControl";
import * as lodash from "lodash";
import * as Autosuggest from "react-autosuggest";
import { FormEvent } from "react";
import * as $ from "jquery";

export interface AutoCompleteState extends FormControl.FormControlState {
  suggestions: Array<any>;
  value: string;
}

export interface AutoCompleteProps extends FormControl.FormControlProps {
  required?: boolean;
  value: any;
  placeholder: string;
  suggestionsContainerMaxHeight?: number;
  suggestionsContainerPosition?: "top" | "bottom";
  getSuggestions: (
    reason:
      | "input-changed"
      | "input-focused"
      | "escape-pressed"
      | "suggestions-revealed"
      | "suggestion-selected",
    value: string
  ) => Array<any> | null;
  getSuggestionValue: (suggestion: any) => string;
  renderSuggestion: (suggestion: any) => React.ReactElement<any>;
  onChange?: (suggestion: any) => void;
  onChangeCustomValidation?: (
    suggestion: any
  ) => FormControl.CustomValidationResult;
}

export class AutoComplete extends React.Component<
  AutoCompleteProps,
  AutoCompleteState
> {
  constructor(props: AutoCompleteProps) {
    super(props);
    this.state = {
      suggestions: [],
      value: "",
      invalidFeedback: this.props.invalidFeedback
    };
    this.id = lodash.uniqueId(this.props.id);
  }

  componentDidMount() {
    if (this.props.doCustomValidationOnMount) {
      FormControl.OnChangeCustomValidation(
        this,
        this.inputInstance,
        this.props.value
      );
    }
    if (this.props.form) {
      this.props.form.registerFormCustomValidations(this, this.inputInstance);
    }
  }

  id: string;
  inputInstance: HTMLInputElement;
  containerInstance: HTMLDivElement;

  onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    autosuggestChange: Autosuggest.ChangeEvent
  ) => {
    if (autosuggestChange.newValue.trim() === "") {
      this.setState({ value: "" });
    } else {
      this.setState({ value: autosuggestChange.newValue });
    }
  };

  onSuggestionsFetchRequested = (
    query: Autosuggest.SuggestionsFetchRequestedParams
  ) => {
    if (this.props.value != null) {
      this.setState({ suggestions: [] });
      return;
    }
    let results = this.props.getSuggestions(query.reason, query.value);
    if (results == null || results.length == null || results.length < 1) {
      this.setState({ value: "" });
    } else {
      this.setState({ suggestions: results });
    }
  };

  onSuggestionSelected = (
    event: FormEvent<any>,
    data: Autosuggest.SuggestionSelectedEventData<any>
  ) => {
    this.setState(
      {
        value: this.props.getSuggestionValue(data.suggestion)
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(data.suggestion);
        }
        if (this.props.onChangeCustomValidation) {
          FormControl.OnChangeCustomValidation(
            this,
            this.inputInstance,
            data.suggestion
          );
        }
      }
    );
  };

  onSuggestionsClearRequested = () => {
    if (this.props.value == null) {
      this.setState({
        value: "",
        suggestions: []
      });
    } else {
      this.setState({ suggestions: [] });
    }
  };

  renderSuggestion = (suggestion: any) => {
    if (this.props.renderSuggestion) {
      return this.props.renderSuggestion(suggestion);
    } else {
      return <></>;
    }
  };

  renderSuggestionsContainer = (
    params: Autosuggest.RenderSuggestionsContainerParams
  ) => {
    let stylePosition =
      this.props.suggestionsContainerPosition == null ||
      this.props.suggestionsContainerPosition === "top"
        ? { bottom: "43px" }
        : { top: "43px" };
    let styleMaxHeight = {
      maxHeight: this.props.suggestionsContainerMaxHeight
        ? this.props.suggestionsContainerMaxHeight + "px"
        : "200px"
    };
    let style: any = {
      ...stylePosition,
      ...styleMaxHeight,
      display: "block",
      position: "absolute",
      width: "100%",
      fontWeight: 300,
      zIndex: 9999999,
      overflowY: "auto"
    };
    return (
      <div
        {...params.containerProps}
        ref={instance => {
          this.containerInstance = instance;
          params.containerProps.ref(instance);
        }}
        style={style}
      >
        {params.children}
      </div>
    );
  };

  onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.inputInstance) {
      this.inputInstance.focus();
    }
    if (this.props.value == null) return;
    let proceed = true;
    if (this.props.onChange) {
      this.setState(
        { value: "", invalidFeedback: this.props.invalidFeedback },
        () => {
          this.props.onChange(null);
        }
      );
    }
  };

  renderInputComponent = (inputProps: any) => {
    delete inputProps.className;
    let required = this.props.required ? true : false;
    let disabled =
      this.props.disabled != null
        ? this.props.disabled
        : this.props.form && this.props.form.props.disabled != null
          ? this.props.form.props.disabled
          : false;
    let readOnly =
      this.props.readOnly != null
        ? this.props.readOnly
        : this.props.form && this.props.form.props.readOnly != null
          ? this.props.form.props.readOnly
          : false;
    let buttonStyle = { marginTop: 0, marginBottom: 0 };
    return (
      <div className="input-group">
        <input
          {...inputProps}
          ref={instance => {
            this.inputInstance = instance;
            inputProps.ref(instance);
          }}
          className="form-control"
          id={this.id}
          name={this.props.name}
          type="text"
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
        <div className="input-group-append">
          <button
            style={buttonStyle}
            type="button"
            disabled={disabled || readOnly}
            onClick={this.onRemove}
            className="btn btn-primary btn-icon"
          >
            <i className="fas fa-trash" />
          </button>
        </div>
        <div className="invalid-feedback">
          {this.state.invalidFeedback ? this.state.invalidFeedback : ""}
        </div>
      </div>
    );
  };

  render() {
    let inputProps = {
      placeholder: this.props.placeholder,
      value:
        this.props.value != null
          ? this.props.getSuggestionValue(this.props.value)
          : this.state.value,
      onChange: this.onChange
    };
    let extendedProps = FormControl.FormControlExtendedProperties(this.props);
    return (
      <div className="row form-group">
        <label className={extendedProps.labelClasses} htmlFor={this.id}>
          {this.props.label}
        </label>
        <div className={extendedProps.formControlClasses}>
          <Autosuggest
            id={this.id}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.props.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            renderInputComponent={this.renderInputComponent}
            onSuggestionSelected={this.onSuggestionSelected}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
          />
        </div>
      </div>
    );
  }
}
