const firebaseConfig = {
    apiKey: "AIzaSyDbtnjDKjCjwqjlBrKGT90oJ3sxWvznHtw",
    authDomain: "grimdev-b19a4.firebaseapp.com",
    databaseURL: "https://grimdev-b19a4-default-rtdb.firebaseio.com",
    projectId: "grimdev-b19a4",
    storageBucket: "grimdev-b19a4.appspot.com",
    messagingSenderId: "824367308466",
    appId: "1:824367308466:web:5a6baa6a4c8b0cac22f3ab",
    measurementId: "G-CE127YXYQ3"
  };

// Initialize Firebase
if(firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const db=firebase.database().ref('users');


function register(){
    let name=document.getElementById("name").value;
    let uname=document.getElementById("username").value;
    let pass=document.getElementById("password").value;
    console.log(name, uname, pass);
    if(uname.length>=4 && uname.length<=12 && name.length>0 && pass.length<=14 && pass.length>=6){
        check(name, pass, uname);
        firebase.database().ref("users").once('value', (a)=>{
            console.log(a.val())
            if(a.child(uname).exists()){
                console.log("exists");
                document.getElementById("uns").innerHTML="Username already exists";
                document.getElementById("uns").style.display="block";
            }else{
                let obj={}
                obj[uname]={name:name,
                        password:pass
                        }
                db.update(obj);
                document.getElementById("name").value="";
                document.getElementById("username").value="";
                document.getElementById("password").value="";
                document.getElementById("alert").style.display="block";
            }
            console.log("ok")
        });
           
    }else{
        check(name, pass, uname);
    }
}

function check(name, pass, uname){
    if(pass.length<6){
        document.getElementById("ps").style.display="block";
    }else if(pass.length>14){
        document.getElementById("ps").style.display="block";
        document.getElementById("ps").innerHTML="password can't exceed 14 digits"
    }
    else{
        document.getElementById("ps").style.display="none";
    }
    if(uname.length<4){
        document.getElementById("uns").innerHTML="Username must contain atleast 4 chars";
        document.getElementById("uns").style.display="block";
    }else if(uname.length>12){
        document.getElementById("uns").innerHTML="username can't exceed 12 chars"
        document.getElementById("uns").style.display="block";
    }
    else{
        document.getElementById("uns").style.display="none";
    }
    if(name.length==0){
        document.getElementById("ns").style.display="block";
    }else{
        document.getElementById("ns").style.display="none";
    }
}


function login(){
    let uname=document.getElementById("user");
    let pass=document.getElementById("pwd");
    let alert=document.getElementById("alert2");
    let msg=document.getElementById("msg");
    firebase.database().ref("users").child(uname.value).once('value', (a)=>{
        try {
            if(a.val().password==pass.value){
                localStorage.setItem("user", a.val().name)
                alert.style.display="block";
                alert.classList.remove("alert-danger");
                alert.classList.add("alert-success");
                document.getElementById("sign").classList.remove("fa-exclamation-triangle");
                document.getElementById("sign").classList.add("fa-check");
                document.getElementById("msg2").innerHTML="Login Succesfull!";
                msg.innerHTML="";
                window.location.href="profile.html"
            }else{
                document.getElementsByClassName("focus-input100")[1].style.setProperty("--color", "red");
                document.getElementsByClassName("symbol-input100")[1].style.setProperty("--color-z", "red");
                pass.focus()
                alert.style.display="block";
                msg.innerHTML="Invalid Password.";
            }
        }catch(error){
            document.getElementsByClassName("focus-input100")[0].style.setProperty("--color", "red");
            document.getElementsByClassName("symbol-input100")[0].style.setProperty("--color-z", "red");
            uname.focus();
            alert.style.display="block";
            msg.innerHTML="Invalid Username and Password.";
            console.log(error)
        
        }
    })

    return false;
}