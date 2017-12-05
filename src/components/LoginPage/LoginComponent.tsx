import { observer } from 'mobx-react';
import * as React from 'react';

import { UserStore } from '../../stores/UserStore';

import { LoginComponentViewModel } from './LoginComponent.ViewModel';

import './LoginComponent.css';

@observer
export class LoginComponent extends React.Component<{ viewModel: LoginComponentViewModel, userStore: UserStore },
{ login: string, password: string, errorMessage: string }> {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            errorMessage: ''
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.viewModel.logIn(this.state.login, this.state.password);
    };

    onLoginChange = (event) => {
        this.setState({ login: event.target.value });
    }

    onPasswordChage = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className='col-sm-12 col-md-4 col-md-offset-4  login-component'>
                <form className='form-group' onSubmit={this.onSubmit}>
                    <h2>Please Log in</h2>
                    Login<br />
                    <input type='text' className='form-control' onChange={this.onLoginChange} value={this.state.login} required minLength={3} /> <br />
                    Password<br />
                    <input type='password' className='form-control' onChange={this.onPasswordChage} value={this.state.password} required minLength={3} pattern=".*[A-Z]+.*" />
                    <input type='submit' className='btn btn-primary' value='Log in' />
                </form>
                {!this.props.userStore.isUserLogedIn && this.props.userStore.loginError &&
                    <div><label className='error-message'>{this.props.userStore.loginError}</label></div>}
            </div>

        );
    }
}