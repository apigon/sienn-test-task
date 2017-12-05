import { computed, observable } from 'mobx';

export class UserStore {
    @observable authenticationToken;
    @observable loginError;

    constructor() {
        this.authenticationToken = '';
        this.loginError = '';
    }

    @computed get isUserLogedIn() {
        return this.authenticationToken !== '';
    }
}