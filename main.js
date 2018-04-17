
$(document).ready(initializeApp);
var global_result;
function initializeApp(){
    // $('button').click(getData);
}

function getData(){
    console.log('1) getData called');
    var ajaxConfig = {
        dataType: 'json',
        url: 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topMovies/json',
        success: function(result) {
            global_result = result;
            console.log('2) AJAX Success function called, with the following result:', result);
        }
    };

    console.log('3) Making AJAX request');
    $.ajax(ajaxConfig);

    console.log('4) End of getData');
}
getData();
// function addToDom() {
// }