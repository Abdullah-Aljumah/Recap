import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateTask from "../updateTask";
import "./style.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
const Todo = () => {
  // useState
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [buttonUpdate, setButtonUpdate] = useState(true);
  const [taskId, setTaskId] = useState("");
  // eslint-disable-next-line
  const [date, setDate] = useState(Date);

  // Get all tasks
  const getTasks = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getTasks`);
    setTasks(res.data);
  };

  // Delete task
  const deleteTask = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "ليه الحذف ؟؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // eslint-disable-next-line
        const res = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/deleteTask/${id}`
        );
        getTasks();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    // eslint-disable-next-line
  };

  // Create new task
  const newTask = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line

    e.target[0].value.split().map(async (ele) => {
      let sum = 0;
      // eslint-disable-next-line
      if (ele == " ") {
        sum++;
      }
      // eslint-disable-next-line
      if (ele == sum) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must enter a value",
        });
        e.target[0].value = "";
      } else {
        // eslint-disable-next-line
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/newTask/`,
          {
            task: e.target[0].value,
          }
        );

        getTasks();
        e.target[0].value = "";
      }
    });
  };

  // Complete task
  const completeTask = async (id) => {
    // eslint-disable-next-line
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/completeTask/${id}`
    );
    getTasks();
  };

  const clearCompleted = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "بيحذف كل المكتملات",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // eslint-disable-next-line
        const res = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/deleteCompletedTask`
        );
        getTasks();
      }
    });
  };

  // Invoke get all tasks
  useEffect(() => {
    getTasks();
  }, []);

  //
  return (
    <div className="all">
      <div className="allTasksAndInput">
        <div className="allTasks">
          {/* Name of the list */}
          <div className="date">
            {/* <h2 className="h2Date"> List </h2> */}
            <h2 className="h2Date">Me & My Soulmate </h2>
          </div>

          {/* All the task */}
          {tasks &&
            tasks
              .sort(function (a, b) {
                return a.completed - b.completed;
              })
              .map((item) => {
                return (
                  <div key={item._id} className="task">
                    {/* Task name */}
                    <div className="taskName">
                      <h1
                        className="h1Task"
                        onClick={() => {
                          completeTask(item._id);
                        }}
                        // eslint-disable-next-line
                        id={item.completed == true ? "lineTask" : "noneLine"}
                      >
                        {
                          // eslint-disable-next-line
                          item.completed == true ? (
                            <img
                              className="check"
                              alt="check"
                              src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836__340.png"
                            />
                          ) : (
                            <img
                              alt="check"
                              className="check"
                              src="https://cdn-icons-png.flaticon.com/512/61/61221.png"
                            />
                          )
                        }
                        {item.task}
                      </h1>
                    </div>
                    {/* Buttons update and delete and component update task */}
                    <div className="inputsUD">
                      {/* Button update */}
                      {buttonUpdate ? (
                        <button
                          className="updateAndDeleteInput"
                          id="btnUpdate"
                          onClick={() => {
                            setUpdate(!update);
                            setTaskId(item._id);
                          }}
                        >
                          {" "}
                          <img
                            id="updateButton"
                            alt="updateButton"
                            className="imgUpdate"
                            src="https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/64/undefined/external-pen-digital-marketing-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png"
                          />{" "}
                        </button>
                      ) : (
                        ""
                      )}

                      {/* Component update */}
                      {update ? (
                        // eslint-disable-next-line
                        item._id == taskId ? (
                          <UpdateTask
                            id={taskId}
                            setButtonUpdate={setButtonUpdate}
                            setUpdate={setUpdate}
                            getTasks={getTasks}
                            tasks={tasks}
                          />
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}

                      {/* Button delete */}
                      {buttonUpdate ? (
                        <div>
                          {" "}
                          <button
                            className="updateAndDeleteInput"
                            id="deleteInput"
                            onClick={() => deleteTask(item._id)}
                          >
                            {" "}
                            <MdOutlineDeleteForever />
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
        </div>

        {/* New task */}
        <div className="divNewTask">
          <div className="divFormNewTask">
            <form onSubmit={(e) => newTask(e)} className="formNewTask">
              {/* Input new task */}
              <input
                type="text"
                name="newTask"
                placeholder="Create new task..."
                className="inputNewTask"
                title="Add new task"
              />
              {/* Input submit a new task */}
              <input type="submit" value="Add" className="submitNewTask" />
            </form>
          </div>
          <div className="clearDiv">
            <input
              type="submit"
              value="Clear"
              className="Clear"
              title="Clear all the completed task"
              onClick={() => clearCompleted()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
