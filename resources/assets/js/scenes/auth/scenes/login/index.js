import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { loginAction } from "../../../../services/actions/auth"
import BasicField from '../../../../components/form/BasicField'
import SubmitBtn from '../../../../components/form/SubmitBtn'

class Login extends Component {

    static formFieldsConfig = {
        email: {
            name: 'email',
            label: 'EMAIL',
            placeholder: 'Enter your email.'
        },
        password: {
            name: 'password',
            label: 'PASSWORD',
            placeholder: 'Fill your password.',
            type: 'password'
        },
    }

    onSubmit(values) {
        return this.props.loginAction(values)
    }

    renderFields() {
        return _.map(Login.formFieldsConfig, (options) => {
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
                        Login
                    </h2>

                    <hr className="h-px bg-grey-lighter my-6"/>

                    {this.renderFields()}

                    <div className="flex justify-between">
                        <SubmitBtn className="btn btn-red" submitting={this.props.submitting}>
                            Sign In
                        </SubmitBtn>
                        <Link to="/register" className="btn btn-link">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        )
    }

}

export default reduxForm({
    form: 'auth/loginForm',
    fields: _.keys(Login.formFieldsConfig)
})(
    connect(null, { loginAction })(Login)
)