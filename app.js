
const container1 = document.getElementsByClassName('container1')[0];
const button = document.getElementsByClassName('btn')[0];
const listContainer = document.getElementById("list-container");

let taskQueue = [];
let currentTaskIndex = 0; 
let countdown; 

button.addEventListener('click', () => {
    container1.style.display = "block";
});


function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('taskQueue')) || [];
    taskQueue = storedTasks;
    storedTasks.forEach(task => {
        displayTask(task);
    });
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const timeInput = document.getElementById("time-input");

    if (taskInput.value === "") {
        alert("You Must Write Something!!");
    } else if (timeInput.value <= 0) {
        alert("Please enter a positive number for time.");
    } else {
        let li = document.createElement("li");
        let task = {
            taskName: taskInput.value,
            time: timeInput.value, 
            liElement: li
        };
         
        li.innerHTML = `${task.taskName} - <span class="time">${task.time}</span>`;

        let crossSpan = document.createElement("span");
        crossSpan.classList.add("cross-btn");
        crossSpan.innerHTML = "\u00d7"; 
        li.appendChild(crossSpan);

        let startBtn = document.createElement("button");
        startBtn.classList.add("start-btn");
        startBtn.innerHTML = "Start"; 
        li.appendChild(startBtn);

        let skipBtn = document.createElement("button");
        skipBtn.classList.add("skip-btn");
        skipBtn.innerHTML = "Skip"; 
        li.appendChild(skipBtn);

        listContainer.appendChild(li);

        taskQueue.push(task); 

        
        startBtn.addEventListener('click', () => {
            if (currentTaskIndex === 0) { 
                startNextTask();
            }
        });

        
        skipBtn.addEventListener('click', () => {
            if (currentTaskIndex === taskQueue.indexOf(task)) {
                skipTask(); 
            }
        });

        saveData(); 

        taskInput.value = "";
        timeInput.value = "";
    }
}

listContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName === "SPAN") {
      let li = evt.target.parentElement; 
      let taskName = li.firstChild.textContent.split(" - ")[0];

      
      taskQueue = taskQueue.filter(task => task.taskName !== taskName);

      
      li.remove();

      
      saveData();
  }
}, false);


function startNextTask() {
    if (currentTaskIndex < taskQueue.length) {
        let currentTask = taskQueue[currentTaskIndex];
        let timeLeft = currentTask.time || currentTask.timeRemaining;
        let liElement = currentTask.liElement;
        let timeDisplay = liElement.querySelector('.time');

        
        clearInterval(countdown);

        
        countdown = setInterval(() => {
            timeLeft--;
            currentTask.timeRemaining=timeLeft
            timeDisplay.textContent = timeLeft;
            
            saveData()
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                timeDisplay.textContent = "Completed!";
                currentTask.timeRemaining=0;
                alert(`${currentTask.taskName} is completed!`);

                currentTaskIndex++; 

                
                if (currentTaskIndex < taskQueue.length) {
                    startNextTask();
                } else {
                    alert("All tasks completed!");
                }
            }
        }, 1000); 
    }
}

function skipTask() {
    clearInterval(countdown); 

    let currentTask = taskQueue[currentTaskIndex];
    let timeDisplay = currentTask.liElement.querySelector('.time');
    timeDisplay.textContent = "Skipped"; 

    currentTaskIndex++; 

    
    if (currentTaskIndex < taskQueue.length) {
        startNextTask();
    } else {
        alert("All tasks completed!");
    }
}

function saveData() {
    localStorage.setItem('taskQueue', JSON.stringify(taskQueue));
}

function displayTask(task) {
    let li = document.createElement("li");
    li.innerHTML = `${task.taskName} - <span class="time">${task.time}</span>`;

    let crossSpan = document.createElement("span");
    crossSpan.classList.add("cross-btn");
    crossSpan.innerHTML = "\u00d7";
    li.appendChild(crossSpan);

    let startBtn = document.createElement("button");
    startBtn.classList.add("start-btn");
    startBtn.innerHTML = "Start"; 
    li.appendChild(startBtn);

    let skipBtn = document.createElement("button");
    skipBtn.classList.add("skip-btn");
    skipBtn.innerHTML = "Skip"; 
    li.appendChild(skipBtn);

    listContainer.appendChild(li);
}

loadTasks();
