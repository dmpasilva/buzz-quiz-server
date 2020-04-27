/**
 * A terrible implementation for an in-memory database that does not even check if your session id is unique.
 * This is suitable for testing purposes, but if you intend to use this in production, please implement
 * a proper logic for this.
 * 
 * Eg.: give your users individual IDs and try to ensure they can't ban others from rooms.
 */
export class RoomsDb {
    private static instance: RoomsDb;
    private rooms = { '1111': 1};
    private constructor() {
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RoomsDb();
        }
        return this.instance;
    }

    join(room: string) {
        if (this.roomExists(room)) {
            this.rooms[room] += 1;
            return true;
        }
        return false;
    }

    leave(room: string) {
        if (this.roomExists(room)) {
            let nUsers = this.rooms[room] - 1;
            if (nUsers <= 0) {
                delete this.rooms[room];
            }
        }
        return true;
    }

    private roomExists(room: string) {
        return !!this.rooms[room];
    }

    /**
     * This is a terrible way of solving this problem.
     * We must ensure that the user leaves a room eventually otherwise we will keep getting a
     * stupidly large amount of rooms in memory.
     * 
     * Also, when a room is being checked it may be assigned to another user.
     * Though I don't think this is possible in JavaScript.
     */
    generateRoom() {
        let room = this.generateRoomNumber();
        while (!!this.rooms[room]) {
            room = this.generateRoomNumber();
        }
        this.rooms[room] = 1;
        return room;
    }

    private generateRoomNumber() {
        let roomNumber = '';
        for (let i = 0; i < 4; i++) {
            roomNumber += '' + this.getRandomInt();
        }

        return roomNumber;
    }

    private getRandomInt() {
        const min = 1;
        const max = 4;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}