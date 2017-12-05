import axios from 'axios';

import { Product } from '../Types/ProductTypes';

import { UserStore } from '../stores/UserStore';

export class Repository {
    url: string;
    userStore: UserStore;

    constructor(userStore: UserStore) {
        this.url = 'http://recruits.siennsoft.com/api';
        this.userStore = userStore;
    }

    public login(login: string, password: string) {
        const formData = new FormData();
        formData.append('UserName', login);
        formData.append('Password', password);
        return axios.post(this.url + '/jwt', formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/plain'
                }
            });
    }

    public getProducts() {
        return axios.get(this.getProductsUrl(), this.generateHeaders());
    }

    public addProduct(product: Product) {
        return axios.post(this.getProductsUrl(), {
            "productID": product.productID,
            "name": product.name,
            "price": product.price,
            "description": product.description
        }, this.generateHeaders())
    }

    public deleteProduct(productId) {
        return axios.delete(this.getProductsUrl(productId), this.generateHeaders());
    }

    public updateProduct(product: Product) {
        return axios.put(this.getProductsUrl(product.productID),
            {
                "productID": product.productID,
                "name": product.name,
                "price": product.price,
                "description": product.description
            },
            this.generateHeaders())
    }

    public searchProduct(productId) {
        return axios.get(this.getProductsUrl(productId), this.generateHeaders());
    }

    private getProductsUrl(id?: number) {
        return this.url + '/products' + (id ? '/' + id : '');
    }

    private generateHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.userStore.authenticationToken
            }
        };
    }
}