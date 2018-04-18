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
    // getDataFromYoutube();
    populatePictureArr();
    $('.jupiterDiv').on('click',function(){
        createCarousel(solarBodies['saturn'].nasaPicture);
    });
}

function displayPlanetInfo(){

}

function getDataFromYoutube(planetInfo) {
        var youtubeAjaxObject = {
            'dataType': 'json',
            'url': 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            'method': 'POST',
            'timeout': 3000,
            'data': {
                'q': 'solar system ' + planetInfo,
                'maxResults': 3,
                'type': 'video',
                'detailLevel': 'verbose'
            },
            'success': function (result) {
                var currentSolarBodiesArr = Object.keys(result.data);
                console.log(Object.keys(result.data));
                solarBodies.planetInfo = currentSolarBodiesArr;
                renderVideosOnModal(currentSolarBodiesArr);
            },
            'error': function (error) {
                console.log(error)
            }
        };
    $.ajax(youtubeAjaxObject);
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

function renderVideosOnModal (currentSolarBodiesArr) {
    var vidModal = $("<div>", {
        "class" : "videoModal",
        "id" : "videoModal",

    });
    var vidModalBody = $("<div>", {
        "class" : "videoModalBody",
        "id" : "videoModalBody",

    });
    var iFrame = $("<iframe>", {
        "id" : "videoPlayer",
        "width" : "560",
        "height" : "315",
        "src" : "",
        "frameborder" : "0",
        "allow" : "autoplay; encrypted-media",
        // allowFullscreen

    });
    $("#contentDiv").append(vidModal, vidModalBody, iFrame);


    var videoList = $("<ul>").addClass('videoListContainer');
    var videoElements = [];
    for(let videoCodeIterator=0; videoCodeIterator<currentSolarBodiesArr.length; videoCodeIterator++){
        var videoLink = $("<li>", {
            text: 'video '+videoCodeIterator,
            on: {
                click: function(){
                    loadAndPlayVideo(currentSolarBodiesArr[videoCodeIterator]);
                }
            }
        });
        videoElements.push( videoLink )
    }
    videoList.append(videoElements);

    $("#contentDiv").append(videoList);
}
function loadAndPlayVideo(link, planet){
    $("#videoModal").show();
    $("#videoPlayer").attr('src','https://www.youtube.com/embed/' + link )
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
        text: planet,
        'on': {
            'click': removeModal
        }
    });
    var modalControls = $("<div>", {
        "class": "modalControls",
        "id": "modalControls",

    });
    var imagesButton = $("<button>", {
        "class": "images buttons",
        "id" : "imageButton",
        text: "Images",
        "on": {
            click: function() {
                imagesButtonHandler(planet)
            }
        }

    });
    var informationButton = $("<button>", {
        "class": "information buttons",
        "id" : "infoButton",
        text: "Information",
        "on" : {
            'click': function(){
                infoButtonHandler(planet)
            }
        },
    });
    var videosButton = $("<button>", {
        "class": "videos buttons",
        "id" : "videoButton",

        "on" : {
            'click': function() {
                videoButtonHandler(planet)
            }

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
        "id": "contentDiv",
    });
    var shadowDiv = $("<div>", {
        "class": "shadowDiv",
        "id": "shadowDiv",
        'on': {
            'click': removeModal
        }
    });



    var videoList = $("<ul>").addClass('videoListContainer');
    var videoElements = [];
    var closeButton = $("<button>", {
       'id': 'closeButton',
       'class': 'closeButton',
        'text': 'x',
        'on': {
           'click': removeModal
        }

    });
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
    planetTitle.append(closeButton);

    modalControls.append(imagesButton, informationButton, videosButton);
    infoContainer.append(planetTitle,contentDiv, modalControls);

    $("#bodyId").append(infoContainer, shadowDiv);
    $("#displayModal").show();
}

function infoButtonHandler(planet) {
    $('#contentDiv').empty();
    getWikiText(planet);
}

function imagesButtonHandler(planet) {
    $('#contentDiv').empty();
    createCarousel(planet);
}

function videoButtonHandler(planet) {
    $('#contentDiv').empty();
    getDataFromYoutube (planet);
}


