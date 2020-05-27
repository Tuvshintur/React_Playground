import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import classes from "./Auth.css";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email",
                },
                errormessage: "Please Enter Valid email",
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                errormessage: "Please Enter Valid password",
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
    };

    checkValidity(value, rule) {
        let isValid = true;

        if (!rule) {
            return true;
        }

        if (rule.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid;
        }

        if (rule.maxLength) {
            isValid = value.length <= rule.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            },
        };

        this.setState({ controls: updatedControls });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                errormessage={formElement.config.errormessage}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;
