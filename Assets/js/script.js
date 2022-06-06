const today = moment().format("dddd MMM Do YYYY");
const timeBlockValue = []
const tasks = [];

// Inserts today's date within currentDay p-tag 
$("#currentDay").append(today);

// to generate time blocks html
function createTimeBlocks(elem) {
    // for loop that creates values for the time blocks
    for(i = 8; i <= 17; i++) {
        const date = new Date();
        date.setHours(i);
        timeBlockValue.push(date);
    };

    for(let i = 0; i < timeBlockValue.length; i++) {
        // formats date object into a string that converts military time to 12 hour increments
        let taskHour = timeBlockValue[i].toLocaleString('en-US', {hour:'numeric', hour12: true});
        // creates html for time blocks
       $("#container").append(
           `<div id='taskParent' class='row'><div id='hour' class='col-2 hour '>${taskHour}</div><input class='col-8 task-text' id='typeTask-${timeBlockValue[i].getHours()}' type='text' placeholder='Type your Tasks here'><button class='col-2 saveBtn' type='submit' onclick="saveTask(${timeBlockValue[i].getHours()})">Save</button></div>`
        );
        // goes into local storage and presents previous task saves
        $(`#typeTask-${timeBlockValue[i].getHours()}`).val(localStorage.getItem(timeBlockValue[i].getHours().toString()))
    };


};
// function to save tasks to local storage
function saveTask(index) {
    let taskId = '#typeTask-' + index;
    let taskData = $(taskId).val();

    localStorage.setItem(index.toString(), taskData)

    console.log(localStorage);
    console.log(taskData);
    console.log(index);
};

// function to change colors of time blocks depending on time of day
function hourUpdate(){
    let currentTime = new Date().getHours();
    
    let i = 0;
    // Selects inputs from within taskParent Container and changes colors bases on past present of future.
    $("#taskParent>input").each(function() {

        if (timeBlockValue[i].getHours() < currentTime) {
            $(`#typeTask-${timeBlockValue[i].getHours()}`).addClass("past")
        } else
        if (timeBlockValue[i].getHours() === currentTime) {
            $(`#typeTask-${timeBlockValue[i].getHours()}`).removeClass("past").addClass("present")
        }
        else {$(`#typeTask-${timeBlockValue[i].getHours()}`).removeClass("past", "present").addClass("future");
        }
        i++;
    });
}

// function calls
createTimeBlocks();
hourUpdate();



