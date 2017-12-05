import * as React from 'react';

import { Product } from '../../types/ProductTypes';

import { ProductsViewModel } from './Product.ViewModel';
import { ProductPopupComponent } from '../ProductPopup/ProductPopupComponent';

import './ProductComponent.css'

interface IProductComponentProps {
    product: Product,
    productViewModel: ProductsViewModel
}

interface IProductComponentState {
    confirmDelete: boolean,
    showPopup: boolean
}
export class ProductComponent extends React.Component<IProductComponentProps, IProductComponentState>{
    constructor() {
        super();
        this.state = {
            confirmDelete: false,
            showPopup: false
        };
    }

    onUpdateClicked = (event) => {
        this.setState({ showPopup: true });
    };

    onDeleteClicked = (event) => {
        event.preventDefault();
        this.setState({ confirmDelete: true });
    };

    onCacleClicked = (event) => {
        event.preventDefault();
        this.setState({ confirmDelete: false });
    }

    onConfirmClicked = (event) => {
        event.preventDefault();
        this.setState({ confirmDelete: false });
        this.props.productViewModel.delte(this.props.product);
    }

    updateProduct(product: Product) {
        this.props.productViewModel.updateProduct(product);
        this.setState({ showPopup: false });
    }

    render() {
        return (
            <div className='col-sm-12 col-md-4 col-lg-3'>
                <div className='product'>
                    <div className='row product-details scroll'>
                        <div>
                            <label><strong>Product Name:</strong></label> <br />
                            <label className='value'>{this.props.product.name}</label>
                        </div>
                        <div>
                            <label><strong>Product Description:</strong></label> <br />
                            <label className='value'>{this.props.product.description}</label>
                        </div>
                        <div>
                            <label><strong>Product Price:</strong></label> <br />
                            <label className='value'>{this.props.product.price}</label>
                        </div>
                    </div>

                    {!this.state.confirmDelete && <div className='row'>
                        <div className='col-sm-6'>
                            <button className='btn btn-primary' onClick={this.onDeleteClicked}>Delete</button>
                        </div>
                        <div className='col-sm-6'>
                            <button className='btn btn-default' onClick={this.onUpdateClicked}>Update</button>
                        </div>
                    </div>}

                    {this.state.confirmDelete && <div className='row'>
                        <div className='col-sm-6'>
                            <button className='btn btn-primary' onClick={this.onConfirmClicked}>Confirm</button>
                        </div>
                        <div className='col-sm-6'>
                            <button className='btn btn-default' onClick={this.onCacleClicked}>Cancel</button>
                        </div>
                    </div>}
                </div>
                {this.state.showPopup &&
                    <ProductPopupComponent
                        product={this.props.product}
                        close={() => { this.setState({ showPopup: false }) }}
                        submit={(product) => this.updateProduct(product)} />
                }
            </div>);
    }
}