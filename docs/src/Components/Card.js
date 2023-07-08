import './cardStyle.css'

export default function Card({data, originalData, setOriginalData}){

//console.log(originalData)
const markHandler = (todos) => {
    console.log(todos,originalData)
    let original =  originalData && originalData.map((todo) => {
        if(todo.id === todos.id){
            todo.completed = !todo.completed
            return todo
        }
        else return todo
        
    })
    console.log(original)
    setOriginalData(original)
}
    return(
        <div className='cards'>
            {
                 data && data.map((todo,index) => {

                    let state = 'Upcoming'
                    if(todo.completed)
                        state = 'Completed'

                    return (
                        <div key = {index} className='card'>
                    <div className='todo-state'>{state}</div>
                    <div className='todo-title'>{todo.title}</div>
                    <div className='todo-button'>
                        <button
                        style={{backgroundColor: todo.completed ? 'red' : 'white', color: todo.completed ? 'white' : 'red'}}
                        className='mark-button'
                        onClick={() =>  markHandler(todo)}
                        >Mark as Done</button>
                    </div>
                        </div>
                    )
                })
            }
            
        </div>
    )

}