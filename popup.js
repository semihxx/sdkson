
function start(){
   ifrm = document.createElement("iframe"); 
   ifrm.setAttribute("src", localStorage.web +"/popup/index.html#" + localStorage.user_id); 
   ifrm.style.width = 500+"px"; 
   ifrm.style.height = 400+"px"; 
   ifrm.style.border = 0+"px"; 

   document.body.appendChild(ifrm); 
}
document.addEventListener("DOMContentLoaded", start);
