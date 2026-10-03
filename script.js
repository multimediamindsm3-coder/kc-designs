var WA_NUMBER = "9110321582";          // WhatsApp number: country code, no +
var RZP_KEY   = "rzp_test_XXXXXXXXXXXX"; // Razorpay KEY ID only. NEVER put the secret key here.
function v(id){return document.getElementById(id).value;}
function sendWA(text){window.open("https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(text),"_blank");}

/* ---- PRODUCTS: edit names, prices (numbers) and image file names ---- */
var items=[
 {id:1,n:"Fancy Saree",p:2500,img:"images/fancy-saree.jpg"},
 {id:2,n:"Pattu Saree",p:6500,img:"images/pattu-saree.jpg"},
 {id:3,n:"Lehenga Set",p:4500,img:"images/lehenga.jpg"},
 {id:4,n:"Saree Blouse",p:900,img:"images/blouse.jpg"}
];
function find(id){return items.filter(function(i){return i.id==id;})[0];}

/* ---- CART (saved in the browser) ---- */
function getCart(){try{return JSON.parse(localStorage.getItem("kc_cart"))||[];}catch(e){return [];}}
function saveCart(c){try{localStorage.setItem("kc_cart",JSON.stringify(c));}catch(e){}updateCount();}
function updateCount(){var n=getCart().reduce(function(a,x){return a+x.q;},0);var e=document.getElementById("cartcount");if(e)e.textContent=n;}
function addToCart(id){var c=getCart();var f=c.filter(function(x){return x.id==id;})[0];if(f){f.q++;}else{c.push({id:id,q:1});}saveCart(c);alert("Added to cart");}
function changeQty(id,d){var c=getCart();c.forEach(function(x){if(x.id==id)x.q+=d;});c=c.filter(function(x){return x.q>0;});saveCart(c);renderCart();}
function cartTotal(){return getCart().reduce(function(a,x){var i=find(x.id);return a+(i?i.p*x.q:0);},0);}

var box=document.getElementById("products");
if(box){items.forEach(function(i){
 box.innerHTML+='<div class="card"><img src="'+i.img+'" alt="'+i.n+'"><div class="info"><b>'+i.n+'</b><br><span class="price">Rs '+i.p+'</span><button class="btn" onclick="addToCart('+i.id+')">Add to Cart</button></div></div>';
});}

function renderCart(){
 var list=document.getElementById("cartlist"); if(!list)return;
 var c=getCart(); list.innerHTML="";
 if(!c.length){list.innerHTML="<p>Your cart is empty. <a href='collection.html'>Shop now</a></p>";}
 c.forEach(function(x){var i=find(x.id);if(!i)return;
  list.innerHTML+='<div class="cartrow"><img src="'+i.img+'"><div class="grow"><b>'+i.n+'</b><br>Rs '+i.p+'</div><div class="qty"><button onclick="changeQty('+i.id+',-1)">-</button> '+x.q+' <button onclick="changeQty('+i.id+',1)">+</button></div></div>';
 });
 document.getElementById("total").textContent="Total: Rs "+cartTotal();
}
function orderText(){
 var lines=getCart().map(function(x){var i=find(x.id);return i.n+" x"+x.q+" = Rs "+(i.p*x.q);}).join("\n");
 return "NEW ORDER\n"+lines+"\nTotal: Rs "+cartTotal()+"\nName: "+v("cname")+"\nPhone: "+v("cphone")+"\nAddress: "+v("caddr");
}
function checkValid(){
 if(!getCart().length){alert("Cart is empty");return false;}
 if(!v("cname")||!v("cphone")||!v("caddr")){alert("Please fill name, phone and address");return false;}
 return true;
}
function orderWA(){if(checkValid())sendWA(orderText()+"\nPayment: Pay later / COD");}
function payNow(){
 if(!checkValid())return;
 var o={key:RZP_KEY,amount:cartTotal()*100,currency:"INR",name:"Kathyayini & Chaarvi",description:"Clothing order",
  prefill:{name:v("cname"),contact:v("cphone")},notes:{address:v("caddr")},theme:{color:"#b5334a"},
  handler:function(r){var t=orderText()+"\nPAID online. Razorpay Payment ID: "+r.razorpay_payment_id;saveCart([]);renderCart();sendWA(t);}};
 new Razorpay(o).open();
}

/* ---- FORMS ---- */
function updatePreview(){var p=document.getElementById("preview");if(p){p.style.background=v("colour");p.textContent=v("type")+" - "+v("fabric");}}
function sendDesign(){sendWA("DESIGN REQUEST\nName: "+v("name")+"\nPhone: "+v("phone")+"\nOutfit: "+v("type")+"\nFabric: "+v("fabric")+"\nColour: "+v("colour")+"\nNeckline/Sleeves: "+v("style")+"\nNotes: "+v("notes"));}
function sendMeasure(){sendWA("MEASUREMENTS (inches)\nName: "+v("name")+"\nPhone: "+v("phone")+"\nBust: "+v("bust")+"\nWaist: "+v("waist")+"\nHip: "+v("hip")+"\nShoulder: "+v("shoulder")+"\nSleeve length: "+v("sleeve")+"\nTop length: "+v("toplen")+"\nBottom length: "+v("botlen"));}
function sendContact(){sendWA("Hi, I am "+v("name")+" ("+v("phone")+"). "+v("msg"));}
updateCount();renderCart();
