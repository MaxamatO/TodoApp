import React from "react";
import "./TaskPopup.css";
import { X } from "react-bootstrap-icons";
// TODO: Complete the Popupwindow layout
function TaskPopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-head">
                    <h3>Task details</h3>
                    <button className="close-btn" onClick={(()=>{props.setTrigger(false)})}><X className="close-xbtn"/></button>
                </div>
                <div className="content">
                    <p className="task-info">{props.task}</p>
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default TaskPopup;