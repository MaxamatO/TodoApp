import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { PlusSquareFill, XSquareFill, CheckSquareFill } from "react-bootstrap-icons";
import "./App.css";
import { motion } from "framer-motion";
import TaskPopup from "./TaskPopup";

function Todo() {
  const [tasks, setTasks] = useState([{
    taskValue: "",
    creationDate: "",
    id: ""
  }]);
  const inputRef = useRef(null);
  const liRef = useRef(null);
  const timeOutRef = useRef(null);
  const [taskToDisplay, setTaskToDisplay] = useState({
    taskValue: "",
    creationDate: "",
    id: ""
  });
  const [isDisplayed, setIsDisplayed] = useState(false);

  const refreshApp = () => {
    setTasks(tasks.filter(task => task.id !== ""));
  };
  useEffect(() => {
    refreshApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addTask(name) {
    for(let i=0; i<= tasks.length; i++){
      if(name.trim() !== "" &&
      tasks.length < 5){
        let date = new Date();
        let currentDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        setTasks([...tasks, {taskValue: name, creationDate: currentDate, id: crypto.randomUUID()}]);
        document.getElementById("taskvalue").value = "";
        return;
      }
    }
  }

  const removeTask = (id) => {
    let taskitem = document.getElementById(id);
    let button = document.getElementById(id+"btn");
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    }, 100);
    button.style.display = "none" 
    taskitem.id = "taskitem-moved"
  };

  const removeTaskFromDetails = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setTaskToDisplay({});
    setIsDisplayed(false);
  }

  const removeAllTasks = () => {
    if(tasks.length !== 0){
    }
    let taskitems = document.getElementsByTagName("li");
    for (let i = 0; i < taskitems.length; i++) {
      taskitems[i].id = "taskitem-moved";
    }
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setTasks([]);
    }, 300);
  };

  const handleClickAdd = () => {
    addTask(inputRef.current.value);
  };

  const displayPopup = (task) => {
    setTaskToDisplay(task);
    setIsDisplayed(true);
  }

  return (
    <main>
      
      <div className="holder">
      
      <h1>Todo App</h1>
      <div className="inputholder">
        <input
          type="text"
          placeholder="Add your new TODO"
          id="taskvalue"
          ref={inputRef}
          maxLength={60}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            handleClickAdd();
          }}
        >
          <PlusSquareFill className="plusbtn" />
        </motion.button>
      </div>
      <div className="taskholder">
        {tasks.filter(task => task.id !== "").map((task) => {
          return (
            <ul className="tasklist" key={task.id}>
              <li id={task.id} onClick={() => {displayPopup(task)}} className="taskitem" ref={liRef}>
                {task.taskValue}
              </li>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="btn"
                disabled={false}
                onClick={() => {
                  removeTask(task.id);
                }}
              >
                <XSquareFill id={(task.id)+"btn"} className="xbtn" />
              </motion.button>
            </ul>
          );
        })}
      </div>
      <div className="footer">
        <span>You have {tasks.length}/5 pending tasks</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="xallbtn"
          onClick={() => {
            removeAllTasks();
          }}
        >
          Clear all
        </motion.button>
      </div>
      <TaskPopup trigger={isDisplayed} task={taskToDisplay} setTrigger={setIsDisplayed} >
        <div className="popup-footer">
          <p className="date-info">Created at: {taskToDisplay.creationDate} </p>
          <motion.button
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="popup-btn"
            onClick={()=>{
              removeTaskFromDetails((taskToDisplay.id))
            }}
            >
            <CheckSquareFill className="popup-xbtn check-btn" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="popup-btn"
            onClick={()=>{
              removeTaskFromDetails((taskToDisplay.id))
            }}
            >
            <XSquareFill className="popup-xbtn" />
          </motion.button>
        </div>
      </TaskPopup>
    </div>
    </main>
    
  );
}

// function GreenBanner(){
//   return (
//     <Banner className="banner"
//         title="Task has been completed successfully" 
//         css={{backgroundColor:"rgba(110, 201, 118, 0.74)"}}
//         visibleTime={300}

//       />
//   );
// }

// function RedBanner(){
//   return (
//     <Banner className="banner"
//         title="Deleted successfully." 
//         css={{backgroundColor:"rgba(201, 110, 110, 0.74)"}}
//         visibleTime={300}
        
//       />
//   );
// }

export default Todo;
