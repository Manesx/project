import React, {Component} from "react";


export default class IdentificationInput extends Component {

    state = {
        value: '',
        is_correctly: false
    };

    constructor(props) {
        super(props);
        this.fieldChange = this.fieldChange.bind(this);
        this.isCorrect = this.isCorrect.bind(this);
    }

    checkDigit(inn, coefficients) {
        let n = 0;
        coefficients.forEach(function (item, id) {
            n += item * parseInt(inn[id]);
        });
        return n % 11 % 10;
    }

    isCorrect() {
        if (this.state.is_correctly) {
            return 'success_input mt-2';
        } else if (this.state.value.length > 0) {
            return 'fail_input mt-2';
        }
        return 'mt-2';
    }

    fieldChange(event) {
        let is_correctly = false;
        const value = event.target.value;
        if (/^(?:\d{10}|\d{12}|\d{13})$/.test(value)) {
            if (value.length === 10) {
                if (this.checkDigit(value, [2, 4, 10, 3, 5, 9, 4, 6, 8]) === parseInt(value[9])) {
                    is_correctly = true;
                    this.props.setTin(value);
                }
            } else if (value.length === 12) {
                let n11 = this.checkDigit(value, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                let n12 = this.checkDigit(value, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if ((n11 === parseInt(value[10])) && (n12 === parseInt(value[11]))) {
                    is_correctly = true;
                    this.props.setTin(value);
                }
            } else if (value.length === 13) {
                let n13 = parseInt((parseInt(value.slice(0, -1)) % 11).toString().slice(-1));
                if (n13 === parseInt(value[12])) {
                    is_correctly = true;
                    this.props.setBin(value);
                }
            }
        } else {
            this.props.setTin(null);
            this.props.setBin(null);
        }
        this.setState({
            value: value,
            is_correctly: is_correctly
        });
    }

    render() {
        return <input type="text" autoComplete={"off"} className={this.isCorrect()} placeholder={this.props.placeholder}
                      onChange={this.fieldChange} value={this.state.value} required="required"/>;
    }
}