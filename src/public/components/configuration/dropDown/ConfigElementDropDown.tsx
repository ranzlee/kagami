import * as React from "react";
import { FieldRecord } from "./../../../../shared/models/configuration/elements/Field";
import { Textbox } from "../../common/form-elements/Textbox";
import { TextArea } from "../../common/form-elements/TextArea";
import { ExpressionRecord } from "../../../../shared/models/configuration/elements/Expression";
import { Select, SelectProps } from "../../common/form-elements/Select";
import { IConfigElement } from "../../../../shared/models/configuration/elements/IConfigElement";

export interface IOwnProps extends SelectProps {
    configElements: IConfigElement[];
}

export class ConfigElementDropDown extends React.Component<IOwnProps, {}> {

    getExpressionOptions(): JSX.Element[] {
        var returnElements: JSX.Element[] = [];
        returnElements = this.props.configElements.map(i => (<option key={i._id} value={i._id}>{i.name}</option>));
        return returnElements;
    }


    render() {
        const { name, label, placeholderOption, onChange, value, labelColLg, controlColLg, labelColSm, controlColSm, required } = this.props;
        return (
            <div>
                <Select
                    name={name}
                    label={label}
                    placeholderOption={placeholderOption}
                    labelColLg={labelColLg}
                    controlColLg={controlColLg}
                    labelColSm={labelColSm}
                    controlColSm={controlColSm}
                    required={required}
                    onChange={onChange}
                    value={value}
                >
                    {this.getExpressionOptions()}
                </Select>
            </div>
        )
    }
}