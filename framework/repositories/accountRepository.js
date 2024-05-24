

class AccountRepository {

    static CREATE_REPOSITORY() {
        return new AccountRepository();
    }

    static DATABASE = []

    constructor() {
        //does nothing for now since it's not bound to a real DB
    }

    async addUser(user) {
        if (await this.getUserbyUsername(user.username) !== undefined) {
            throw Error("cannot add the user. Duplicate ID.");
        }
        AccountRepository.DATABASE.push(user);
        console.warn(AccountRepository.DATABASE);
        return user;
    }

    async getUserbyUsername(username) {
        //first or default
        let filtered = AccountRepository.DATABASE.filter( x => x.username == username);
        return filtered.length > 0 ? filtered[0] : undefined;
    }

    async dispose() {
        return true;
    }
}


module.exports = AccountRepository.CREATE_REPOSITORY