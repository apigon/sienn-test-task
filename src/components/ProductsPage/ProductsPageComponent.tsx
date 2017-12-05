import { observer } from 'mobx-react';
import * as React from 'react';

import { ProductStore } from '../../stores/ProductStore';

import { Product } from '../../types/ProductTypes';

import { ProductComponent } from './ProductCommponent';
import { ProductPopupComponent } from '../ProductPopup/ProductPopupComponent';
import { ProductsViewModel } from './Product.ViewModel'

import './ProductsPageComponent.css';

interface IProductPageComponentProps {
    productStore: ProductStore,
    viewModel: ProductsViewModel
}


interface IProductPageComponentState {
    searchProductId: string,
    showProductAddPopup: boolean
}

@observer
export class ProductsPageComponent extends React.Component<IProductPageComponentProps, IProductPageComponentState> {
    constructor() {
        super();
        this.state = {
            searchProductId: '',
            showProductAddPopup: false,
        }
    }
    componentWillMount() {
        this.props.viewModel.loadProducts();
    }

    addProductClick = () => {
        this.setState({ showProductAddPopup: true });
    }

    searchProduct = () => {
        this.props.viewModel.searchProduct(parseInt(this.state.searchProductId));
    }

    addProduct = (product: Product) => {
        this.props.viewModel.addProduct(product);
        this.setState({ showProductAddPopup: false });
    }

    closeSearchPopup = () => {
        this.props.productStore.foundProduct = null;
        this.setState({ searchProductId: '' });
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='actions-row'>
                        <div className='product-search form-group'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Get product by id'
                                value={this.state.searchProductId}
                                onChange={(event) => this.setState({ searchProductId: event.target.value })} />
                            <input type='submit' className='btn btn-default' value='Search' onClick={this.searchProduct} />
                        </div>
                        <button className='btn btn-primary' onClick={this.addProductClick}>Add Product</button>
                    </div>
                </div>

                <div className='row'>
                    {this.props.productStore.products.map((p, i) => { return <ProductComponent product={p} key={i} productViewModel={this.props.viewModel} /> })}
                </div>
                {this.state.showProductAddPopup &&
                    <ProductPopupComponent
                        close={() => this.setState({ showProductAddPopup: false })}
                        submit={(product: Product) => this.addProduct(product)} />
                }
                {this.props.productStore.foundProduct &&
                    <ProductPopupComponent
                        close={() => this.closeSearchPopup()}
                        submit={(product: Product) => { }}
                        hideSubmit={true}
                        product={this.props.productStore.foundProduct} />
                }
            </div>
        );
    }
};