const app  = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const isLoginPage  = document.getElementById("login-form")  !== null;
const isSignupPage = document.getElementById("signup-form") !== null;
const isHomePage   = document.getElementById("logout")      !== null;

if (isLoginPage) {
  const loginForm = document.getElementById("login");

  auth.signOut().then(() => {
    localStorage.removeItem('loggedOut');
  });

  function clearLoginErrors() {
    const emailError    = document.getElementById("login-email-error");
    const passwordError = document.getElementById("login-password-error");
    if (emailError)    emailError.textContent    = "";
    if (passwordError) passwordError.textContent = "";
    document.querySelectorAll("#login-form .input-icon input").forEach(input => {
      input.classList.remove("error");
    });
  }

  function showLoginError(field, message) {
    const errorElement = document.getElementById(`login-${field}-error`);
    const inputElement = document.getElementById(`login-${field}`);
    if (errorElement) errorElement.textContent = message;
    if (inputElement) inputElement.classList.add("error");
  }

  function enableLoginButton() {
    const btn    = loginForm.querySelector(".submit-btn");
    const inputs = loginForm.querySelectorAll("input[required]");
    let allFilled = true;
    inputs.forEach(input => {
      if (input.value.trim() === "") allFilled = false;
    });
    if (btn) btn.disabled = !allFilled;
  }

  loginForm.addEventListener("input", () => enableLoginButton());

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearLoginErrors();

    const email     = document.getElementById("login-email").value;
    const password  = document.getElementById("login-password").value;
    const submitBtn = loginForm.querySelector(".submit-btn");

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        localStorage.setItem('userEmail', userCredential.user.email);
        window.location.href = "home.html";
      })
      .catch((error) => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        if (error.code === "auth/user-not-found") {
          showLoginError("email", "No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          showLoginError("password", "Incorrect password. Please try again.");
        } else if (error.code === "auth/invalid-email") {
          showLoginError("email", "Please enter a valid email address.");
        } else {
          showLoginError("password", error.message);
        }
      });
  });

  
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    signupBtn.onclick = () => {
      window.location.href = "signup.html";
    };
  }
}

if (isSignupPage) {
  const signupForm = document.getElementById("signup");

  function clearSignupErrors() {
    const nameError     = document.getElementById("signup-name-error");
    const emailError    = document.getElementById("signup-email-error");
    const passwordError = document.getElementById("signup-password-error");
    const confirmError  = document.getElementById("signup-confirm-error");

    if (nameError)     nameError.textContent     = "";
    if (emailError)    emailError.textContent    = "";
    if (passwordError) passwordError.textContent = "";
    if (confirmError)  confirmError.textContent  = "";

    document.querySelectorAll("#signup-form .input-icon input").forEach(input => {
      input.classList.remove("error");
    });
  }

  function showSignupError(field, message) {
    const errorElement = document.getElementById(`signup-${field}-error`);
    const inputElement = document.getElementById(`signup-${field}`);
    if (errorElement) errorElement.textContent = message;
    if (inputElement) inputElement.classList.add("error");
  }

  function enableSignupButton() {
    const btn    = signupForm.querySelector(".submit-btn");
    const inputs = signupForm.querySelectorAll("input[required]");
    let allFilled = true;
    inputs.forEach(input => {
      if (input.value.trim() === "") allFilled = false;
    });
    if (btn) btn.disabled = !allFilled;
  }

  signupForm.addEventListener("input", () => enableSignupButton());

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearSignupErrors();

    const name     = document.getElementById("signup-name").value;
    const email    = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirm  = document.getElementById("signup-confirm-password").value;

    let isValid = true;

    if (name.trim() === "") {
      showSignupError("name", "Full name is required");
      isValid = false;
    }

    if (password !== confirm) {
      showSignupError("confirm", "Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    const submitBtn = signupForm.querySelector(".submit-btn");
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        localStorage.setItem('userName', name.trim());
        return userCredential.user.updateProfile({
          displayName: name.trim()
        });
      })
      .then(() => {
        return auth.signOut();
      })
      .then(() => {
        alert("Account created successfully! Please login.");
        window.location.href = "index.html";
      })
      .catch((error) => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        if (error.code === "auth/email-already-in-use") {
          showSignupError("email", "This email is already registered. Please login instead.");
        } else if (error.code === "auth/weak-password") {
          showSignupError("password", "Password should be at least 6 characters.");
        } else if (error.code === "auth/invalid-email") {
          showSignupError("email", "Please enter a valid email address.");
        } else {
          showSignupError("email", error.message);
        }
      });
  });
}

if (isHomePage) {
  const userName    = localStorage.getItem('userName') || 'User';
  const navName     = document.getElementById('navName');
  const sidebarName = document.getElementById('name');
  const profileName = document.getElementById('profileName');

  if (navName)     navName.textContent     = userName;
  if (sidebarName) sidebarName.textContent = userName;
  if (profileName) profileName.textContent = userName;

  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "index.html";
    }
  });


}

document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", function () {
    const input = document.getElementById(this.dataset.target);
    if (input) {
      if (input.type === "password") {
        input.type = "text";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
      } else {
        input.type = "password";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
      }
    }
  });
});

function handleLogout() {
  auth.signOut()
    .then(() => {
      localStorage.clear();
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
}
