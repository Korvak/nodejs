

class AccountRepository {

    static CREATE_REPOSITORY() {
        return new AccountRepository();
    }

    static DATABASE = [
        {
            username: 'giovanni124',
            email: 'giocero@hotmail.it',
            name: 'giovanni',
            surname: 'cero',
            password: '$2b$10$xOpsrh3SZQO9Xw9r0a/HOe30jtDEYblef0wnwGj0xNQnMg5g8moC.'
          }
    ]

    constructor() {
        //does nothing for now since it's not bound to a real DB
    }

    async addUser(user) {
        if (await this.getUserbyUsername(user.username) !== undefined) {
            throw Error("cannot add the user. Duplicate ID.");
        }
        AccountRepository.DATABASE.push(user);
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