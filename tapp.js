var submitButton = document.querySelector("#submitButton");
var inputForm = document.querySelector("#inputForm");
var progressTable = document.querySelector("#progressTable");
var completedTable = document.querySelector("#completedTable");
var selectAssignee = document.querySelector("#selectAssignee");
var taskName;
var dateAdded;
var assignee;
var hash = 10;
var assigneeName = ["Jayesh", "Shibo", "Rahul", "Prabhjot", "Anubhv", "Hari", "Sarthak", "Abdul", "Chetan", "Rishab", "Rakesh",];
var createAssignees = function () {
    for (var _i = 0, assigneeName_1 = assigneeName; _i < assigneeName_1.length; _i++) {
        var aname = assigneeName_1[_i];
        var newOption = document.createElement("option");
        newOption.value = aname;
        newOption.innerHTML = aname;
        selectAssignee.appendChild(newOption);
    }
};
createAssignees();
var createNewTask = function () {
    var newRow = document.createElement("tr");
    var data1 = document.createElement("td");
    var data2 = document.createElement("td");
    var data3 = document.createElement("td");
    var data4 = document.createElement("td");
    var checkbox = document.createElement("input"); // need to bind somefn
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", taskCompleted);
    checkbox.id = hash.toString();
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
};
var taskCompleted = function (event) {
    var taskid = event.target.getAttribute('id');
    var task = document.getElementById(taskid);
    var parent = task.closest("tr");
    var pparent = task.parentNode;
    pparent.removeChild(task);
    completedTable.appendChild(parent);
};
var validateData = function (task, assignee, date) {
    if (task == "" || assignee == "" || date == "") {
        return false;
    }
    return true;
};
var getFormValues = function (event) {
    event.preventDefault();
    var data = new FormData(inputForm);
    taskName = data.get("taskName");
    // let selectAssignee2 = selectAssignee as HTMLInputElement;
    //assignee = selectAssignee2.value ;
    assignee = data.get("assigneeName");
    dateAdded = data.get("dueDate");
    // VALIDATE DATA
    var isDataCorrect = validateData(taskName.toString(), assignee.toString(), dateAdded.toString());
    if (isDataCorrect)
        createNewTask();
    else {
        alert("PLEASE ENTER TASK DETAILS CORRECTLY");
    }
};
submitButton.addEventListener("click", getFormValues);
