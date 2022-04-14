function test(){
    // const  response1 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp01/data/retain")
    // let temp = response1.replaceAll(",","")
    // if (parseInt(response1)>50) {
    //     console.log("Available")
    // }
   
    // const  response2 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp02/data/retain")
    // const  response3 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp03/data/retain")
    // const  response4 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp04/data/retain")
    // const  response5 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp05/data/retain")  
 
    let str = responseGenerator();
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
        if(checkAvailability(URL) == true){
            rStr = rStr+"<div id=div"+index+"> SPP0"+index+" STATUS : Available </div>"
           
        }
        
    }
    // console.log(rStr)
    return rStr
}