let submitButton = document.querySelector("#submitButton");
let inputForm = document.querySelector("#inputForm");
let progressTable = document.querySelector("#progressTable");
let completedTable = document.querySelector("#completedTable");
let selectAssignee = document.querySelector("#selectAssignee");
let taskName:FormDataEntryValue;
let dateAdded:FormDataEntryValue;
let assignee:FormDataEntryValue;
let hash = 10;
let assigneeName = ["Jayesh","Shibo", "Rahul", "Prabhjot", "Anubhv", "Hari", "Sarthak", "Abdul", "Chetan", "Rishab","Rakesh",]
let createAssignees = () => {
    for(let aname of assigneeName){
        let newOption = document.createElement("option");
        newOption.value = aname;
        newOption.innerHTML = aname;
        selectAssignee.appendChild(newOption);
    }
}
createAssignees();
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
submitButton.addEventListener("click",getFormValues);