document.addEventListener("DOMContentLoaded", ()=>{
    const loginBtn = document.getElementById("googleLoginBtn");

    loginBtn.addEventListener("click", async ()=>{
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            const user = result.user;
            const email = user.email;

            // Save logged in user
            localStorage.setItem("loggedInUser", email);

            // Admin email list
            const adminEmails = ["surushannu@gmail.com"];

            if (adminEmails.includes(email)) {
                localStorage.setItem("userType", "admin");
                window.location.href = "admin.html";
            } else {
                localStorage.setItem("userType", "player");
                window.location.href = "public.html";
            }
        } catch (err) {
            console.error(err);
            alert("Login failed: " + err.message);
        }
    });

    // Auto redirect if already logged in
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            const email = user.email;
            const adminEmails = ["surushannu@gmail.com"];
            if(adminEmails.includes(email)){
                window.location.href = "admin.html";
            } else {
                window.location.href = "public.html";
            }
        }
    });
});
