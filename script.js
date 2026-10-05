const scenes = [...document.querySelectorAll("[data-scene]")];
const progressSteps = [...document.querySelectorAll("[data-progress]")];
const reasonCards = [...document.querySelectorAll(".reason-card")];
const nextButton = document.querySelector('[data-go="3"]');
const unlockMessage = document.querySelector(".unlock-message");
const celebration = document.querySelector(".celebration");
const confetti = document.querySelector(".confetti");
const game = document.querySelector(".game-overlay");
const quizRound = document.querySelector("[data-quiz-round]");
const roundComplete = document.querySelector("[data-round-complete]");
const questionElement = document.querySelector("[data-question]");
const answersElement = document.querySelector("[data-answers]");
const feedbackElement = document.querySelector("[data-feedback]");
const coinElements = document.querySelectorAll("[data-coins], [data-progress-coins]");
const giftProgressBar = document.querySelector("[data-progress-bar]");
const claimGiftButton = document.querySelector("[data-claim-gift]");
const storageNotice = document.querySelector("[data-storage-notice]");
const giftCost = 50;
const roundLength = 6;
const coinsPerCorrectAnswer = 10;
const coinStorageKey = "maktub-love-quiz-coins";
const biologyQuestions = [
  { grade: 6, question: "O‘simlik hujayrasiga yashil rang berib, fotosintezda qatnashadigan organoid qaysi?", answers: ["Xloroplast", "Yadro", "Vakuola", "Mitoxondriya"], correct: 0, explanation: "Xloroplast tarkibidagi xlorofill yorug‘likni yutadi va fotosintezga yordam beradi." },
  { grade: 6, question: "Suv va mineral moddalarni ildizdan o‘simlikning boshqa qismlariga asosan qaysi to‘qima olib boradi?", answers: ["Ksilema", "Floema", "Qoplovchi to‘qima", "Mexanik to‘qima"], correct: 0, explanation: "Ksilema suv va mineral moddalarni ildizdan yuqoriga tashiydi." },
  { grade: 6, question: "Urug‘ning unib chiqishi uchun odatda nimalar zarur?", answers: ["Suv, havo va qulay harorat", "Faqat quyosh nuri", "Tuzli suv va sovuq", "Faqat tuproq"], correct: 0, explanation: "Unish uchun urug‘ga namlik, kislorod va mos harorat kerak bo‘ladi." },
  { grade: 6, question: "Gulning chang donachalari hosil bo‘ladigan qismi qaysi?", answers: ["Changdon", "Urug‘chi tumshuqchasi", "Gulband", "Kosachabarg"], correct: 0, explanation: "Chang donachalari guldagi changdonlarda hosil bo‘ladi." },
  { grade: 6, question: "Zamburug‘lar oziq moddalarni qanday qabul qiladi?", answers: ["Tayyor organik moddalarni shimib", "Fotosintez qilib", "Quyosh nurini yutib", "Tuproqni hazm qilib"], correct: 0, explanation: "Zamburug‘larda xlorofill bo‘lmaydi; ular tayyor organik moddalarni shimib oziqlanadi." },
  { grade: 6, question: "Ildizning tuproqdan suv shimishida qaysi qismi muhim?", answers: ["Ildiz tukchalari", "Gulbarglar", "Kurtak", "Changchi"], correct: 0, explanation: "Ildiz tukchalari suv va unda erigan mineral moddalarni shimadi." },
  { grade: 6, question: "Bargdagi gaz almashinuvi asosan qaysi tuzilmalar orqali amalga oshadi?", answers: ["Og‘izchalar", "Ildiz tukchalari", "Changdonlar", "Urug‘lar"], correct: 0, explanation: "Barg og‘izchalari karbonat angidrid, kislorod va suv bug‘ining almashinuviga xizmat qiladi." },
  { grade: 6, question: "Moxlar ko‘pincha qayerda yaxshi o‘sadi?", answers: ["Nam va salqin joylarda", "Quruq cho‘lda", "Faqat sho‘r suvda", "Doimiy qor ostida"], correct: 0, explanation: "Moxlar namlikni yaxshi ko‘radi va ko‘pincha salqin, soyali joylarda uchraydi." },
  { grade: 7, question: "O‘rgimchakning nechta oyog‘i bo‘ladi?", answers: ["8 ta", "6 ta", "10 ta", "4 ta"], correct: 0, explanation: "O‘rgimchaksimonlarning voyaga yetgan vakillarida to‘rt juft, ya’ni sakkizta oyoq bo‘ladi." },
  { grade: 7, question: "Hasharotlarning tanasi nechta asosiy bo‘limdan tuzilgan?", answers: ["3 ta: bosh, ko‘krak va qorin", "2 ta: bosh va tana", "4 ta", "5 ta"], correct: 0, explanation: "Hasharot tanasi bosh, ko‘krak va qorin bo‘limlariga bo‘linadi." },
  { grade: 7, question: "Baliqlar suvda asosan qaysi organi bilan nafas oladi?", answers: ["Jabralari", "O‘pkasi", "Terisi", "Traxeyasi"], correct: 0, explanation: "Jabralar suvda erigan kislorodni o‘zlashtirishga moslashgan." },
  { grade: 7, question: "Qushlarning tanasi issiqligini odatda qanday saqlaydi?", answers: ["Pat qoplami yordamida", "Tangachalari bilan", "Nam terisi bilan", "Faqat dum patlari bilan"], correct: 0, explanation: "Pat qoplami issiqlikni saqlashga, parvozga va tanani himoyalashga yordam beradi." },
  { grade: 7, question: "Yomg‘ir chuvalchangining terisi qanday bo‘lishi kerak?", answers: ["Nam", "Quruq va qattiq", "Pat bilan qoplangan", "Tangachali"], correct: 0, explanation: "Chuvalchang nam terisi orqali gaz almashadi, shu bois terisi qurib qolmasligi muhim." },
  { grade: 7, question: "Sutemizuvchilar bolalarini qanday oziqlantiradi?", answers: ["Sut bilan", "Faqat urug‘ bilan", "Jabralar orqali", "Nektar bilan"], correct: 0, explanation: "Sutemizuvchilarning urg‘ochilari bolalarini sut bezlari ishlab chiqargan sut bilan boqadi." },
  { grade: 7, question: "Amfibiyalarning ko‘pchiligi tuxumini qayerga qo‘yadi?", answers: ["Suvga yoki juda nam joyga", "Quruq qumga", "Daraxt po‘stlog‘ining ichiga", "Qor ustiga"], correct: 0, explanation: "Amfibiyalarning tuxumlari odatda suvda rivojlanadi; lichinkalari ham suvda yashaydi." },
  { grade: 7, question: "Qisqichbaqa qaysi hayvonlar guruhiga kiradi?", answers: ["Bo‘g‘imoyoqlilar", "Halqali chuvalchanglar", "Mollyuskalar", "Yassi chuvalchanglar"], correct: 0, explanation: "Qisqichbaqalar bo‘g‘imoyoqlilar tipiga mansub qisqichbaqasimonlardir." },
  { grade: 8, question: "Organizmda qonni haydaydigan asosiy a’zo qaysi?", answers: ["Yurak", "O‘pka", "Jigar", "Buyrak"], correct: 0, explanation: "Yurak qisqarib, qonni qon tomirlari bo‘ylab harakatlantiradi." },
  { grade: 8, question: "Odam nafas olganda kislorod qonga asosan qayerda o‘tadi?", answers: ["O‘pka alveolalarida", "Kekirdakda", "Burun bo‘shlig‘ida", "Halqumda"], correct: 0, explanation: "O‘pkadagi mayda alveolalar devori orqali kislorod qonga diffuziyalanadi." },
  { grade: 8, question: "Ovqat hazm bo‘lishi boshlanadigan a’zo qaysi?", answers: ["Og‘iz bo‘shlig‘i", "Yo‘g‘on ichak", "Jigar", "Oshqozon osti bezi"], correct: 0, explanation: "Ovqat og‘izda chaynaladi va so‘lak tarkibidagi fermentlar kraxmalni parchalay boshlaydi." },
  { grade: 8, question: "Buyraklarning asosiy vazifalaridan biri nima?", answers: ["Qonni filtrlab, siydik hosil qilish", "Qonni haydash", "Ovqatni chaynash", "Kislorod ishlab chiqarish"], correct: 0, explanation: "Buyraklar qonni filtrlab, ortiqcha suv va chiqindi moddalarni siydik ko‘rinishida chiqaradi." },
  { grade: 8, question: "Asab tizimining markaziy qismiga nimalar kiradi?", answers: ["Bosh miya va orqa miya", "Faqat nervlar", "Yurak va qon tomirlari", "O‘pka va bronxlar"], correct: 0, explanation: "Markaziy asab tizimini bosh miya va orqa miya tashkil etadi." },
  { grade: 8, question: "Qizil qon hujayralaridagi gemoglobinning muhim vazifasi nima?", answers: ["Kislorod tashish", "Ovqatni parchalash", "Gormon ishlab chiqarish", "Suyakni mustahkamlash"], correct: 0, explanation: "Gemoglobin kislorodni o‘pkadan to‘qimalarga olib borishga yordam beradi." },
  { grade: 8, question: "Mushaklar qisqarib va bo‘shashib, asosan nima hosil qiladi?", answers: ["Harakat", "Ovqat hazmi", "Eshitish", "Qon ivishi"], correct: 0, explanation: "Mushaklarning qisqarishi va bo‘shashishi tana hamda ichki a’zolar harakatini ta’minlaydi." },
  { grade: 8, question: "Yorug‘lik va tasvirni qabul qiluvchi sezgi a’zosi qaysi?", answers: ["Ko‘z", "Quloq", "Burun", "Til"], correct: 0, explanation: "Ko‘zning to‘r pardasidagi sezgir hujayralar yorug‘likni qabul qilib, nerv signallariga aylantiradi." }
];

