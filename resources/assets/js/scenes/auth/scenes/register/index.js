import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { registerAction } from "../../../../services/actions/auth"
import BasicField from '../../../../components/form/BasicField'
import SubmitBtn from '../../../../components/form/SubmitBtn'

class Register extends Component {

    static formFieldsConfig = {
        name: {
            name: 'name',
            label: 'NAME',
            placeholder: 'Enter your full name.'
        },
        email: {
            name: 'email',
            label: 'EMAIL',
            placeholder: 'Enter your email.'
        },
        password: {
            name: 'password',
            label: 'PASSWORD',
            placeholder: 'Choose your password.',
            type: 'password'
        },
    }

    onSubmit(values) {
        return this.props.registerAction(values)
    }

    renderFields() {
        return _.map(Register.formFieldsConfig, (options) => {
            return (
                <Field component={BasicField} key={options.name} {...options}/>
            )
        })
    }

    render() {
        return (
            <div className="w-3/5 shadow p-6 bg-white" style={{ marginBottom: 130 }}>
                <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                    <h2 className="font-light font-serif tracking-wide uppercase">
                        Register
                    </h2>

                    <hr className="h-px bg-grey-lighter my-6"/>

                    {this.renderFields()}

                    {this.props.error && <div className="text-red-light text-xs text-center mb-4">{this.props.error}</div>}

                    <div className="flex justify-between">
                        <SubmitBtn className="btn btn-red" submitting={this.props.submitting}>
                            Sign Up
                        </SubmitBtn>
                        <Link to="/login" className="btn btn-link">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        )
    }

}

export default reduxForm({
    form: 'auth/registerForm',
    fields: _.keys(Register.formFieldsConfig)
})(
    connect(null, { registerAction })(Register)
)
