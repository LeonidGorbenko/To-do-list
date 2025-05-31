import React, { useEffect, useState } from 'react';

function ToDoList() {

function getStoredToDos() {
  const dataTodos = localStorage.getItem("dataTodos");
  try {
    return dataTodos ? JSON.parse(dataTodos) : [];
  } catch (e) {
    console.error("localStorage dataTodos parsing error:", e);
    return [];
  }
}

function getStoredHistory() {
    const dataHistory=localStorage.getItem('dataHistory');
    try {
        return dataHistory ? JSON.parse(dataHistory): []
    } catch (e) {
        console.error("localStorage dataHistory parsing error:", e);
        return [];
    }
}

  const [tasks, setTasks] = useState(getStoredToDos());
  const [newTask, setNewTask] = useState('');
  const [history, setHistory] = useState(getStoredHistory());


    useEffect(()=>{
    localStorage.setItem('dataTodos', JSON.stringify(tasks))
        }, [tasks])

    useEffect(()=>{
    localStorage.setItem('dataHistory', JSON.stringify(history))
        }, [history])


  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addHistoryEntry(action, task) {
    const entry = {
      action,
      task,
      time: new Date().toLocaleTimeString(),
    };
    setHistory(prev => {
  const updated = [entry, ...prev];
  return updated.slice(0, 10); 
});

  }

  function addTask() {
    const task = newTask.trim();
    if (!task) return;
    setTasks(prev => [...prev, task]);
    addHistoryEntry('add', task);
    setNewTask('');
  }

  function deleteTask(index) {
    const taskToDelete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    addHistoryEntry('delete', taskToDelete);
  }

  function moveUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
      addHistoryEntry('move up', tasks[index]);
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
      addHistoryEntry('move down', tasks[index]);
    }
  }

  return (
    <div className='to-do-list'>
      <h1>To-do List</h1>

      <div>
        <input
          type="text"
          placeholder='Enter the task'
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
        />
        <button className='add button' onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            <span className='text'>{task}</span>
            <button className='up button' onClick={() => moveUp(index)}>Up</button>
            <button className='down button' onClick={() => moveDown(index)}>Down</button>
            <button className='delete button' onClick={() => deleteTask(index)}>Delete</button>
          </li>
        )}
      </ol>

      <div className='history-container'>
        <h3>History</h3>
        <ul>
          {history.map((h, index) => (
            <li key={index}>
              [{h.time}] {h.action.toUpperCase()}: "{h.task}"
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