let totalCoins = loadCoins();
let roundQuestions = [];
let previousRoundIds = new Set();
let questionIndex = 0;
let roundCoins = 0;
let answered = false;
let displayedAnswers = [];
let returnFocusElement = null;

function showScene(sceneNumber) {
  scenes.forEach((scene) => {
    const isCurrent = Number(scene.dataset.scene) === sceneNumber;
    scene.hidden = !isCurrent;
    scene.classList.toggle("is-visible", isCurrent);
  });
  progressSteps.forEach((step) => {
    const isCurrent = Number(step.dataset.progress) === sceneNumber;
    step.classList.toggle("is-active", isCurrent);
    if (isCurrent) step.setAttribute("aria-current", "step");
    else step.removeAttribute("aria-current");
  });
  document.querySelector(`[data-scene="${sceneNumber}"]`).focus();
}

function loadCoins() {
  try {
    const storedValue = window.localStorage.getItem(coinStorageKey);
    if (storedValue === null) return 0;
    const parsedValue = Number(storedValue);
    if (!Number.isSafeInteger(parsedValue) || parsedValue < 0) {
      throw new Error("Saqlangan coin qiymati yaroqsiz.");
    }
    return parsedValue;
  } catch (error) {
    storageNotice.textContent = "Coinlarni brauzerda saqlab bo‘lmadi. O‘yin davomida yig‘ish mumkin, lekin sahifani yopganda saqlanmasligi mumkin.";
    return 0;
  }
}

