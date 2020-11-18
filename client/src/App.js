import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'
import Modal from './components/Modal'
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
  header: {
    title: 'Restaurant Administrating',
    navItem1: 'Add a post',
    navItem2: 'Show employees',
    navItem3: 'Orders'
  }
})

counterpart.registerTranslations('ru', {
  header: {
    title: 'Управление рестораном',
    navItem1: 'Добавить запись',
    navItem2: 'Показать персонал',
    navItem3: 'Заказы'
  }
})


function App() {

  const [allItems, addItem] = useState([{}])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('https://rest-admin.herokuapp.com/get')
      addItem(response.data)
    }
    fetchItems()
  }, [])

  const postData = async (name, surname, lastname, age, rank) => {
    const data = await axios.post('https://rest-admin.herokuapp.com/post', {
      name,
      surname,
      lastname,
      age,
      rank
    })
  }
  

  const [theme, setTheme] = useState('dark')
  const [lang, setLang] = useState(counterpart.setLocale('en'))
  const [modal, setModal] = useState({isOpen: false})


  const [name, setName ] = useState('')
  const [surname, setSurname ] = useState('')
  const [lastname, setLastname ] = useState('')
  const [age, setAge ] = useState('')
  const [rank, setRank ] = useState('')


  

  const openModal = () => {
    setModal({ isOpen: true })
  }

  const handleSubmit = () => {
    console.log('Submit function!')
    setModal({ isOpen: false })
    postData(name, surname, lastname, age, rank)
    console.log({name, surname, lastname, age, rank})
  }

  const handleCancel = () => {
    console.log('Cancel function!')
    setModal({ isOpen: false })
  }


  return (
    <div className={theme==='dark' ? 'app__dark app' : 'app__light app'}>
      <Modal
          title='Добавить работника'
          isOpen={modal['isOpen']}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        >
        <form className='modal__form'>
                <input className='modal__input' placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)}/> 
                <input className='modal__input' placeholder='Фамилия' value={surname} onChange={(e) => setSurname(e.target.value)}/>
                <input className='modal__input' placeholder='Отчество' value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                <input className='modal__input' placeholder='Возраст' value={age} onChange={(e) => setAge(e.target.value)}/>
                <input className='modal__input' placeholder='Должность' value={rank} onChange={(e) => setRank(e.target.value)}/>
        </form>
        </Modal>
      <div className="app__header">
      <div className="app__themes">

        {theme==='dark' ?<Brightness2Icon onClick={()=>setTheme('light')} /> : <Brightness4Icon onClick={()=>setTheme('dark')} />}
      </div>
      <Translate className="app__title" content="header.title" component="h1"/>
      <div className="app__langs">
      {lang==='en'? 
      <div className="app__lang" onClick={()=>setLang(counterpart.setLocale('ru'))}>
        En
      </div> 
      :
      <div className="app__lang" onClick={()=>setLang(counterpart.setLocale('en'))}>
        Ru
      </div>
      }
      </div>
      </div>
      <ul className="app__nav">
        <Translate className="app__navItem" content="header.navItem1" component="li"/>
        <Translate className="app__navItem" content="header.navItem2" component="li"/>
        <Translate className="app__navItem" content="header.navItem3" component="li"/>
      </ul>
      <div className="app__main">
        <h1 className="app__mainTitle">Employees</h1>
        {allItems.map((item, index) => (
          <ul key={index}>
           <li>{item.name ? item.name : 'no name'} {item.surname} {item.lastname ? item.lastname : 'no lastname'} {item.age} {item.rank}</li>
         </ul>
          )
        )}
        <button onClick={openModal}>Add an emloyee</button>
      </div>
    </div>
  );
}

export default App;
