var solarBodies = {
 
    "sun":{ wikiLink: null, videos: [], nasaPicture: [8,26,44]},
    "mercury":{ wikiLink: null, videos: [], nasaPicture: [16,21,66]},
    "venus":{ wikiLink: null, videos: [], nasaPicture: [21,28,16, 41]},
    "earth":{ wikiLink: null, videos: [], nasaPicture: [56,72,89]},
    "mars":{ wikiLink: null, videos: [], nasaPicture: [2,16,18,36,47]},
    "uranus":{ wikiLink: null, videos: [], nasaPicture: [3,26,45,47]},
    "jupiter":{ wikiLink: null, videos: [], nasaPicture: [35,97,52]},
    "saturn":{ wikiLink: null, videos: [], nasaPicture: [46,26,39,50,95]},
    "neptune":{ wikiLink: null, videos: [], nasaPicture: [80,19,14]},
    "pluto":{ wikiLink: null, videos: [], nasaPicture: [4,3,1,2]}
};

$(document).ready(initializeApp);

function initializeApp(){
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
    getDataFromYoutube();
    populatePictureArr();


}

function displayPlanetInfo(){

}

function getDataFromYoutube() {
    console.log('get data running');
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
                //function to display videos in the modal
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

function renderPhotosOnModal () {
    var photosToRender = $("<img>", {
        "id" : "imageCarousel",
        "src": "images/editsun.jpg"
    });
    $("#contentDiv").append(photosToRender);


    console.log("button works")

}

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
        text: "Images",
        "on": {
            click: renderPhotosOnModal
        }

    });
    var informationButton = $("<button>", {
        "class": "information buttons",
        "id" : "infoButton",
        text: "Information"
    });
    var videosButton = $("<button>", {
        "class": "videos buttons",
        "id" : "videoButton",
        'on': {
            'click': getDataFromYoutube
        },
        text: "Videos"
    });

    var planetWikiLink = $("<a>",{
        target:"_blank",
        href:planetInfo.wikiLink,
        text: planet + " wiki info"
    });
    var contentDiv = $("<div>", {
        "class": "contentDiv",
        "id": "contentDiv"
    });
    var videoList = $("<ul>").addClass('videoListContainer');
    var videoElements = [];
    for(let videoCodeIterator=0; videoCodeIterator<planetInfo.videos.length; videoCodeIterator++){
        var videoLink = $("<li>", {
            text: 'video '+videoCodeIterator,
            on: {
                click: function(){
                    loadAndPlayVideo(planetInfo.videos[videoCodeIterator]);
                }
            }
        });
        videoElements.push( videoLink )
    }
    videoList.append(videoElements);
    modalControls.append(imagesButton, informationButton, videosButton);
    infoContainer.append(planetTitle,contentDiv, modalControls);
    $("#bodyId").append(infoContainer);
    $("#displayModal").show();
}

function loadAndPlayVideo(link, planet){
    $("#videoModal").show();
    $("#videoPlayer").attr('src','https://www.youtube.com/embed/' + link )
}


//omers doing his random shit down here---------------------------------





 
function getWikiText() {
    // var solarBodies = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
    for (let eachBody in solarBodies){
    // for (solarIndex = 0; solarIndex < solarBodies.length; solarIndex++) {
        var wikiAjaxObject = {
            'dataType': 'json',
            'url': 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+eachBody+"&callback=?",
            'success': function(data){
            // console.log(data);
            // var solarBodies = {
            //     "sun":{ wikiLink: null, videos: [], nasaText: ''},
            solarBodies[eachBody].wikiLink='https://en.wikipedia.org/wiki/'+eachBody
            parseWikiText(data)
        
            },
        
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(wikiAjaxObject);
    }
}
getWikiText();

function parseWikiText(data) {
    var markup = data.parse.text["*"];
               //the * is a bad variable name, as an object it can be named ANYTHING. 
               //the ajax call starts with the outer most object which is DATA (that is what is passed in as an arguement,
               //then the next one is PARSE which is also an object and thats why we need TEXT at object *
        var infoDiv = $('<div></div>').html(markup);
        //creating elment of div with the text of markup
        
        infoDiv.find('a').each(function() { $(this).replaceWith($(this).html()); });
        // remove links as they will not work

        infoDiv.find('sup').remove();
     		// remove any references

        infoDiv.find('.mw-ext-cite-error').remove();
    	 // remove cite error
        var paragraphContentArr=($(infoDiv).find('.mw-parser-output>p'))
        var textofParagraphContent=''
        var pContentWithTags=textofParagraphContent
        for(var k=0;k<paragraphContentArr.length;k++){
            pContentWithTags+=("<p>"+paragraphContentArr[k].innerHTML+'</p>')
            
        }
        console.log(pContentWithTags)
        $('#bodyId').append(pContentWithTags)

    
}





function populatePictureArr() {
    // const q = $('#query').val();
    for (let eachBody in solarBodies){
        var NasaImagesObject= {
            url: 'https://images-api.nasa.gov/search?q='+eachBody,
            method: 'GET',
            success: resp => {
                console.log('RESP:', resp);
                // for (let eachBody in solarBodies){
                for(let i=0;i<solarBodies[eachBody].nasaPicture.length;i++){
                    var divToAppend = $("<div>")
                    var imagePath=resp.collection.items[solarBodies[eachBody].nasaPicture[i]].links[0].href;
                    solarBodies[eachBody].nasaPicture[i]=imagePath
                    

                }

            }
            
        }
        $.ajax(NasaImagesObject)
    }
}