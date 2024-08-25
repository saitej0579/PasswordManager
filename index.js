// variables to make changes in project
const passwordisplay = document.querySelector("[data-passwordisplay]")

const copybtn = document.querySelector("[data-copybtn]")

const copymsg = document.querySelector("[data-copymsg]")

const lengthdisplay = document.querySelector("[data-passwordlength]")

const sliderlength = document.querySelector("[data-sliderlength]")

const uppercaseCheck = document.querySelector("#uppercase")

const lowercaseCheck = document.querySelector("#lowercase")

const numbersCheck = document.querySelector("#numbers")

const symbolsCheck = document.querySelector("#symbols")

const strenghtindicator = document.querySelector("[data-strengthindicator]")

const allcheckboxes = document.querySelectorAll("input[type=checkbox]")

const generatebutton = document.querySelector(".generatebutton")

let str = '!@#$%^&*()_+~`?/><}{][|'

//default conditions when we reload

let password = "";
let passwordlength =10;
let checkcount = 0;
handleslider();
//set initial color 


//function for handling the slider and its length
function handleslider (){
    lengthdisplay.innerText = passwordlength;
    sliderlength.value = passwordlength;
}

//function for handling the color and its shadow of the indicator
function indicatorcolor (text){
    strenghtindicator.innerText = text;
}

//fumction for getting a random integer from the range of (min,max)
function rndint (min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

//function for getting random number 
function randominteger (){
    return rndint(0,9); 
}

//function for getting the random lowercase letter
function randomlowercase (){
    return String.fromCharCode(rndint(97,123));
}

//function for getting random uppercase letter 
function randomuppercase (){
    return String.fromCharCode(rndint(65,91));
}

//function for getting the random symbol
function randomsymbol(){
    const ran = rndint(0,str.length);
    return str.charAt(ran);
}

//function for choosing the indicator strength
function caclstrength (){
    let hasnum = false;
    let hasupr = false;
    let haslwr = false;
    let hassym = false;

    if(numbersCheck.checked) hasnum = true;
    if(uppercaseCheck.checked) hasupr = true;
    if(lowercaseCheck.checked) haslwr = true;
    if(symbolsCheck.checked) hassym = true;

    if(hasupr && haslwr && (hasnum || hassym) && passwordlength>=8){
        indicatorcolor("STRONG")
    }
    else if((haslwr || hasupr) && (hasnum || hassym) && passwordlength>=6){
        indicatorcolor("MEDIUM")
    }
    else{
        indicatorcolor("WEAK")

    }
}

//function for copying messege and displaying copied
function copycontent(){ 
    navigator.clipboard.writeText(passwordisplay.value); //until the password displayes this line would not be completes and the copies messege not shows 
}

//adding function for checking the boxes ticked
//in this function on every change in checkboxes it will again check how many boxes are ticked 
function handlecheckboxchange(){
    checkcount = 0;
    allcheckboxes.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    })

    //if 3 checkboxes are checked and the length we gave is 1 we should change the length to 3
    if(passwordlength<checkcount){
        passwordlength = checkcount;
        handleslider();
    }

}

//function for shuffling

function shuffle(arr) {
    //it is fisher yates algo
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join(""); //The join("") method concatenates all the elements of the array into a single string, without any separators (in this case, commas).

}


//here we added an evenrtlistener saying that for every click again check how many boxes are ticked
allcheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener('click',handlecheckboxchange)
})


//adding evert listener for changing the length of the slider and displaying the length
sliderlength.addEventListener("input", function (e){
    passwordlength = e.target.value;
    handleslider();
})

//adding event listener for coping 
copybtn.addEventListener("click",()=>{
    if(passwordisplay.value != ""){
        copycontent();
    }
})



generatebutton.addEventListener("click",()=>{
    //none of the button is clicked
    if(checkcount == 0){
        return window.alert("Error 05430 \nTick Atleast One Box")
    }
    //if 3 checkboxes are checked and the length we gave is 1 we should change the length to 3
    if(passwordlength<checkcount){
        passwordlength = checkcount;
        handleslider();
    }

    //******  now creating the passsword *******

    password = "";

    //adding stuff that is ticked
    //we create an array and add function that are ticked

    let funcarr = [];

    if(numbers.checked){
        funcarr.push(randominteger);
    }
    if(symbols.checked){
        funcarr.push(randomsymbol);
    }
    if(uppercase.checked){
        funcarr.push(randomuppercase);
    }
    if(lowercase.checked){
        funcarr.push(randomlowercase);
    }
    //compulsory including 
    for(let i = 0 ; i < funcarr.length ; i++){
        password += funcarr[i]();
    }
    //remaining including
    for(let i = 0 ; i < passwordlength - funcarr.length; i++){
        let ranindex = rndint(0,funcarr.length);  
        password += funcarr[ranindex]();
    }
    // displaying on ui
    password = shuffle(Array.from(password));
    passwordisplay.value = password;

    //for calculating the strength
    caclstrength();

})
