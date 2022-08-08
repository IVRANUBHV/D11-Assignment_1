let submitButton = document.querySelector("#submitButton");
let inputForm = document.querySelector("#inputForm");
let progressTable = document.querySelector("#progressTable");
let completedTable = document.querySelector("#completedTable");
let selectAssignee = document.querySelector("#selectAssignee");
let taskName:FormDataEntryValue;
let dateAdded:FormDataEntryValue;
let assignee:FormDataEntryValue;
let hash = 0;

// --------- Array of Assignee names --------- 

let assigneeName = ["Jayesh","Shibo", "Rahul", 
                    "Prabhjot", "Anubhv", "Hari", 
                    "Sarthak", "Abdul", "Chetan", 
                    "Rishab","Rakesh",];

// --------- Creating a drop dowm using the Assignee Array --------- 

let createAssignees = () => {
    for(let aname of assigneeName){
        let newOption = document.createElement("option");
        newOption.value = aname;
        newOption.innerHTML = aname;
        selectAssignee.appendChild(newOption);
    }
}

// --------- ENUM TO SHOW TASK STATUS --------- 

enum taskStatus{
    IN_PROGRESS,
    COMPLETED
}

// --------- INTERFACE To create a new Task for storing--------- 
interface task{
    taskDetails : string;
    aName : string;
    dueDate : string;
    id : number;
    taskStatus : taskStatus;
}

// --------- tasksArray of type task To store all the tasks --------- 

let tasksArray: task[] = [];

// --------- Calling the Fn to create the DROP DOWN --------- 

createAssignees();

// --------- Creating a new Table Row --------- 

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
   data1.innerHTML = taskName.toString();
   data2.innerHTML = assignee.toString();
   data3.innerHTML = (dateAdded.toString()).split("-").reverse().join("-");
   data4.appendChild(checkbox);
   newRow.appendChild(data1);
   newRow.appendChild(data2);
   newRow.appendChild(data3);
   newRow.appendChild(data4);
   progressTable.appendChild(newRow);
   let newTask : task = {
    taskDetails : taskName.toString(),
    aName : assignee.toString(),
    dueDate : data3.innerText,
    id : hash -1,
    taskStatus : taskStatus.IN_PROGRESS
   }
   tasksArray.push(newTask);
   console.log(tasksArray[hash - 1]);
}

// --------- On Completion --------- 

let taskCompleted = (event : PointerEvent) => {
    let taskid = (event.target as HTMLInputElement).getAttribute('id');
    let task = document.getElementById(taskid);
    let parent = task.closest("tr");
    let pparent = task.parentNode;
    pparent.removeChild(task);
    completedTable.appendChild(parent);
    tasksArray[parseInt(taskid)].taskStatus = taskStatus.COMPLETED;
    console.log(tasksArray[parseInt(taskid)]);
}

// --------- Validating Data --------- 

let validateData = (task:string,assignee:string,date:string) => {

    if(task == "" || assignee == "" || date == ""){
        return false;
    }
    return true;
}

// --------- Getting the user input values --------- 

let getFormValues = (event:PointerEvent) => {
   event.preventDefault();
   let data = new FormData(inputForm as HTMLFormElement);
   taskName = data.get("taskName");
  // let selectAssignee2 = selectAssignee as HTMLInputElement;
   //assignee = selectAssignee2.value ;
   assignee = data.get("assigneeName")
   dateAdded = data.get("dueDate");   
   // VALIDATE DATA
   let isDataCorrect = validateData(taskName.toString(),assignee.toString(),dateAdded.toString());
   if(isDataCorrect)createNewTask();
   else{
    alert("PLEASE ENTER TASK DETAILS CORRECTLY");
   }
}

// --------- Event Listener for Submit Button --------- 

submitButton.addEventListener("click",getFormValues);