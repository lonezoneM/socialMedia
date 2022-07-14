const acctoken=prompt("Enter access token: ");

function verify(){
    firebase.database().ref("admin").once('value', (a)=>{
        if(a.val().token==acctoken){
            console.log("Access granted.")
        }else{
            document.getElementById("apage").setAttribute("class","container-login100 d-flex align-items-center justify-content-center");
            document.getElementById("apage").innerHTML="<span class='p-3 text-warning' style='border:2px solid grey;'>This page has been Locked!!!</span>"
        }
    })
}

verify();