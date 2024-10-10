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
      li.innerHTML = `${taskInput.value} - ${timeInput.value} seconds`;
      listContainer.appendChild(li);
      let span=document.createElement("span")
      span.innerHTML ="\u00d7"
      li.appendChild(span)
  
      saveData()

      taskInput.value = "";
      timeInput.value = "";
    }
  }
   
  listContainer.addEventListener('click',(evt)=>{
      if(evt.target.tagName==='LI'){
        evt.target.classList.toggle("checked");
        saveData()
      }
      else if(evt.target.tagName==="SPAN"){
        evt.target.parentElement.remove();
        saveData()
      }
  },false)


function saveData(){
  localStorage.setItem("data",listContainer.innerHTML)
}
function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask()