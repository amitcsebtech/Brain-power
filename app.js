let gameSeq=[];
let userSeq=[];
let startBtn=document.querySelector("button");
let maxScore=document.querySelector("h3");
let maxValue=0;
let btns=["yellow","purple","green","red"];
let started=false;
let level=0;

let h2=document.querySelector("h2");
startBtn.addEventListener("click",function(){
    if(started==false){
        started=true;
        startBtn.innerText="Start";
        levelUp();
    }
    
});

function gameFlash(btn){
    btn.classList.add("game-flash");

    setTimeout(function(){
        btn.classList.remove("game-flash");
    },250)
}
function userFlash(btn){
    btn.classList.add("user-flash");

    setTimeout(function(){
        btn.classList.remove("user-flash");
    },250)
}
function levelUp(){
    level++;
    h2.innerText=`level ${level}`;

    //random btn choose
    let randomNum=Math.floor(Math.random()*4);
    let randomColor=btns[randomNum];
    gameSeq.push(randomColor);
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameFlash(randomBtn);
}
function checkAns(idx){
    
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            userSeq=[];
            setTimeout(levelUp(),1000);

        }
    }
    else{
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b> Press  to Restart`;
        document.body.style.backgroundColor="red";
        setTimeout(function(){
            document.body.style.backgroundColor="white";
        },500)
        if(level>maxValue) maxValue=level;
        maxScore.innerText=`Max Score: ${maxValue}`;
        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor=btn.classList[1];
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    startBtn.innerText="Restart";
}