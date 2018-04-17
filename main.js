
$(document).ready(initializeApp);
var global_result;
function initializeApp(){
    // $('button').click(getData);
}
//
// function getData(){
//     console.log('1) getData called');
//     var ajaxConfig = {
//         dataType: 'json',
//         url: 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topMovies/json',
//         success: function(result) {
//             global_result = result;
//             console.log('2) AJAX Success function called, with the following result:', result);
//         }
//     };
//
//     console.log('3) Making AJAX request');
//     $.ajax(ajaxConfig);
//
//     console.log('4) End of getData');
// }
// getData();
// // function addToDom() {
// // }

function getDataFromYoutube() {
    // var solarBodies = ["sun", "mercury", "venus", "earth", "mars", "uranus", "neptune", "pluto"];
    var solarBodies = {"sun":null, "mercury":null, "venus":null, "earth":null, "mars":null, "uranus":null, "neptune":null, "pluto":null};
    // for (solarIndex = 0; solarIndex < solarBodies.length; solarIndex++) {
    for (var eachBody in solarBodies){
        var youtubeAjaxObject = {
            'dataType': 'json',
            'url': 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            'method': 'POST',
            'timeout': 3000,
            'data': {
                'q': 'solar system ' + eachBody,
                'maxResults': 3,
                'type': 'video',
                'detailLevel': 'verbose'
            },
            'success': function (result) {
                // renderVideosOnDom()
                solarBodies[eachBody] = Object.keys(result.data);
                console.log(solarBodies[eachBody]);
            },
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(youtubeAjaxObject);
    }
    console.log(solarBodies)
}

function renderVideosOnDom() {
    var vidSRC = "https://www.youtube.com/embed/"+solarBodies[eachBody][0];

// <iframe width="560" height="315" src="https://www.youtube.com/embed/B2e-UQge8B8"
//     frameborder="0" allow="autoplay; encrypted-media"
//     allowfullscreen></iframe>
}

getDataFromYoutube();