let submitButton = document.querySelector("#submitButton");
let inputForm = document.querySelector("#inputForm");
let progressTable = document.querySelector("#progressTable");
let completedTable = document.querySelector("#completedTable");
let selectAssignee = document.querySelector("#selectAssignee");
let temp1 = document.querySelector("#staskName") as HTMLInputElement;
let temp2 = document.querySelector("#sassigneeName") as HTMLInputElement;
let temp3 = document.querySelector("#sdueDate") as HTMLInputElement;
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

// --------- Creating Task Objects to be Stored ---------

let createTaskObj = (taskName:string,assignee:string,data3:string) => {
    let newTask : task = {
        taskDetails : taskName,
        aName : assignee.toString(),
        dueDate : data3,
        id : hash -1,
        taskStatus : taskStatus.IN_PROGRESS
       }
       tasksArray.push(newTask);
       console.log(tasksArray[hash - 1]);
}


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
   createTaskObj(taskName.toString(),assignee.toString(),data3.innerHTML);
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

// --------- Clearing Spans ---------

let clearErrors = () => {
        temp1.innerHTML = "";
        temp2.innerHTML = "";
        temp3.innerHTML = "";   
}

// --------- Clearing INPUTS ---------

let clearInputs = () => {
    let temp = inputForm as HTMLFormElement;
    temp.reset();
}

// --------- Validating Data --------- 

let validateData = (task:string,assignee:string,date:string) => {
   // alert(assignee);
    let ok : boolean = true;
    if(task == ""){
        temp1.innerHTML = "! PLEASE ENTER A VALID TASK NAME !";
        ok = false;
    }
    if(assignee == "default"){
        temp2.innerHTML = "! PLEASE SELECT A VALID  NAME !";
        ok = false;
    }
    if(date == ""){
        temp3.innerHTML = "! PLEASE ENTER A VALID DATE !";
        ok = false;
    }
    if(ok){
        clearInputs();
        clearErrors();
        createNewTask();
    }
    
}

// --------- Getting the user input values --------- 

let getFormValues = (event:PointerEvent) => {
    clearErrors();
   event.preventDefault();
   let data = new FormData(inputForm as HTMLFormElement);
   taskName = data.get("taskName");
  // let selectAssignee2 = selectAssignee as HTMLInputElement;
   //assignee = selectAssignee2.value ;
   assignee = data.get("assigneeName")
   dateAdded = data.get("dueDate");   
   // VALIDATE DATA
   validateData(taskName.toString(),assignee.toString(),dateAdded.toString());
}

// --------- Event Listener for Submit Button --------- 

submitButton.addEventListener("click",getFormValues);