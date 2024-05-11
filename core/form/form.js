const log__btns = document.querySelectorAll(".log__btns");
const sing_in__form = document.querySelector(".sing-in__form");
const sing_up__form = document.querySelector(".sing-up__form");
const btns = document.querySelectorAll("button");
const signUpBtn = document.querySelector(".signUpBtn");
const singInBtn = document.querySelector(".singInBtn");

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
  });
});
log__btns.forEach((btn) =>
  btn.addEventListener("click", function () {
    sing_in__form.classList.toggle("hidden");
    sing_up__form.classList.toggle("hidden");
  })
);

// =============================== show and clode the aside ===============================
//  show aside
const menu_btn = document.querySelector(".header__icon");
const aside = document.querySelector(".aside");
const overlay = document.querySelector(".overlay");

const showmenu = function () {
  aside.style.width = "55%";
  overlay.classList.remove("hidden");
};
menu_btn.addEventListener("click", showmenu);

//  close aside
const close_aside = document.querySelector(".close_aside");
const closeAside = function () {
  aside.style.width = "0";
  overlay.classList.add("hidden");
};
close_aside.addEventListener("click", closeAside);
console.log("dasf");
// =============================== show and clode the aside ===============================

const warn = document.querySelector(".warn");
const warn__p = document.querySelector(".warn__p");
const warn__btn = document.querySelector(".warn__btn");
const wran_icon = document.querySelector(".wran_icon");
const to_login__btn = document.querySelector(".to_login__btn");
const to_login_window = document.querySelector(".to_login");
const to_login__p = document.querySelector(".to_login__p");

const showWarn = function (error) {
  warn.classList.toggle("hiddenl");
  warn__p.innerText = error;
  overlay.classList.toggle("hiddenl");
};

const show_tologin = function () {
  to_login_window.classList.toggle("hiddenl");
  overlay.classList.toggle("hiddenl");
};


warn__btn.addEventListener("click", () => {
  warn.classList.toggle("hiddenl");
  overlay.classList.toggle("hiddenl");
});

to_login__btn.addEventListener("click", () => {
  window.location.href = "form.html";
});

// Add event listener for signUpform
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Perform form validation
  const fName = document.getElementById("fName").value.trim();
  const lName = document.getElementById("lName").value.trim();
  const password = document.getElementById("pass").value;
  const phoneNumber = document.getElementById("phnone").value;
  const confirmPassword = document.getElementById("cPass").value;

  // Validate first name
  if (fName === "") {
    showWarn("Please enter your first name.");
    return;
  }

  // Validate last name
  if (lName === "") {
    showWarn("Please enter your last name.");
    return;
  }

  // Validate password
  if (password === "") {
    showWarn("Please enter a password.");
    return;
  }

  // Validate phone number
  var phoneRegex = /^[0-9]{11}$/;
  if (!phoneRegex.test(phoneNumber)) {
    showWarn("Please enter a valid phone number (11 digits).");
    return;
  }

  // Validate confirm password
  if (confirmPassword === "") {
    showWarn("Please confirm your password.");
    return;
  } else {
    const user = {
      action: "signup",
      phoneNumber: phoneNumber,
      fName: fName,
      lName: lName,
      pass: password,
    };

    fetch("register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          show_tologin();
        } else {
          showWarn(data.error);
        }
      });
  }
});

// Add event listener for form submission
singInBtn.addEventListener("click", function (e) {
  // Prevent default form submission
  e.preventDefault();

  // Perform form validation
  var phone = document.getElementById("phone").value.trim();
  var password = document.getElementById("password").value.trim();

  // Validate phone
  var phoneRegex = /^[0-9]{11}$/;
  if (!phoneRegex.test(phone)) {
    showWarn("Please enter a valid phone number");
    return;
  }
  // Validate password
  if (password === "") {
    showWarn("Please enter a password.");
    return;
  } else {
    const user = {
      action: "signin",
      phoneNumber: phone,
      password: password,
    };

    fetch("register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          window.location.href = "../userpage/user.php";
        } else {
          showWarn(data.error);
        }
      });
    // const xhr = new XMLHttpRequest();
  }
});
