import React, { useState, useEffect } from 'react';

export default function Homepage()
{
    const [user, setUser] = useState([]);
    console.log(user);
    console.log(user.length);

    useEffect(() => {
        fetch('/try?name=Tsahi')
        .then(res => res.json())
        .then(user => setUser(user));
    }, []);

    return (
        <div>
            {user.length === 1 ? 
            <div>
                <h1>{user[0].name}</h1>
                <img src={user[0].image} />
            </div> : 'null'}
        </div>
    )
}
