import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import {PlusSquareFill, XSquareFill} from 'react-bootstrap-icons'
import './App.css'

function Todo(){

    const [tasks, setTasks] = useState([]);
    const inputRef = useRef(null);
    const liRef = useRef(null);


    const refreshApp = ()=>{
        setTasks(tasks);
    }
    useEffect(()=>{
        refreshApp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function addTask(name) {
        if(!tasks.includes(name.trim()) && name.trim()!=="" && tasks.length < 5){
            setTasks([...tasks, name.trim()]);
            return;
        }
    }

    const removeTask = (name) => {
        setTasks(tasks.filter(task => task !== name))
    }

    const removeAllTasks = () => {
        setTasks([]);
    }
    
    const handleClickAdd = () => {
        addTask(inputRef.current.value);
    }

    return(
        <div className='holder'>
            <h1>Does it work</h1>
            <div className='inputholder'>
                <input type="text" placeholder='Add your new TODO' id='taskvalue' ref={inputRef} maxLength={31}/>
                <button onClick={() => {handleClickAdd()}}><PlusSquareFill className="plusbtn" /></button>
            </div>
            <div className='taskholder' >
            {tasks.map((task) => {
                return (
                    <ul className='tasklist' key={task}>
                        <li ref={liRef}>{task}</li>
                        <button className='btn' onClick={() => {removeTask(task)}}>
                            <XSquareFill className='xbtn'/>
                        </button>
                    </ul>
                )
                })}
            </div>
            <div className='footer'>
                <span>You have {tasks.length}/5 pending tasks</span>
                <button className='xallbtn' onClick={()=>{removeAllTasks()}}>Clear all</button>
            </div>
        </div>
    )
}

export default Todo;