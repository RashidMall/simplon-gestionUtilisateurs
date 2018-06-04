$(document).ready(function(){
    class User{
        constructor(u_fname, u_lname, u_name, 
                    u_gender, u_bdate, u_city, u_pass, 
                    u_email, u_phone, u_website, u_hobby, u_color){
            this.u_fname = u_fname;
            this.u_lname = u_lname;
            this.u_name = u_name;
            this.u_gender = u_gender;
            this.u_bdate = u_bdate;
            this.u_city = u_city;
            this.u_pass = u_pass;
            this.u_email = u_email;
            this.u_phone = u_phone;
            this.u_website = u_website;
            this.u_hobby = u_hobby;
            this.u_color = u_color;
        }
    }

    //Get names of all users from localStorage (if any)
    let usersNames = [];
    let users = [];
    if(JSON.parse(localStorage.getItem("savedData")) != null){
        users = JSON.parse(localStorage.getItem("savedData"));
        usersNames = users.map(function(u){return u.u_name;});
    }

    //Check if the username is available
    let userName = document.getElementById("name");
    userName.addEventListener("input", function(event){
        if(usersNames.includes(userName.value)){
            userName.setCustomValidity("This username is already taken.");
            userName.title = "This username is already taken.";
        }else{
            userName.setCustomValidity("");
        }
      }, false);
    document.getElementsByTagName('form')[0].addEventListener("submit", function(event){
        if (!userName.validity.valid){
          alert("hey hey");
          event.preventDefault();
        }
      }, false);

    //Create new user object
    $('#user_form').submit(function(){
        let fname = $('#fname').val();
        let lname = $('#lname').val();
        let uname = $('#name').val();
        let gender = $('.gender input[name=gender]:checked').val();
        let bdate = $('#date').val();
        let city = $('#city').val();
        let pass = $('#pass').val();
        let email = $('#mail').val();
        let phone = $('#telNo').val();
        let website = $('#myUrl').val();
        let hobby = $('#hobbies').val();
        let color = $('#favorite_color option:selected').val();

        let newUser = new User(fname, lname, uname, gender, bdate, city, pass, email, phone, website, hobby, color);
        users.push(newUser);
        localStorage.setItem("savedData", JSON.stringify(users)); //Add new user to the database
        localStorage.setItem("savedLastUser", JSON.stringify(newUser)); //Save the last created user
        
        /* console.log(newUser);
        event.preventDefault(); */
    });

    //Check the username and password to log in
    $('#login_form').submit(function(event){
        let login_name = $('#logname').val();
        let login_pass = $('#logpass').val();

        if(isCorrectLogin(login_name, login_pass)){
            localStorage.setItem("savedLastUser", JSON.stringify(users[i]));
        }else{
            if(!usersNames.includes(login_name)){
                $('.danger').remove();
                $('<p class="danger">The username you\'ve entered doesn\'t match any account.</p>').insertAfter('#logname');
            }else{
                $('.danger').remove();
                $('<p class="danger">The password you\'ve entered is incorrect. Forgot Password? Shame on you!</p>').insertAfter('#logpass');
            }
            event.preventDefault();
        }
    });

    function isCorrectLogin(name, pass){
        for(let i = 0; i < users.length; i++){
            if(name === users[i].u_name && pass === users[i].u_pass){
                return true;
            }
        }
        return false;
    }

});