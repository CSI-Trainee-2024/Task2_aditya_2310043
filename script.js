const toDo = document.getElementsByClassName("btn");
const listContainer = document.getElementById("list-container");
const container1 = document.getElementsByClassName("container1")[0];


function addTodo() {
    if (!document.querySelector('.todo-app')) {
      let div = document.createElement("div");
      div.innerHTML = `               
                      <div class="todo-app">
                      <h2>To-Do List <img src="./images/icon.png"></h2> 
                      <div class="row">
                      <input type="text" id="task-input" placeholder="Add Your Task" required>
                      <input type="number" id="time-input" placeholder="Add Your Time in seconds" required>
                       <button onclick="addTask()">Add</button>
                      </div>
                      </div>`;
      container1.appendChild(div);
    }
  }
  
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const timeInput = document.getElementById("time-input");
  
    if (taskInput.value === "") {
      alert("You Must Write Something!!");
    } else {
      let li = document.createElement("li");
      li.innerHTML = `${taskInput.value} - ${timeInput.value}seconds`;
      listContainer.appendChild(li);
  
      saveTask(taskInput.value,timeInput.value)

      taskInput.value = "";
      timeInput.value = "";
    }
  }

  function saveTask(task,time){
    let tasks = JSON.parse(localStorage.getItems('tasks')) || []
    tasks.push({task,time})
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }
