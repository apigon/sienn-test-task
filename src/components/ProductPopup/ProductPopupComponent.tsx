import * as React from 'react';

import { Product } from '../../types/ProductTypes';

import './ProductPopupComponent.css';

interface IProductPopupState {
    productID: number;
    name: string;
    price: number;
    description: string;
}

interface IProductPopupProps {
    product?: Product,
    hideSubmit?: boolean,
    close(): void,
    submit(product: Product)

}

export class ProductPopupComponent extends React.Component<IProductPopupProps, IProductPopupState>{
    constructor(props) {
        super(props);
        const product = this.props.product;

        if (product) {
            this.state = {
                productID: product.productID,
                name: product.name,
                description: product.description,
                price: product.price
            };
        } else {
            this.state = {
                productID: 0,
                name: '',
                description: '',
                price: 0
            };
        }
    }

    onCancelClick = (event) => {
        event.preventDefault();
        this.props.close();
    };

    onSubmitClicked = () => {
        this.props.submit({ ...this.state } as Product);
    }


    setName = (event) => {
        this.setState({ name: event.target.value });
    };


    setId = (event) => {
        this.setState({ productID: event.target.value });
    };

    setDescription = (event) => {
        this.setState({ description: event.target.value });
    };


    setPrice = (event) => {
        this.setState({ price: event.target.value });
    };

    render() {
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <div className='form-group'>
                        <div className='row'>
                            <label>Product name</label> <br />
                            <input className='form-control' type='text' value={this.state.name} onChange={this.setName} />
                        </div>
                        <div className='row'>
                            <label>Product id</label> <br />
                            <input className='form-control' type='text' value={this.state.productID} disabled={true} />
                        </div>
                        <div className='row'>
                            <label>Product description</label> <br />
                            <input className='form-control' type='text' value={this.state.description} onChange={this.setDescription} />
                        </div>
                        <div className='row'>
                            <label>Product price</label> <br />
                            <input className='form-control' type='text' value={this.state.price} onChange={this.setPrice} />
                        </div>
                        <div className='row buttons'>
                            <div className='col-sm-6'>
                                {!this.props.hideSubmit &&
                                    <input className='btn btn-primary' type='submit' value='Submit' onClick={this.onSubmitClicked} />}
                            </div>
                            <div className='col-sm-6'>
                                <button className='btn btn-defaul' onClick={this.onCancelClick}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}