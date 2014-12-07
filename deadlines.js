
var setup = function() {
    setupBindings();
    listExistingDeadlines();
};


var LocalStuff = (function() {

    // returns tasks from localstorage as JSON
    function getDeadlinesFromStorage() {

        return {
            deadlines : [
                {
                    name: "task1",
                    due_date: "12/14/2014"
                },
                {
                    name: "task2",
                    due_date: "12/16/2014"
                }
            ]
        };
    }

    function setDeadlinesToStorage(tasks) {

    }

    return {
        getDeadlinesFromStorage: getDeadlinesFromStorage,
        setDeadlinesToStorage: setDeadlinesToStorage
    };
})();


var DeadlineManager = (function() {

    function addDeadline(task) {
        console.info("task added");
    }

    function deleteDeadline() {

    }

    function calculateDaysLeft(picked_date) {
    var now = new Date();
    var diff = Math.ceil((picked_date - new Date())/ (1000*60*60*24));
    return diff;
}
    
    return {
        addDeadline: addDeadline,
        deleteDeadline: deleteDeadline,
        calculateDaysLeft: calculateDaysLeft
    };
})();

var listExistingDeadlines = function() {

    // get local tasks
    var tasks = LocalStuff.getDeadlinesFromStorage();

    if (tasks) {
        _.each(tasks.deadlines, function(deadline, idx) {
            var li = "<li id=deadline-" + idx + ">" + deadline.name + ":" + DeadlineManager.calculateDaysLeft(new Date(deadline.due_date)) + " days left <a href='#'>x</a> </li>";
            $("#d_list").append(li);
        });
    }
};

var setupBindings = function() {
    
    // binding to add a new Deadline
    $('#set_values').bind('click', DeadlineManager.addDeadline);
    
    // binding to remove an existing deadline
    $('#d_list li a').live('click', DeadlineManager.deleteDeadline);

    $( "#datepicker" ).datetimepicker();
};

$(document).ready( function() {
    setup();
});