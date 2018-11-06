export class User {

    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public username?: string,
        public role?: string,
        public type?: string,
        public password?: string,
        public address?: string,
        public is_wholesale?: boolean,
        public status?: boolean
    ) {}
}
