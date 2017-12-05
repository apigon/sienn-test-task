import { Repository } from '../../repositoryies/repository';

import { ProductStore } from '../../stores/ProductStore';
import { UserStore } from '../../stores/UserStore';

import { Product } from '../../types/ProductTypes';

export class ProductsViewModel {
    repo: Repository;
    productStore: ProductStore;
    userStore: UserStore

    constructor(productStore: ProductStore, userStore: UserStore) {
        this.repo = new Repository(userStore);
        this.productStore = productStore;
        this.userStore = userStore;
    }

    loadProducts() {
        this.repo.getProducts().then(result => {
            if (result.status === 200) {
                this.productStore.products = result.data.map(p => <Product>{ ...p });
            }
            else {
                this.productStore.products = [];
            }
        }).catch(error => {
            this.productStore.products = [];
        });
    }

    delte(product: Product) {
        this.repo.deleteProduct(product.productID).then(result => {
            if (result.status === 204) {
                this.productStore.products = this.productStore.products.filter(p => p.productID !== product.productID);
            }
        });
    }

    updateProduct(product: Product): any {
        this.repo.updateProduct(product).then(result => {
            if (result.status === 204) {
                const index = this.productStore.products.map(p => p.productID).indexOf(product.productID);
                this.productStore.products[index] = product;
            }
        });
    }

    searchProduct(productId: number) {
        this.repo.searchProduct(productId).then(result => {
            if (result.status === 200) {
                this.productStore.foundProduct = <Product>result.data;
            }
        });
    }

    addProduct(product: Product) {
        this.repo.addProduct(product).then(result => {
            if (result.status === 204) {
                // api does not return id of added product so that I need to refresh list of products
                this.loadProducts();
            }
        });
    }
}