import { useEffect, useRef, useState } from "react"
import { type User } from "./types.d"
import UsersList from "./compoennts/UsersList"
import RestoreUsers from "./compoennts/RestoreUsers"

const ENDPOINT = "/api.json"

export default function App() {
    const [users, setUsers] = useState<User[]>([])
    const [showColors, setShowColors] = useState(false)
    const [sortByCountry, setSortByCountry] = useState(false)
    const originalUsers = useRef<User[]>([])

    const handleColors = () => {
        setShowColors(!showColors)
    }
    const toggleSortByCountry = () => {
        setSortByCountry(state => !state)
    }

    const handleReset = () => {
      setUsers(originalUsers.current)
    }
    const handleDelete = (uuid: string) => {
        const filteredUsers = users.filter((user) => user.login.uuid !== uuid)

        setUsers(filteredUsers)
    }
    useEffect(() => {
        fetch(ENDPOINT)
            .then(async (res: any) => await res.json())
            .then((res: any) => {
                setUsers(res.results)
                originalUsers.current = res.results
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const sortedUsers = sortByCountry
        ? users.toSorted((a, b) => {
              return a.location.country.localeCompare(b.location.country)
          })
        : users

    return (
        <div className="app">
            <h1>lista de usuarios</h1>
            <div className="filters">
                <button onClick={handleColors}>Colorear</button>
                <button onClick={toggleSortByCountry}>
                    {sortByCountry ? "No ordenar por país" : "Ordenar países"}
                </button>
                <button onClick={handleReset}>
                  Reiniciar lista
                  </button>

            </div>
            <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
        </div>
    )
}
