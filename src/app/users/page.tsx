'use client'
import { useSession, signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import {User} from "../../../utils/data.types";

export default function Users() {
    const [listUser, setUserList] = useState<Array<User>>();
    useEffect(() => {
        fetch("http://localhost:3000/api/controller/get")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setUserList(data);
            })
            .catch((error) => console.log({ error }));
    }, []);

    return (
        <div>
            {
                listUser?.map((user:User) => (
                        <ul key={user.id}>
                            <li>ID: {user.id}</li>
                            <li>Email: {user.email}</li>
                            <li>Name: {user.name}</li>
                            <li>Password:{user.password}</li>
                        </ul>
                    ))
            }
        </div>
    );
}
