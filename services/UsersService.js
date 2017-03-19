class UsersService {
    constructor() {
        this.users = []
    }

    getAllUsers() {
        return this.users;
    }

    getAllUsersInRoom(room) {
        return this.users.filter(user => user.room === room);
    }

    getUserById(userId) {
        return this.users.find(user => user.id === userId);
    }

    getUserRoom(userId) {
        const user = this.users.find(user => user.id === userId);
        return user.room;
    }

    addUser(user) {
        this.users = [user, ...this.users];
    }

    removeUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }
}

module.exports = UsersService;