import * as React from "react";
import * as ReactDOM from "react-dom";

export interface SocialLoginButtonState {}

export interface SocialLoginButtonProps {
  socialService: "facebook" | "google";
  href: string;
}

export class SocialLoginButton extends React.Component<
  SocialLoginButtonProps,
  SocialLoginButtonState
> {
  constructor(props: SocialLoginButtonProps) {
    super(props);
    this.state = {};
  }

  render() {
    let anchorClasses = "btn btn-block btn-social ";
    let iconClasses = "fab ";
    let socialLabel = "";
    switch (this.props.socialService) {
      case "facebook":
        anchorClasses += "btn-facebook";
        iconClasses += "fa-facebook-f";
        socialLabel = "Facebook";
        break;
      default:
        //google
        anchorClasses += "btn-google";
        iconClasses += "fa-google";
        socialLabel = "Google";
        break;
    }
    return (
      <div>
        <a className={anchorClasses} href={this.props.href}>
          <i className={iconClasses} aria-hidden="true" />Login with&nbsp;{
            socialLabel
          }
        </a>
      </div>
    );
  }
}
