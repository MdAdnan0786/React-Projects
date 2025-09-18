import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

export function Profile(props) {
    const {user} = useContext(UserContext)

    if(!user) return <div>please login</div>

    return <div>Welcome {user}</div>
}
