import { LoginComponent } from "./LoginComponent";
import { Repository } from '../../repositoryies/repository'
import { UserStore } from "../../stores/UserStore";

export class LoginComponentViewModel {
    repo: Repository;
    userStore: UserStore;

    constructor(userStore: UserStore) {
        this.repo = new Repository(userStore);
        this.userStore = userStore;
    }

    public logIn(login: string, password: string) {
        this.userStore.loginError = '';
        this.repo.login(login, password).then(result => {
            if (result.status === 200) {
                this.userStore.authenticationToken = result.data.access_token;
            } else { this.userStore.authenticationToken = '' }
        }).catch(() => {
            this.userStore.authenticationToken = '';
            this.userStore.loginError = 'Incorrect Login or Password'
        });
    }
}