function removeModal() {
    $('#displayModal').remove();
    this.remove()
}


function loadAndPlayVideo(link, planet){
    $("#videoModal").show();
    $("#videoPlayer").attr('src','https://www.youtube.com/embed/' + link )
}

//omers doing his random things down here---------------------------------

function getWikiText(planet) {
    if( planet ==='mercury')  {
        var link='Mercury_(planet)'
        var wikiAjaxObject = {

            
            // Mercury_(planet)
                'dataType': 'json',
                'url': 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+link+"&callback=?",
                'success': function(data){
                // console.log(data);
                // var solarBodies = {
                //     "sun":{ wikiLink: null, videos: [], nasaText: ''},
                solarBodies[planet].wikiLink='https://en.wikipedia.org/wiki/'+planet
                parseWikiText(data)

            
                },
            
                'error': function (error) {
                    console.log(error)
                }
            };
        $.ajax(wikiAjaxObject);
    } else {
        console.log(planet)
        var wikiAjaxObject = {
            
            // Mercury_(planet)
                'dataType': 'json',
                'url': 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+planet+"&callback=?",
                'success': function(data){
                // console.log(data);
                // var solarBodies = {
                //     "sun":{ wikiLink: null, videos: [], nasaText: ''},
                solarBodies[planet].wikiLink='https://en.wikipedia.org/wiki/'+planet
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
               //the ajax call starts with the outer most object which is DATA (that is what is passed in as an argument,
               //then the next one is PARSE which is also an object and thats why we need TEXT at object *
        var infoDiv = $('<div></div>').html(markup);
        //creating elment of div with the text of markup
        
        infoDiv.find('a').each(function() { $(this).replaceWith($(this).html()); });
        // remove links as they will not work

        infoDiv.find('sup').remove();
     		// remove any references

        infoDiv.find('.mw-ext-cite-error').remove();
    	 // remove cite error
        var paragraphContentArr=($(infoDiv).find('.mw-parser-output>p'));
        var textofParagraphContent='';
        var pContentWithTags=textofParagraphContent;
        for(var k=0;k<paragraphContentArr.length;k++){
            pContentWithTags+=("<p>"+paragraphContentArr[k].innerHTML+'</p>')
            
        }
        // console.log(pContentWithTags)
        $('#contentDiv').append(pContentWithTags);
        console.log(pContentWithTags)

    
}

function populatePictureArr() {
    // const q = $('#query').val();
    for (let eachBody in solarBodies){
        var NasaImagesObject= {
            url: 'https://images-api.nasa.gov/search?q='+eachBody,
            method: 'GET',
            success: resp => {
                // console.log('RESP:', resp);
                // for (let eachBody in solarBodies){
                for(let i=0;i<solarBodies[eachBody].nasaPicture.length;i++){
                    var divToAppend = $("<div>");
                    var imagePath=resp.collection.items[solarBodies[eachBody].nasaPicture[i]].links[0].href;
                    solarBodies[eachBody].nasaPicture[i]=imagePath
                    

                }

            }
            
        };
        $.ajax(NasaImagesObject)
    }
}

function createCarousel(planetStr){
    var images=solarBodies[planetStr].nasaPicture;
    var carouselContainer=$('<div>',{
        'class':'carouselContainer'
    });
    $('.contentDiv').append(carouselContainer);//inside this selector pick where the carousel should go
    for(var i=0; i<images.length; i++){
        console.log('i:',i);
        var planetImageContainer= $('<div>');
        $('.carouselContainer').append(planetImageContainer);
        planetImageContainer.css({"background-image":'url('+images[i]+')','height':'300px','width':'300px'});
        if(i===0){
            planetImageContainer.addClass('currentImage');
            planetImageContainer.addClass('hide');
        }else{
            planetImageContainer.addClass('hide');
        }
    }
    $('.carouselContainer > div').on('click', rotate);
}

function rotate(){
    $(this).removeClass('currentImage');
    var nextImage = $(this).next();
    if (nextImage.length !== 0) {
        nextImage.addClass('currentImage');
    } else {
        $('.carouselContainer :first-child').addClass('currentImage');
    }
}