function saveCoins() {
  try {
    window.localStorage.setItem(coinStorageKey, String(totalCoins));
    storageNotice.textContent = "";
  } catch (error) {
    storageNotice.textContent = "Coinlar hozircha saqlandi, ammo brauzer xotirasiga yozilmadi. Sahifani yopma!";
  }
}

function updateCoinDisplay() {
  coinElements.forEach((element) => { element.textContent = String(totalCoins); });
  giftProgressBar.style.width = `${Math.min((totalCoins / giftCost) * 100, 100)}%`;
  const canClaimGift = totalCoins >= giftCost;
  claimGiftButton.disabled = !canClaimGift;
  document.querySelector("[data-gift-button-label]").textContent = canClaimGift
    ? "Sovg‘ani ochish!"
    : `${giftCost - totalCoins} coin qoldi — davom et!`;
}

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[otherIndex]] = [copy[otherIndex], copy[index]];
  }
  return copy;
}

function startRound() {
  const selectedQuestions = [6, 7, 8].flatMap((grade) => {
    const gradeQuestions = biologyQuestions.filter((question) => question.grade === grade);
    const unseenQuestions = gradeQuestions.filter((question) => !previousRoundIds.has(question));
    return shuffled(unseenQuestions.length >= 2 ? unseenQuestions : gradeQuestions).slice(0, 2);
  });
  roundQuestions = shuffled(selectedQuestions);
  previousRoundIds = new Set(roundQuestions);
  questionIndex = 0;
  roundCoins = 0;
  quizRound.hidden = false;
  roundComplete.hidden = true;
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = roundQuestions[questionIndex];
  displayedAnswers = shuffled(currentQuestion.answers.map((answer, originalIndex) => ({ answer, originalIndex })));
  answered = false;
  document.querySelector("[data-question-count]").textContent = `${questionIndex + 1} / ${roundLength}`;
  document.querySelector("[data-question-grade]").textContent = `${currentQuestion.grade}-sinf`;
  document.querySelector("[data-question-progress]").style.width = `${(questionIndex / roundLength) * 100}%`;
  questionElement.textContent = currentQuestion.question;
  feedbackElement.textContent = "";
  feedbackElement.className = "answer-feedback";
  document.querySelector("[data-next-question]").hidden = true;
  answersElement.replaceChildren(...displayedAnswers.map(({ answer }, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.dataset.answerIndex = String(index);
    const letter = document.createElement("span");
    letter.className = "answer-option__letter";
    letter.textContent = String.fromCharCode(65 + index);
    const answerText = document.createElement("span");
    answerText.textContent = answer;
    button.append(letter, answerText);
    button.addEventListener("click", () => selectAnswer(index));
    return button;
  }));
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const currentQuestion = roundQuestions[questionIndex];
  const correctDisplayIndex = displayedAnswers.findIndex(({ originalIndex }) => originalIndex === currentQuestion.correct);
  const isCorrect = displayedAnswers[selectedIndex].originalIndex === currentQuestion.correct;
  const answerButtons = [...answersElement.querySelectorAll(".answer-option")];
  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctDisplayIndex) button.classList.add("is-correct");
    else if (index === selectedIndex) button.classList.add("is-incorrect");
  });

  if (isCorrect) {
    roundCoins += coinsPerCorrectAnswer;
    totalCoins += coinsPerCorrectAnswer;
    saveCoins();
    updateCoinDisplay();
    feedbackElement.textContent = `To‘ppa-to‘g‘ri! +${coinsPerCorrectAnswer} coin. ${currentQuestion.explanation}`;
    feedbackElement.classList.add("is-correct");
  } else {
    const correctAnswer = currentQuestion.answers[currentQuestion.correct];
    feedbackElement.textContent = `Bu safar emas — to‘g‘ri javob: ${correctAnswer}. ${currentQuestion.explanation}`;
    feedbackElement.classList.add("is-incorrect");
  }
  document.querySelector("[data-question-progress]").style.width = `${((questionIndex + 1) / roundLength) * 100}%`;
  const nextButton = document.querySelector("[data-next-question]");
  nextButton.querySelector("span").textContent = questionIndex === roundLength - 1 ? "Raund natijasi" : "Keyingi savol";
  nextButton.hidden = false;
  nextButton.focus();
}

