import bcrypt from 'bcryptjs'

export function User(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.password = bcrypt.hashSync(data.password, 10);
}