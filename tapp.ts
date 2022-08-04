let submitButton = document.querySelector("#submitButton");
let inputForm = submitButton.parentNode;
let progressTable = document.querySelector("#progressTable");
let completedTable = document.querySelector("#completedTable");
let taskName:string;
let assigneeName:string;
let dateAdded:string;
let hash = 10;

let createNewTask = () => {
   let newRow = document.createElement("tr");
   let data1 = document.createElement("td");
   let data2 = document.createElement("td");
   let data3 = document.createElement("td");
   let data4 = document.createElement("td");
   let checkbox = document.createElement("input"); // need to bind somefn
   checkbox.type = "checkbox";
   checkbox.addEventListener("click",taskCompleted);
   checkbox.id =  hash.toString();
   hash++;
   data1.innerHTML = taskName;
   data2.innerHTML = assigneeName;
   data3.innerHTML = dateAdded.split("-").reverse().join("-");
   data4.appendChild(checkbox);
   newRow.appendChild(data1);
   newRow.appendChild(data2);
   newRow.appendChild(data3);
   newRow.appendChild(data4);
   progressTable.appendChild(newRow);
}
let taskCompleted = (event : PointerEvent) => {
    let taskid = (event.target as HTMLInputElement).getAttribute('id');
    let task = document.getElementById(taskid);
    let parent = task.closest("tr");
    let pparent = task.parentNode;
    pparent.removeChild(task);
    completedTable.appendChild(parent);
}
let validateData = (task:string,assignee:string,date:string) => {

    if(task == "" || assignee == "" || date == ""){
        return false;
    }
    return true;
}
let getFormValues = (event) => {
   event.preventDefault();
   let data = new FormData(inputForm);
   taskName = data.get("taskName");
   assigneeName = data.get("assigneeName");
   dateAdded = data.get("dueDate");   
   // VALIDATE DATA
   let isDataCorrect = validateData(taskName,assigneeName,dateAdded);
   if(isDataCorrect)createNewTask();
   else{
    alert("PLEASE ENTER TASK DETAILS CORRECTLY");
   }
}
submitButton.addEventListener("click",getFormValues);