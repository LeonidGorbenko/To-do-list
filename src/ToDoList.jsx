import React, {useState} from 'react'

function ToDoList() {

    const[tasks,setTasks]=useState(['werwer','ersedf','weqweqw'])
    const[newTask, setNewTask]=useState("")

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function addTask(){
        if(newTask.trim() !== "" ){
        setTasks(t=>[...t,newTask]);
        setNewTask("");
    }
    }
    
    function deleteTask(index){
        const updatedTasks=tasks.filter((element, i) => i!==index);
        setTasks(updatedTasks)
    }

    function moveUp(index){
        if (index > 0){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index -1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    function moveDown(index){
            if (index < tasks.length-1){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index +1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }
    
  return (
    <div className='to-do-list'>
        <h1> To-do List</h1>
        <div>
            <input type="text" placeholder='Enter the task'
             value={newTask}
              onChange={handleInputChange}
              onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }} />
            <button className='add button' onClick={addTask}>add</button>
            
        </div>
        <ol>
            {tasks.map((task,index)=>
            <li key={index}>
                <span className='text'>{task}</span>
                <button className='up button' onClick={() =>moveUp(index)}>Up</button>
                <button className='down button' onClick={() =>moveDown(index)}>Down</button>
                <button className='delete button' onClick={ () =>deleteTask(index)}>delete</button>
                
            </li>)}
        </ol>
    </div>
  )
}

export default ToDoList