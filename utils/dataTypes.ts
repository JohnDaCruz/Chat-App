export type User = {
    id:number,
    email:string,
    name:string,
    password:string
    message: Array<string>
}
export type User_id_message = Omit<User, 'id' | 'message'>;
