import React from "react";
import "./TaskPopup.css";
import { XSquareFill } from "react-bootstrap-icons";
import { motion } from "framer-motion";

// TODO: Complete the Popupwindow layout
function TaskPopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                
                <h3>Task details press to close</h3>
                <button onClick={(()=>{props.setTrigger(false)})}>X</button>
                <div className="content">
                    <p className="task-info">{props.children}</p>
                </div>
                <div className="popup-footer">
                    <p className="date-info">Created at: {props.date}</p>
                    <motion.button
                    whileTap={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="popup-btn"
                    >
                    <XSquareFill className="popup-xbtn" />
                </motion.button>
                </div>
            </div>
        </div>
    ) : "";
}

export default TaskPopup;