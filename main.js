
var solarBodies = {
    "sun":{ wikiLink: null, videos: [], nasaPicture: ''},
    "mercury":{ wikiLink: null, videos: [], nasaPicture: ''},
    "venus":{ wikiLink: null, videos: [], nasaPicture: ''},
    "earth":{ wikiLink: null, videos: [], nasaPicture: ''},
    "mars":{ wikiLink: null, videos: [], nasaPicture: ''},
    "uranus":{ wikiLink: null, videos: [], nasaPicture: ''},
    "jupiter":{ wikiLink: null, videos: [], nasaPicture: ''},
    "saturn":{ wikiLink: null, videos: [], nasaPicture: ''},
    "neptune":{ wikiLink: null, videos: [], nasaPicture: ''},
    "pluto":{ wikiLink: null, videos: [], nasaPicture: ''}
};

$(document).ready(initializeApp);

function initializeApp(){
    // $('button').click(getDataFromYoutube);
    for(let planet in solarBodies){
        $(`.${planet}Div`).click( function(){
            renderPlanetInfoInModal(planet);
        });
        $(".modalShadow").click(function(){
            $(this).hide();
        });
        $(".modalBody").click(function(){
            event.stopPropagation();
        })
    }
}

function displayPlanetInfo(){

}

function getDataFromYoutube() {
    for (let eachBody in solarBodies){
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
                var currentSolarBodiesArr = Object.keys(result.data);
                console.log(Object.keys(result.data));
                solarBodies[eachBody].videos = currentSolarBodiesArr;
            },
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(youtubeAjaxObject);
    }
}

// function renderVideoLinksOnDom(solarBodyVideoArray, planet) {
//         $("."+planet+ "Div").click(function(){
//             loadAndPlayVideo( solarBodyVideoArray[0], planet)
//         }).addClass('clickable')
// }

function renderPlanetInfoInModal(planet){
    $("#displayModal").empty();

    var planetInfo = solarBodies[planet];
    var infoContainer = $("<div>",{
        'class': 'displayModal',
        "id": "displayModal"
    });
    var planetTitle = $("<div>",{
        'class': 'modalTitle',
        "id":"modalTitle",
        text: planet
    });
    var modalControls = $("<div>", {
        "class": "modalControls",
        "id": "modalControls"
    });
    var imagesButton = $("<button>", {
        "class": "images buttons",
        "id" : "imageButton",
        text: "Images"
    });
    var informationButton = $("<button>", {
        "class": "information buttons",
        "id" : "infoButton",
        text: "Information"
    });
    var videosButton = $("<button>", {
        "class": "videos buttons",
        "id" : "videoButton",
        text: "Videos"
    });

    var planetWikiLink = $("<a>",{
        target:"_blank",
        href:planetInfo.wikiLink,
        text: planet + " wiki info"
    });
    var videoList = $("<ul>").addClass('videoListContainer');
    var videoElements = [];
    for(let videoCodeIterator=0; videoCodeIterator<planetInfo.videos.length; videoCodeIterator++){
        var videoLink = $("<li>", {
            text: 'video '+videoCodeIterator,
            on: {
                click: function(){
                    loadAndPlayVideo(planetInfo.videos[i]);
                }
            }
        });
        videoElements.push( videoLink )
    }
    videoList.append(videoElements);
    modalControls.append(imagesButton, informationButton, videosButton);
    infoContainer.append(planetTitle, modalControls);
    $("#bodyId").append(infoContainer);
    $("#displayModal").show();
}

function loadAndPlayVideo(link, planet){
    $("#videoModal").show();
    $("#videoPlayer").attr('src','https://www.youtube.com/embed/' + link )
}

getDataFromYoutube();

//omers doing his random shit down here---------------------------------