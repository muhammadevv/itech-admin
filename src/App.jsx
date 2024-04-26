import { Login } from './pages'
import { AppLayout } from './components'
import useIsAuth from './context/useIsAuth'

function App() {

  const isAuth = useIsAuth()

  return (
    <>
      {
        isAuth ? <AppLayout /> : <Login />
      }
    </>
  )
}

export default App
