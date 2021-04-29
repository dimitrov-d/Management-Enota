import bcrypt from 'bcryptjs'

export function User(email, password) {
    this.email = email;
    this.password = bcrypt.encodeBase64(password);
}