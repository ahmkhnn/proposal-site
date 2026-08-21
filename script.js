
const question = document.getElementById("question");
const subtext = document.getElementById("subtext");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const reaction = document.getElementById("reaction");
const stepText = document.getElementById("step");
const progressBar = document.getElementById("progressBar");
const scene = document.getElementById("scene");
const celebration = document.getElementById("celebration");

let currentStep = 0;

const questions = [
  {
    title: "Inshaal...",
    text: "Who makes your ordinary days feel a little more special? ✨",
    yes: "Ahmie ❤️"
  },
  {
    title: "Okayyy 👀",
    text: "Who should get your random late-night messages?",
    yes: "Ahmie 📱❤️"
  },
  {
    title: "Be honest... 🥺",
    text: "Who is secretly one of your favourite people?",
    yes: "Ahmie 😭❤️"
  },
  {
    title: "Almost there ✨",
    text: "If Ahmie asked you to stay by his side, what would you say?",
    yes: "I'd stay ❤️"
  },
  {
    title: "Inshaal ❤️",
    text: "Will you choose Ahmie and make this story ours?",
    yes: "YES, ALWAYS 💍"
  }
];

const noReplies = [
  "Arey nhi 🥺",
  "Ho hi nahi sakta 😭",
  "Again think about me 👀❤️",
  "Ab tou haan kar dy 😭",
  "Okay okay... just press YES 😭❤️"
];

function loadStep() {

  const data = questions[currentStep];

  question.style.animation = "none";
  subtext.style.animation = "none";

  void question.offsetWidth;

  question.innerText = data.title;
  subtext.innerText = data.text;
  yesBtn.innerText = data.yes;

  stepText.innerText =
    String(currentStep + 1).padStart(2, "0");

  progressBar.style.width =
    ((currentStep + 1) * 20) + "%";

  reaction.innerText = "";

  question.style.animation =
    "cardEnter .9s cubic-bezier(.16,1,.3,1)";

  subtext.style.animation =
    "cardEnter 1.2s cubic-bezier(.16,1,.3,1)";

  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";
}

yesBtn.addEventListener("click", () => {

  createExplosion();

  if (currentStep < questions.length - 1) {

    scene.style.transform = "scale(1.08)";
    scene.style.opacity = "0";
    scene.style.transition = "all .6s ease";

    setTimeout(() => {

      currentStep++;

      scene.style.transform = "scale(.95)";
      loadStep();

      setTimeout(() => {
        scene.style.transform = "scale(1)";
        scene.style.opacity = "1";
      }, 80);

    }, 600);

  } else {

    setTimeout(() => {
      celebration.style.display = "flex";
      createMassiveCelebration();
    }, 500);

  }
});

noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener("click", dodgeNo);

function dodgeNo() {

  reaction.innerText =
    noReplies[Math.min(currentStep, noReplies.length - 1)];

  noBtn.style.position = "fixed";

  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  noBtn.style.left =
    Math.max(10, Math.random() * maxX) + "px";

  noBtn.style.top =
    Math.max(10, Math.random() * maxY) + "px";

  noBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(.8) rotate(-8deg)" },
      { transform: "scale(1.1) rotate(8deg)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 500,
      easing: "cubic-bezier(.16,1,.3,1)"
    }
  );
}

function createExplosion() {

  for (let i = 0; i < 35; i++) {

    const spark = document.createElement("div");

    spark.className = "spark";

    spark.innerText =
      Math.random() > .5 ? "❤" : "✦";

    spark.style.left = "50%";
    spark.style.top = "50%";

    spark.style.setProperty(
      "--x",
      Math.random() * 160
    );

    spark.style.setProperty(
      "--y",
      Math.random() * 160
    );

    spark.style.fontSize =
      (10 + Math.random() * 20) + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 2100);
  }
}

function createMassiveCelebration() {

  for (let i = 0; i < 100; i++) {

    const spark = document.createElement("div");

    spark.className = "spark";

    spark.innerText =
      Math.random() > .35 ? "❤" : "✦";

    spark.style.left =
      Math.random() * 100 + "vw";

    spark.style.top =
      Math.random() * 100 + "vh";

    spark.style.setProperty(
      "--x",
      Math.random() * 200 - 50
    );

    spark.style.setProperty(
      "--y",
      Math.random() * 200 - 50
    );

    spark.style.fontSize =
      (10 + Math.random() * 25) + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 2500);
  }
}

loadStep();
