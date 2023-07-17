import { type User } from "../types"

interface Props {
    users: User[]
    showColors: boolean
    deleteUser: (user: string) => void
}

export default function UsersList({ users, showColors, deleteUser }: Props) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: User, index: number) => {
                    const bgColor = index % 2 === 0 ? "#333" : "#555"
                    const color = showColors ? bgColor : "transparent"
                    return (
                        <tr
                            key={user.login.uuid}
                            style={{ backgroundColor: color}}
                        >
                            <td>
                                <img src={user.picture.thumbnail} />
                            </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={() => {
                                    deleteUser(user.login.uuid)
                                }}>
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
