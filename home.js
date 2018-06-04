window.onload = function() {

    let lastUser = JSON.parse(localStorage.getItem("savedLastUser"));

    document.getElementById("greetings").textContent = "Welcome " + lastUser.u_name;
};