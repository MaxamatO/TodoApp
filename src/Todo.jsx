import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { PlusSquareFill, XSquareFill, CheckSquareFill } from "react-bootstrap-icons";
import "./App.css";
import { motion } from "framer-motion";
import TaskPopup from "./TaskPopup";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const liRef = useRef(null);
  const timeOutRef = useRef(null);
  const [taskToDisplay, setTaskToDisplay] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);

  const refreshApp = () => {
    setTasks(tasks);
  };
  useEffect(() => {
    refreshApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addTask(name) {
    if (
      !tasks.includes(name.trim()) &&
      name.trim() !== "" &&
      tasks.length < 5
    ) {
      setTasks([...tasks, name.trim()]);
      document.getElementById("taskvalue").value = "";
      return;
    }
  }

  const removeTask = (name) => {
    let taskitems = document.getElementsByTagName("li");
    let result;
    console.log(taskitems);
    for (let i = 0; i < taskitems.length; i++) {
      if (taskitems[i].outerText === name) {
        result = taskitems[i];
      }
    }
    result.id = "taskitem-moved";
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setTasks(tasks.filter((task) => task !== name));
    }, 300);
  };

  const removeTaskFromDetails = (name) => {
    setTasks(tasks.filter((task) => task !== name.taskToDisplay));
    console.log(tasks);
    setTaskToDisplay("");
    setIsDisplayed(false);
  }

  const removeAllTasks = () => {
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
        {tasks.map((task) => {
          return (
            <ul className="tasklist" key={task}>
              <li onClick={() => {displayPopup(task)}} className="taskitem" ref={liRef}>
                {task}
              </li>
              <motion.button
                whileTap={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="btn"
                onClick={() => {
                  removeTask(task);
                }}
              >
                <XSquareFill className="xbtn" />
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
          <p className="date-info">Created at:</p>
          <motion.button
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="popup-btn"
            >
            <CheckSquareFill className="popup-xbtn check-btn" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="popup-btn"
            onClick={()=>{
              removeTaskFromDetails({taskToDisplay})
            }}
            >
            <XSquareFill className="popup-xbtn" />
          </motion.button>
        </div>
      </TaskPopup>
    </div>
  );
}

export default Todo;
