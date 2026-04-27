
let users = JSON.parse(localStorage.getItem("users"));

if (users == null) {
    users = [];
}

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function findUser(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return users[i];
        }
    }
    return null;
}

//Change Forms
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

document.getElementById("signup-btn").onclick = function () {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
};

document.getElementById("login-btn").onclick = function () {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
};

//Show & Hide Password 
const eyes = document.querySelectorAll(".toggle-password");

for (let i = 0; i < eyes.length; i++) {
    eyes[i].onclick = function () {
        const input = document.getElementById(this.getAttribute("data-target"));

        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        } else {
            input.type = "password";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }
    };
}

//Validation
function validateEmail(email) {
    if (email === "") {
        return "Email is required";
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        return "Invalid email";
    }
    return "";
}

function validatePassword(password) {
    if (password === "") {
        return "Password is required";
    }
    if (password.length < 6) {
        return "Minimum 6 characters";
    }
    return "";
}

function validateName(name) {
    if (name === "") {
        return "Name is required";
    }
    if (name.length < 2) {
        return "Minimum 2 characters";
    }
    return "";
}

function validateConfirm(password, confirm) {
    if (confirm === "") {
        return "Confirm password";
    }
    if (password !== confirm) {
        return "Passwords do not match";
    }
    return "";
}

//Login
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.querySelector("#login .submit-btn");

loginEmail.oninput = function () {
    checkLogin();
};

loginPassword.oninput = function () {
    checkLogin();
};

function checkLogin() {
    const emailError = validateEmail(loginEmail.value);
    const passError = validatePassword(loginPassword.value);

    document.getElementById("login-email-error").textContent = emailError;
    document.getElementById("login-password-error").textContent = passError;

    if (emailError === "" && passError === "") {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}

document.getElementById("login").onsubmit = function (e) {
    e.preventDefault();

    const user = findUser(loginEmail.value);

    if (user == null) {
        document.getElementById("login-email-error").textContent = "User not found";
        return;
    }

    if (user.password !== loginPassword.value) {
        document.getElementById("login-password-error").textContent = "Wrong password";
        return;
    }

    alert("Login successful!");
};

// SignUp
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupConfirm = document.getElementById("signup-confirm-password");
const signupBtn = document.querySelector("#signup .submit-btn");

signupName.oninput = checkSignup;
signupEmail.oninput = checkSignup;
signupPassword.oninput = checkSignup;
signupConfirm.oninput = checkSignup;

function checkSignup() {
    const nameError = validateName(signupName.value);
    const emailError = validateEmail(signupEmail.value);
    const passError = validatePassword(signupPassword.value);
    const confirmError = validateConfirm(signupPassword.value, signupConfirm.value);

    document.getElementById("signup-name-error").textContent = nameError;
    document.getElementById("signup-email-error").textContent = emailError;
    document.getElementById("signup-password-error").textContent = passError;
    document.getElementById("signup-confirm-error").textContent = confirmError;

    if (nameError === "" && emailError === "" && passError === "" && confirmError === "") {
        signupBtn.disabled = false;
    } else {
        signupBtn.disabled = true;
    }
}

document.getElementById("signup").onsubmit = function (e) {
    e.preventDefault();

    if (findUser(signupEmail.value) != null) {
        document.getElementById("signup-email-error").textContent = "Email already exists";
        return;
    }

    const newUser = {
        email: signupEmail.value,
        password: signupPassword.value
    };

    users.push(newUser);
    saveUsers();

    alert("Account created!");

    signupForm.style.display = "none";
    loginForm.style.display = "block";
};