import React from "react";
import axios from "axios";
import { useState } from "react";
import "./style.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
const UpdateTask = ({ id, setButtonUpdate, setUpdate, getTasks }) => {
  const newTask = async () => {
    const { value: newTask } = await Swal.fire({
      title: "Update your task",
      input: "text",
      inputLabel: "Your task",
      inputPlaceholder: "Enter your task",
      length: 10,
    });

    if (newTask) {
      Swal.fire(`The new task is : ${newTask}`);
    }
    if (newTask.length > 0) {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updateTask/${id}`,
        {
          task: newTask,
        }
      );
    }
    getTasks();
    setButtonUpdate(true);
    setUpdate(false);
  };

  useEffect(() => {
    newTask();
  }, []);

  return <div></div>;
};

export default UpdateTask;
