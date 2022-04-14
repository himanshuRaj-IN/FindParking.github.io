function test(){
    const value = document.querySelector('#location').value;
    let str = responseGenerator();
    document.getElementById("searchResultTiltle").innerHTML = '<div class="SearchResultTitle">Spots Available in '+value+'</div>'
    document.getElementById("searchResult").innerHTML = str
  
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function checkAvailability(GetURL){
    const  response = httpGet(GetURL)
    let temp = response.replaceAll(",","")
    // console.log(temp)
    if (parseInt(response)>50) {
        return true
    }
    return false
}

function responseGenerator(){
    let rStr = ""
    for (let index = 1; index < 6; index++) {
        let URL = "https://io.adafruit.com/api/v2/Himanshu00/feeds/spp0"+index+"/data/retain"
        // console.log(checkAvailability(URL))
        buttonStr = '<button type= "button" class="btn-grad" id="BookButton" onclick="BookSpot()" style="height: 35px;">Book</button>'
        if(checkAvailability(URL) == true){
            rStr = rStr+"<div id=div"+index+"> SPP0"+index+" STATUS : Available "+buttonStr+"</div>"
           
        }
        
    }
    // console.log(rStr)
    return rStr
}
function BookSpot(){
    console.log("booked")
    alert("Hi Your booking Confirmed. You have 20 Minutes to aquire postion.")
}