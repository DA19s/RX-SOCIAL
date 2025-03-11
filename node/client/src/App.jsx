import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Signup from './pages/Signup'
import Dashboard from './pages/dashboard'
import CreatePost from './pages/create-post';
import User from './pages/user';
import Chat from './pages/chat';
import Conv from './pages/conv';

//import { getProducts } from '../../controllers/product.controller'
function App() {
  return (
    <div>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user/:posterId" element={<User />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/conv/:posterId" element={<Conv />} />
      </Routes>
    </div>
  )
 /* const title = 'Bonjour'
  const handleClik = () => {
    alert("J'ai cliqué")
  }
  return <h1 onClick={handleClik} style={{color: 'red'}}>{title}</h1>

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
    .then(res => {
    console.log('REPONSE', res.data)
    setItems(res.data)
  })
  
    .catch(err => console.error("Erreur lors de l'appel API :", err))
  }, [])

  return (
    <div>
      <h1> Liste des produits</h1>
      <ul>
        {items.map(products => (
          <li key = {products._id}>{products.name}{products.quantity}{products.price}</li>
        ))}
      </ul>
    </div>
  )*/
}
  



export default App
