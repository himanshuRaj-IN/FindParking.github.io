function test(){
    // document.getElementById("rightDiv").textContent;
    // console.log(document.getElementById("rightDiv").textContent);
    // This 
    const  response = httpGet("https://io.adafruit.com/api/v2/Himanshu00/feeds/spp01/data/retain")
    console.log(response)

    const str = 

    valueArray = ["Himanshu Raj you are doing gread work how are you doign today", "Priyanshu Raj", "Anuj Kumar","ramses","This is the last item of the list "];
    document.getElementById("rightDiv").innerHTML = `<div id="div1">${response} </div>
                                                     <div id="div2"> ${valueArray[1]} </div>
                                                     <div id="div3"> ${valueArray[2]} </div>
                                                     <div id="div4"> ${valueArray[3]} </div>
                                                     <div id="div5"> ${valueArray[4]} </div>`
  
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}