var WA_NUMBER = "9110321582"; // your WhatsApp number: country code, no +
function v(id){return document.getElementById(id).value;}
function sendWA(text){window.open("https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(text),"_blank");}

var items=[
 {n:"Lehenga Set",p:"From Rs 4,500",img:"images/lehenga.jpg"},
 {n:"Saree Blouse",p:"From Rs 900",img:"images/blouse.jpg"},
 {n:"Kurti & Palazzo",p:"From Rs 1,200",img:"images/kurti.jpg"},
 {n:"Kids Ethnic Wear",p:"From Rs 800",img:"images/kids.jpg"}
];
var box=document.getElementById("products");
if(box){items.forEach(function(i){
 box.innerHTML+='<div class="card"><img src="'+i.img+'" alt="'+i.n+'"><div class="info"><b>'+i.n+'</b><br><small>'+i.p+'</small></div></div>';
});}

function updatePreview(){
 var p=document.getElementById("preview");
 if(p){p.style.background=v("colour");p.textContent=v("type")+" - "+v("fabric");}
}
function sendDesign(){
 sendWA("DESIGN REQUEST\nName: "+v("name")+"\nPhone: "+v("phone")+"\nOutfit: "+v("type")+"\nFabric: "+v("fabric")+"\nColour: "+v("colour")+"\nNeckline/Sleeves: "+v("style")+"\nNotes: "+v("notes"));
}
function sendMeasure(){
 sendWA("MEASUREMENTS (inches)\nName: "+v("name")+"\nPhone: "+v("phone")+"\nBust: "+v("bust")+"\nWaist: "+v("waist")+"\nHip: "+v("hip")+"\nShoulder: "+v("shoulder")+"\nSleeve length: "+v("sleeve")+"\nTop length: "+v("toplen")+"\nBottom length: "+v("botlen"));
}
function sendContact(){
 sendWA("Hi, I am "+v("name")+" ("+v("phone")+"). "+v("msg"));
}
