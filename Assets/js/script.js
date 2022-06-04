$document.ready(function() {
    const currentHour = moment();
    let today = moment();

    function createBlocks() {
        // current date for header
        $("#currentDay").text(today.format('LL'));

        let date = moment($('#currentDay').text()).locale('fr').format('L');

       $('#currentDay').append(today);
       
    };
})

createBlocks();
console.log(createBlocks)