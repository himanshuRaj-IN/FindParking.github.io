function test(){
    // document.getElementById("rightDiv").textContent;
    // console.log(document.getElementById("rightDiv").textContent);
    // This 
    const  response1 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp01/data/retain")
    const  response2 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp02/data/retain")
    const  response3 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp03/data/retain")
    const  response4 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp04/data/retain")
    const  response5 = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp05/data/retain")
    console.log(response1)
    console.log(response2)
    console.log(response3)
    console.log(response4)
    console.log(response5)

    const str = 

    valueArray = ["Himanshu Raj you are doing gread work how are you doign today", "Priyanshu Raj", "Anuj Kumar","ramses","This is the last item of the list "];
    document.getElementById("rightDiv").innerHTML = `<div id="div1"> ${response1} </div>
                                                     <div id="div2"> ${response2} </div>
                                                     <div id="div3"> ${response3} </div>
                                                     <div id="div4"> ${response4} </div>
                                                     <div id="div5"> ${response5} </div>`
  
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}