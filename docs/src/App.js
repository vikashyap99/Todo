
import { useEffect, useState } from 'react'
import './App.css';
import Card from './Components/Card'
function App() {

  const [openDailog, setOpenDailog] = useState(false)
  const [title, setTitle] = useState('')
  const [originalTodo, setOriginalTodo] = useState([])
  const [todoState, setTodoState] = useState('all')
  const [filterData, setFilterData] = useState([])


  useEffect(() => {
    let temptodo = localStorage.getItem('todo')
    if(temptodo)
      setOriginalTodo(JSON.parse(temptodo))
  }, [])

  useEffect(() => {
    if(originalTodo && originalTodo.length > 0)
      localStorage.setItem('todo',JSON.stringify(originalTodo))
  },[originalTodo])

  const createTodo = (event) => {

    let id = 0
    if (originalTodo.length !== 0) {
      id = originalTodo[originalTodo.length - 1].id + 1
    }
    let tempTodo = {
      id: id,
      title: title,
      completed: false
    }
    let tempArr = [...originalTodo, tempTodo]
    // console.log(tempArr, 'temp')
    setOriginalTodo(tempArr)
    console.log()
    localStorage.setItem('todo',JSON.stringify(tempArr))
    setOpenDailog(false)
    setTitle('')
  }

  const filterdataHandler = (state) => {

    setTodoState(state)

    if(originalTodo){
      if(state === 'upcoming'){
        let tempData = originalTodo.filter((todo) => (!todo.completed))
        setFilterData(tempData)
      }
       if(state === 'completed'){
        let tempData = originalTodo.filter((todo) => (todo.completed))
        setFilterData(tempData)
      }
      if(state === 'all') 
        setFilterData(originalTodo)
    }
      
    
    
  }

  useEffect(() => {
    filterdataHandler(todoState)
  }, [originalTodo])

  return (
    <div className="App">
      <header className="App-header">
        ToDo App
      </header>

      <div className='container'>
        <button onClick={() => setOpenDailog(true)} >Create Todo</button>
        <div className='header'>
          <div
            className='header-component'
            style={{borderBottom: todoState === 'all' ? '4px solid red' : '', borderRadius: '4px', cursor: 'pointer'}}
            onClick={() => filterdataHandler('all')}
            >ALL Todo</div>
          <div 
            className='header-component'
            style={{borderBottom: todoState === 'upcoming' ? '4px solid red' : '', borderRadius: '4px', cursor: 'pointer'}}
            onClick={() => filterdataHandler('upcoming')}
          >Upcoming Todo</div>
          <div 
            className='header-component'
            style={{borderBottom: todoState === 'completed' ? '4px solid red' : '', borderRadius: '4px', cursor: 'pointer'}}
            onClick={() => filterdataHandler('completed')}>Completed Todo</div>
        </div>

        <div className='card-container'>
          <Card 
            data={filterData} 
            originalData = {originalTodo}
            setOriginalData = {(value) => setOriginalTodo(value)}
             />
        </div>


      </div>

      <dialog
        open={openDailog}
        className='dailog'
      >
        <div>
          Title : <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={(e) => createTodo(e)}
          >Submit</button>
        </div>
      </dialog>

    </div>
  );
}

export default App;
