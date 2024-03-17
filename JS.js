let img = new Image();
let imgData;
const canvas = document.getElementById("Canvas");

class CopieImagine
{
    static copieImg = new Image();
    static origWidth;
    static origHeight;
 
}

class EditImagine
{
    static nrFlip;
    static rotatie = 0;

    static flipHeight;
    static flipWidth;

}

function clearCanvas()
{
    const canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function loadImg(img)
{
    const start = Date.now();

    setTimeout(()=>{

    clearCanvas();

    const canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    
    let x = img.width;
    let y = img.height;
    let c = 10;

    let frac = x/y;
    

    while ( x > 390 || y > 130 )
    {
    y -= c;
    x -= c*frac;
    }

    CopieImagine.origWidth = x;
    CopieImagine.origHeight = y;



    let xEdit = img.width;
    let yEdit = img.height;
    let fracEdit = xEdit/yEdit;
    

    while ( yEdit > 390 || xEdit > 130 )
    {
    yEdit -= c;
    xEdit -= c*fracEdit;
    }

    EditImagine.flipWidth = x;
    EditImagine.flipHeight = y;



    ctx.drawImage(img, 5, 5, x, y);
    
    
    imgData=ctx.getImageData(5,5,img.width,img.height);
    console.log(imgData);
    //ctx.save();
}, 1000);

    const end = Date.now();

    console.log(`Execution time: ${end - start} ms`);

}

async function toObjectUrl(url) {
    //fetch from service to work around cors
    return fetch("https://api.codetabs.com/v1/proxy?quest=" + url)
        .then((response)=> {
          return response.blob();
        })
        .then((blob)=> {
            console.log("aici");
          return URL.createObjectURL(blob);
        });
  }

async function DogAPILoad()
{   

    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", 'https://dog.ceo/api/breeds/image/random', false);
    xhReq.send(null);
    myObj = JSON.parse(xhReq.responseText);
    img.src=await toObjectUrl(myObj.message);

    img.onload=function(){

        loadImg(img);
        CopieImagine.copieImg = img;

    };
    
    
}

//cut inage in half
function imgSplit(imgEdit)
{
    lat = img.width/2;
    imgOrig = getImageData(0, 0, lat, img.height);
    imgEditCopy = getImageData(lat+1, 0, lat, imgEdit.height);
    var ctx = canvas.getContext("2d");
    clearCanvas();
    drawImage(imgOrig, 10, 10);
    drawImage(imgEditCopy, 10+lat+1, 10);
    clearCanvas();
    drawImage(imgEdit, 10, 10);
}

//download img to pc
function saveImg()
{
    var image = document.getElementById("myCanvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
    canvas.setAttribute("href", image);
}

//unused
function restoreImg()
{
    // De verificat save()
    ctx.restore();
}

//mirror image
function imgFlip()
{   
    const canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");

    clearCanvas();

    img = CopieImagine.copieImg;
    let x = CopieImagine.origWidth;
    let y = CopieImagine.origHeight;

  ctx.translate(x, 0);
  ctx.scale(-1, 1);

  if (EditImagine.nrFlip === 0)
{
  ctx.drawImage(img, -5, 5, x, y);
  nrFlip = 1;
}
else{
    ctx.drawImage(img, 5, 5, x, y);
    nrFlip = 0;
}

}


//not working well
function imgRotateRight()
{
    const canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");

    clearCanvas();

    img = CopieImagine.copieImg;
    let x = CopieImagine.origWidth;
    let y = CopieImagine.origHeight;

    ctx.translate(EditImagine.flipHeight, EditImagine.flipWidth);

    ctx.rotate(90 * Math.PI / 180);

    ctx.drawImage(img, 5, 5, y, x);
}

//not working well
function imgRotateLeft()
{
    const canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    ctx.save();

    clearCanvas();

    img = CopieImagine.copieImg;
    let x = CopieImagine.origWidth;
    let y = CopieImagine.origHeight;

    if (EditImagine.rotatie === 0)
    {
        EditImagine.rotatie++;

        ctx.translate(0, y-10);

        ctx.rotate(270 * Math.PI / 180);

        ctx.drawImage(img, 5, 5, EditImagine.flipWidth, EditImagine.flipHeight);

        //ctx.rotate(90 * Math.PI / 180);
    }
    else if (EditImagine.rotatie === 1)
    {
        EditImagine.rotatie++;
        
        ctx.translate(x, -y);

        ctx.rotate(270 * Math.PI / 180);

        ctx.drawImage(img, 5, 5, y, x);
    }
    else if (EditImagine.rotatie === 2)
    {
        EditImagine.rotatie++;
        
        ctx.translate(0, -x);

        ctx.rotate(270 * Math.PI / 180);

        ctx.drawImage(img, 5, 5, EditImagine.flipWidth, EditImagine.flipHeight);
    }
    else if (EditImagine.rotatie === 3)
    {
        EditImagine.rotatie = 0;
        
        ctx.translate(-y, 0);

        ctx.rotate(270 * Math.PI / 180);

        ctx.drawImage(img, 5, 5, y, x);
    }












ctx.restore();

}

function imgZoomOut()
{
    clearCanvas();

    img = CopieImagine.copieImg;

    const canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    
    
    let x = CopieImagine.origWidth;
    let y = CopieImagine.origHeight;

    let frac = x/y;
    let c = 10;

    if ( x > 39 && y > 39 )
    {
    y -= c;
    x -= c*frac;
    
    CopieImagine.origWidth = x;
    CopieImagine.origHeight = y;
    }
    else
    {
        alert("You cannot zoom out anymore!");
        const audio = new Audio('Poze/alert.wav');
        audio.play();
    }

    ctx.drawImage(img, 5, 5, x, y);
    ctx.save();
}

function imgZoomIn()
{
    clearCanvas();

    img = CopieImagine.copieImg;

    const canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    
    let x = CopieImagine.origWidth;
    let y = CopieImagine.origHeight;

    let frac = x/y;
    let c = 10;

    if ( x < 390 && y < 130 )
    {
    y += c;
    x += c*frac;

    CopieImagine.origWidth = x;
    CopieImagine.origHeight = y;
    }
    else
    {
        const audio = new Audio('Poze/alert.wav');
        alert("You cannot zoom in anymore!");
        audio.play();
    }

    ctx.drawImage(img, 5, 5, x, y);
    ctx.save();

}



function conv3x(data, idx, w, m){  
    return (m[0]*data[idx - w - 4] + m[1]*data[idx - 4] + m[2]*data[idx + w - 4]
        -m[0]*data[idx - w + 4] - m[1]*data[idx + 4] - m[2]*data[idx + 4 + 4]);
  }
  
  function conv3y(data, idx, w, m){
    return (m[0]*data[idx - w - 4] + m[1]*data[idx - w] + m[2]*data[idx - w + 4]
        -(m[0]*data[idx + w - 4] + m[1]*data[idx + w] + m[2]*data[idx + w + 4]));
  }
  
  function gradient_internal(pixels, mask)
  {
    var data = pixels.data; 
    var w = pixels.width*4;
    var l = data.length - w - 4;
    var buff = new Uint8ClampedArray(data.length);
    //buff.set(data);
    
    for (var i = w + 4; i < l; i+=4){
      var dx = conv3x(data, i, w, mask);
      var dy = conv3y(data, i, w, mask);
      buff[i] = buff[i + 1] = buff[i + 2] = Math.sqrt(dx*dx + dy*dy);
      buff[i + 3] = 255;
    }
    
    console.log(buff);
    pixels.data.set(buff);
  }
  
  function prewittFilter()
  {
    img = CopieImagine.copieImg;
   
    let x = CopieImagine.origWidth;
    let y = CopieImagine.origHeight;

    const canvas = document.getElementById("Canvas");
    let ctx = canvas.getContext('2d');


        console.log('Test');
        let imgData1 = ctx.getImageData(5, 5, img.width, img.height);
        console.log(imgData1);
        clearCanvas();
        ctx.putImageData(imgData1, imgData1.width/2+1, 0, imgData1.width/2, imgData1.height, x/2+1, 0, x/2, y);
        ctx.drawImage(img, 0, 0, img.width/2, img.height, 0, 0, x/2, y);
    
        gradient_internal(imgData1, [1, 2, 1]); // Apply Prewitt operator
    
    
        ctx.putImageData(imgData1, imgData1.width/2+1, 0, imgData1.width/2, imgData1.height, x/2+1, 0, x/2, y);

  }


  function drawFrame(){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    clearCanvas();

    img = CopieImagine.copieImg;
   
    let x = CopieImagine.origWidth;
    let y = CopieImagine.origHeight; 

    ctx.filter = new CanvasFilter([
        {
          filter: "convolveMatrix",
          kernelMatrix: [[0, 1, 0], [1, -4, 1], [0, 1, 0]],
           bias: 0,
           divisor: 1,
           preserveAlpha: "true",
        }
     ]);
    context.drawImage(img, 0, 0);
  }