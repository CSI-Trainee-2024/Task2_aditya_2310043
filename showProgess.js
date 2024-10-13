window.onload = function () {
    
    const taskTableBody = document.querySelector("#taskTable tbody");

    
    const taskQueue = JSON.parse(localStorage.getItem("taskQueue")) || [];


    taskQueue.forEach(task => {
        
        let row = document.createElement("tr");

        
        let taskNameCell = document.createElement("td");
        let taskTimeCell = document.createElement("td");
        let remainingTimeCell = document.createElement('td')

        
        taskNameCell.textContent = task.taskName;
        taskTimeCell.textContent = task.time + 'seconds';

        let remainingTime = task.timeRemaining !== undefined ? task.timeRemaining : task.time;
        if (remainingTime > 0) {
            remainingTimeCell.textContent = remainingTime + " seconds remaining";
        } else {
            remainingTimeCell.textContent = "Completed!";
        }



        // Append the cells to the row
        row.appendChild(taskNameCell);
        row.appendChild(taskTimeCell);
        row.appendChild(remainingTimeCell)

        // Append the row to the table body
        taskTableBody.appendChild(row);
    });
};
