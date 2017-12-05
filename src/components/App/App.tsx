import { observer } from 'mobx-react'
import * as React from 'react';

import { ProductStore } from '../../stores/ProductStore';
import { UserStore } from '../../stores/UserStore';

import { LoginComponent } from '../LoginPage/LoginComponent';
import { LoginComponentViewModel } from '../LoginPage/LoginComponent.ViewModel';
import { ProductsPageComponent } from '../ProductsPage/ProductsPageComponent';
import { ProductsViewModel } from '../ProductsPage/Product.ViewModel';

import './App.css';

@observer
export class App extends React.Component<{ userStore: UserStore, prodctStore: ProductStore }, {}>{

    loginComponentViewModel: LoginComponentViewModel;


    constructor(props) {
        super(props);
        this.loginComponentViewModel = new LoginComponentViewModel(this.props.userStore);
    }

    onClick = (event) => {
        event.preventDefault();
        this.props.userStore.authenticationToken = '';
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='page-header row'>
                    <div className='col-sm-12'>
                        <div>
                            <h1>Test Task for <img className='logo' src='http://www.sienn.pl/siennpolandnewwebsite/upload/1logo-header.png' />
                                {this.props.userStore.isUserLogedIn &&
                                    <button className='btn btn-default pull-right' onClick={this.onClick}>Log out</button>
                                }
                            </h1>
                        </div>
                    </div>

                </div>
                <div className='row'>
                    {this.props.userStore.isUserLogedIn ?
                        <ProductsPageComponent
                            productStore={this.props.prodctStore}
                            viewModel={new ProductsViewModel(this.props.prodctStore, this.props.userStore)} />
                        : <LoginComponent viewModel={this.loginComponentViewModel} userStore={this.props.userStore} />}
                </div>
            </div>
        );
    }
}