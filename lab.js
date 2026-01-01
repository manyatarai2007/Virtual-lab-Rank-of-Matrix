let currentTopic = "";

// Topic order for auto-navigation
const topics = ['rank','system','eigen','kirchhoff'];


function showSection(id){
  document.querySelectorAll('.content').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

const quizData = {
  rank: [
    {q:"Rank of zero matrix?",o:["0","1","Order","Undefined"],a:0},
    {q:"Max rank of 3x3?",o:["1","2","3","0"],a:2},
    {q:"Rank of identity matrix?",o:["0","1","n","n−1"],a:2},
    {q:"Rank equals number of?",o:["Columns","Rows","Independent rows","Zeros"],a:2},
    {q:"Rank of singular matrix?",o:["Full","0","< order","∞"],a:2},
    {q:"Rank found after?",o:["Inverse","Transpose","Row echelon","Determinant"],a:2},
    {q:"Rank ≤ ?",o:["Rows","Columns","Min(rows,cols)","Max"],a:2},
    {q:"Rank helps find?",o:["Area","Volume","Nature of solution","Angle"],a:2},
    {q:"Rank of [1 2;2 4]?",o:["0","1","2","3"],a:1},
    {q:"Full rank means?",o:["Dependent","Independent","Zero","Infinite"],a:1}
  ],
  system: [
    {q:"Unique solution when?",o:["rank<n","rank=n","rank>n","rank=0"],a:1},
    {q:"Infinite solutions when?",o:["rank<n","rank=n","rank>n","rank=0"],a:0},
    {q:"No solution when?",o:["rank(A)=rank([A|B])","rank(A)≠rank([A|B])","rank<n","rank>n"],a:1},
    {q:"Augmented matrix contains?",o:["Constants","Variables","Both","None"],a:0},
    {q:"System is consistent if?",o:["rank(A)=rank([A|B])","rank(A)≠rank([A|B])","rank<n","rank>n"],a:0},
    {q:"Dependent equations give?",o:["Unique","Infinite","None","Zero"],a:1},
    {q:"Independent equations give?",o:["Unique","Infinite","None","Zero"],a:0},
    {q:"Rank < variables gives?",o:["Unique","Infinite","No solution","Zero"],a:1},
    {q:"Consistent system means?",o:["Has solution","No solution","Zero","∞"],a:0},
    {q:"Rank concept by?",o:["Gauss","Newton","Euler","Laplace"],a:0}
  ],
  eigen: [
    {q:"Eigen values found by?",o:["|A|","|A−λI|","Aᵀ","Inverse"],a:1},
    {q:"Eigen vectors satisfy?",o:["AX=0","AX=λX","AX=X","AX=A"],a:1},
    {q:"Eigen values of identity?",o:["0","1","n","∞"],a:1},
    {q:"Eigen values of zero matrix?",o:["1","n","0","∞"],a:2},
    {q:"Diagonal matrix eigen values?",o:["Rows","Cols","Diagonal","Zero"],a:2},
    {q:"Eigen values may be?",o:["Complex","Real","Both","None"],a:2},
    {q:"Repeated eigen values called?",o:["Simple","Multiple","Zero","Null"],a:1},
    {q:"Eigen vectors are?",o:["Zero","Non-zero","Unit","None"],a:1},
    {q:"Eigen used in?",o:["Vibration","Google","Quantum","All"],a:3},
    {q:"Eigen values exist for?",o:["Rectangular","Square","Any","None"],a:1}
  ],
  kirchhoff: [
  {q:"Kirchhoff’s Voltage Law is based on?", o:["Energy conservation","Charge","Power","Resistance"], a:0},
  {q:"KCL applies at?", o:["Loop","Node","Branch","Mesh"], a:1},
  {q:"Matrix form of circuit equations?", o:["AX=B","A+B","AB","X=B"], a:0},
  {q:"Unknowns in matrix method are?", o:["Voltages","Currents","Resistance","Power"], a:1},
  {q:"Coefficient matrix contains?", o:["Currents","Voltages","Resistances","Power"], a:2},
  {q:"Augmented matrix includes?", o:["Only A","Only B","A and B","None"], a:2},
  {q:"KVL equation sum equals?", o:["1","Voltage","0","∞"], a:2},
  {q:"Matrix method useful when?", o:["One loop","Many loops","DC only","AC only"], a:1},
  {q:"Kirchhoff laws are used in?", o:["Math","Physics","Circuits","All"], a:3},
  {q:"Main advantage of matrix method?", o:["Speed","Accuracy","Solves multiple eqs","Easy writing"], a:2}
],
chapter :[
  {q:"Rank of zero matrix?",o:["0","1","2","Undefined"],a:0},
  {q:"Unique solution when?",o:["rank<n","rank=n","rank>n","0"],a:1},
  {q:"Eigenvalue equation?",o:["AX=λX","AX=X","AX=0","A=λ"],a:0},
  {q:"Identity matrix eigenvalue?",o:["0","1","n","∞"],a:1},
  {q:"Rank ≤ ?",o:["Rows","Columns","min(m,n)","max"],a:2},
  {q:"KCL relates to?",o:["Energy","Charge","Power","Voltage"],a:1},
  {q:"KVL relates to?",o:["Loop","Node","Branch","Current"],a:0},
  {q:"Matrix form of equations?",o:["AX=B","A+B","A=X","None"],a:0},
  {q:"Eigenvectors are?",o:["Zero","Non-zero","Unit","None"],a:1},
  {q:"Matrices used in?",o:["Math","Engineering","Physics","All"],a:3}
],

};

function startQuiz(topic){
  currentTopic = topic;
  showSection("quiz");
  document.getElementById("quizTitle").innerText = topic.toUpperCase() + " QUIZ";
  const form = document.getElementById("quizForm");
  form.innerHTML = "";

  quizData[topic].forEach((q,i)=>{
    let html = `<div><b>${i+1}. ${q.q}</b><br>`;
    q.o.forEach((opt,j)=>{
      html += `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`;
    });
    html += "</div>";
    form.innerHTML += html;
  });

  document.getElementById("result").innerHTML = "";
}

function submitQuiz(){
  let score = 0;
  let out = "";

  quizData[currentTopic].forEach((q,i)=>{
    const ans = document.querySelector(`input[name="q${i}"]:checked`);
    if(ans && parseInt(ans.value)===q.a){
      score++;
      out += `<p>Q${i+1}: ✅ Correct</p>`;
    }else{
      out += `<p>Q${i+1}: ❌ Wrong (Correct: ${q.o[q.a]})</p>`;
    }
    
  });

  document.getElementById("result").innerHTML = `<h3>Score: ${score}/10</h3>` + out;

  document.getElementById(currentTopic+"Status").innerText = `✅ ${capitalize(currentTopic)} – Topic Completed`;

  // Auto move to next topic after 2 seconds
  setTimeout(()=>goToNextTopic(currentTopic),2000);
}

function goToNextTopic(current){
  const idx = topics.indexOf(current);
  if(idx>=0 && idx<topics.length-1){
    const nextTopic = topics[idx+1];
    showSection(nextTopic);
    document.getElementById(nextTopic).scrollIntoView({behavior:'smooth'});
  }
}

function capitalize(str){ return str.charAt(0).toUpperCase() + str.slice(1); }
// =======================
/******************** CHAPTER QUIZ LOGIC ************************/

let completedTopics = {
  rank: false,
  system: false,
  eigen: false,
  kirchhoff: false
};

let chapterQuizUnlocked = false;

// ---------- CHAPTER QUIZ QUESTIONS ----------
const chapterQuiz = [
  {
    q: "The rank of a matrix represents:",
    o: ["Number of rows", "Independent information", "Order", "Determinant"],
    a: 1
  },
  {
    q: "A system is consistent when:",
    o: ["rank(A) ≠ rank([A|B])", "rank(A) = rank([A|B])", "rank = 0", "rank > variables"],
    a: 1
  },
  {
    q: "Eigenvalues are obtained from:",
    o: ["|A|=0", "|A−λI|=0", "|A+λI|=0", "AX=0"],
    a: 1
  },
  {
    q: "Eigenvectors are:",
    o: ["Zero vectors", "Non-zero vectors", "Scalars", "Matrices"],
    a: 1
  },
  {
    q: "In Kirchhoff’s laws, matrices are used to:",
    o: ["Draw circuits", "Solve linear equations", "Find area", "Find eigenvalues"],
    a: 1
  },
  {
    q: "Kirchhoff’s Current Law is based on:",
    o: ["Energy", "Charge conservation", "Momentum", "Resistance"],
    a: 1
  },
  {
    q: "Kirchhoff’s Voltage Law is based on:",
    o: ["Charge", "Energy conservation", "Power", "Current"],
    a: 1
  },
  {
    q: "If rank < variables, system has:",
    o: ["Unique solution", "No solution", "Infinite solutions", "Zero solution"],
    a: 2
  },
  {
    q: "A full rank square matrix is:",
    o: ["Singular", "Non-invertible", "Invertible", "Zero"],
    a: 2
  },
  {
    q: "Matrices help in circuit analysis by:",
    o: ["Reducing equations", "Increasing complexity", "Removing currents", "Avoiding laws"],
    a: 0
  }
];

// ---------- MARK TOPIC AS COMPLETE ----------
function markTopicCompleted(topicName) {
  completedTopics[topicName] = true;
  checkChapterQuizUnlock();
}

// ---------- CHECK UNLOCK ----------
function checkChapterQuizUnlock() {
  const allDone = Object.values(completedTopics).every(val => val === true);
  if (allDone) {
    chapterQuizUnlocked = true;
    document.getElementById("chapterQuizBtn").disabled = false;
    document.getElementById("chapterQuizBtn").innerText = "🎓 Start Chapter Quiz";
  }
}