function finishRound() {
  quizRound.hidden = true;
  roundComplete.hidden = false;
  document.querySelector("[data-round-score]").textContent =
    `Bu raundda ${roundCoins} coin olding. Jami: ${totalCoins} coin. Yangi savollar bilan yana urinib ko‘r!`;
  document.querySelector("[data-new-round]").focus();
}

function openGame() {
  returnFocusElement = document.activeElement;
  game.hidden = false;
  startRound();
  game.querySelector(".game-close").focus();
}

function closeGame() {
  game.hidden = true;
  returnFocusElement?.focus();
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showScene(Number(button.dataset.go)));
});

reasonCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("is-open")) return;
    card.classList.add("is-open");
    card.setAttribute("aria-expanded", "true");

    const allOpened = reasonCards.every((reasonCard) => reasonCard.classList.contains("is-open"));
    if (allOpened) {
      nextButton.disabled = false;
      nextButton.classList.remove("button--locked");
      unlockMessage.textContent = "Uchta yurakcha ham ochildi. Endi maktub seni kutyapti ♡";
      unlockMessage.classList.add("is-complete");
    }
  });
});

function closeCelebration() {
  celebration.hidden = true;
  confetti.replaceChildren();
  document.querySelector("[data-open-game]").focus();
}

function openCelebration() {
  celebration.hidden = false;
  celebration.querySelector(".celebration__close").focus();
  const symbols = ["♡", "✦", "✧", "♥", "·"];
  const fragments = Array.from({ length: 42 }, (_, index) => {
    const piece = document.createElement("span");
    piece.textContent = symbols[index % symbols.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--drift", `${Math.round(Math.random() * 180 - 90)}px`);
    piece.style.animationDelay = `${Math.random() * 1.4}s`;
    piece.style.fontSize = `${12 + Math.random() * 17}px`;
    return piece;
  });
  confetti.replaceChildren(...fragments);
}

document.querySelector("[data-open-game]").addEventListener("click", openGame);
document.querySelector(".game-close").addEventListener("click", closeGame);
document.querySelector("[data-new-round]").addEventListener("click", startRound);
document.querySelector("[data-next-question]").addEventListener("click", () => {
  if (questionIndex === roundLength - 1) finishRound();
  else {
    questionIndex += 1;
    renderQuestion();
    questionElement.focus();
  }
});
claimGiftButton.addEventListener("click", () => {
  if (totalCoins < giftCost) return;
  closeGame();
  openCelebration();
});
document.querySelector(".celebration__close").addEventListener("click", closeCelebration);
document.querySelector("[data-close-celebration]").addEventListener("click", closeCelebration);

function trapDialogFocus(dialog, event, close) {
  if (event.key === "Escape") {
    close();
    return true;
  }

  if (event.key !== "Tab") return false;
  const buttons = [...dialog.querySelectorAll("button:not(:disabled):not([hidden])")]
    .filter((button) => button.getClientRects().length > 0);
  const firstButton = buttons[0];
  const lastButton = buttons[buttons.length - 1];

  if (event.shiftKey && document.activeElement === firstButton) {
    event.preventDefault();
    lastButton.focus();
  } else if (!event.shiftKey && document.activeElement === lastButton) {
    event.preventDefault();
    firstButton.focus();
  }
  return true;
}

celebration.addEventListener("keydown", (event) => {
  trapDialogFocus(celebration, event, closeCelebration);
});

game.addEventListener("keydown", (event) => {
  trapDialogFocus(game, event, closeGame);
});

document.querySelector(".wordmark").addEventListener("click", (event) => {
  event.preventDefault();
  game.hidden = true;
  celebration.hidden = true;
  confetti.replaceChildren();
  showScene(1);
});

updateCoinDisplay();
