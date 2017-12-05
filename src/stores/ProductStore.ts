import { observable } from 'mobx';

import { Product } from '../Types/ProductTypes';

export class ProductStore {
    @observable products: Product[];
    @observable foundProduct: Product;

    constructor() {
        this.products = [];
        this.foundProduct = null;
    }
}