const today = moment().format("dddd MMM Do YYYY");
const timeBlockValue = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"]
const tasks = [];

// Inserts today dat withing currentDay p-tag 
$("#currentDay").append(today);

function pullTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 8; i < 18; i++) {
        let newTask;
        if(!savedTasks) {
            newTask = {
                time: moment().hour(i).format("HH") + ":00",
                task: "",
                hour: parseInt(moment().hour(i).format("H")),
            };
        } else {
            newTask = savedTasks[i - 8];
            console.log("newTask", newTask);
        }
        tasks.push(newTask);
    }
    console.log(tasks);
    tasks.forEach((elem) => {
        createTimeBlocks(elem);
    });
}

function createTimeBlocks(elem) {
    for(let i = 0; i < timeBlockValue.length; i++) {
        let taskHour = timeBlockValue[i];

       $("#container").append(
           `<div id='taskParent' class='row'><div id='hour' class='col-2 hour'>${taskHour}</div><input class='col-8' id='typeTask' type='text' placeholder='Type your Tasks here'><button class='col-2 saveBtn' id='saveBtn' type='submit'>Save</button></div>`)

    }


}

// $('#taskParent').on('click', '.saveBtn', 

$(".saveBtn").on("click", function(){
    // set a variable to get values from text area and times
    tasks.push({
        "hour" : $('#hour').value,
        "task" : $('#typeTask').value
    })



    localStorage.setItem(tasks);
});


function hourUpdate(){
    let currentTime = moment().hour().format("HH");
    $("#parentContainer").each(function() {
        let blockTime = parseInt($(this).attr("text").split(" ")[1]);
        if (blockTime < today) {
            $(this).addClass("past")
        } else
        if (blockTime === today) {
            $(this).removeClass("past").addClass("present")
        }
        else {$(this).removeClass("past", "present").addClass("future");
        }
    });
}
createTimeBlocks();
hourUpdate();
console.log(localStorage);
