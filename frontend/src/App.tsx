import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import './App.css'
import { useAxios } from './hooks/useAxios'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [body, setBody] = useState("Testing body from react");

  const userId = 1;

  useEffect(() => {
    const fetchUser = async () => {
      await useAxios.get("users/find/" + userId).then((res) => {
        return setUser(res.data)
      })
    }

    fetchUser();
  }, [userId])

  console.log(user)

  const postData = {
    body
  }


  const createPost = async () => {
    return useAxios.post('/posts', postData)
  }

  return (
    <>
     <button onClick={createPost}>Create post</button>
    </>
  )
}

export default App
