function test(){
    const value = document.querySelector('#location').value;
    
    if(value == "ABCParking"){
    document.getElementById("searchResultTiltle").innerHTML = '<div class="SearchResultTitle">Spots Available in '+value+'</div>'
    let str = responseGenerator("Himanshu00");
    document.getElementById("searchResult").innerHTML = str
    }else{
        document.getElementById("searchResultTiltle").innerHTML = '<div class="SearchResultTitle">Spots Available in '+value+'</div>'
        document.getElementById("searchResult").innerHTML = "Opps Not Found !! <br> Try other nearby Location"
    }
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

function responseGenerator(username){
    let rStr = ""
    for (let index = 1; index < 6; index++) {
        let URL = "https://io.adafruit.com/api/v2/"+username+"/feeds/spp0"+index+"/data/retain"
        // console.log(checkAvailability(URL))
      
        buttonStr = '<button type= "button"  class ="BookButton"id="BookButton'+index+'" onclick="BookSpot()">Book</button>'
        if(checkAvailability(URL) == true){
            rStr = rStr+"<div id=div"+index+"> SPP0"+index+" STATUS : Available "+buttonStr+"</div>"
           
        }
        
    }
    // console.log(rStr)
    return rStr
}
function BookSpot(){ 
    alert("Hi Your booking Confirmed. Please aquire spot in next 20 Minutes.")
    console.log("booked")
}