//Where it fails: if two li's are exactly the same, deleting one might actually delete the other, depending on the location of each. 

const form = document.querySelector("#form");
const inputField = document.querySelector("#inputField");
const submitButtonInput = document.querySelector("#submitButtonInput");
const ul = document.querySelector("#myUL");
let li = document.querySelectorAll("li");

let theArray = localStorage.getItem('LIs') ?
JSON.parse(localStorage.getItem('LIs')) : [] ;


function colorFunction (e) {

    e.target.parentElement.style.backgroundColor = `${e.target.value}`;

    }

function restoreFromLocalStorage() {

  
    ul.innerHTML = (theArray.join(' '));
    localStorage.setItem('LIs', JSON.stringify(theArray));


}




if(theArray) {
    theArray.forEach(storedItem => {
        
        restoreFromLocalStorage(storedItem);})
    }


function addItemToArrayViaSubmitButton(e) {

      theArray.unshift(e);
    
      //creates/sets the key called "LIs"
    localStorage.setItem('LIs', JSON.stringify(theArray));
        
    }

    function localStoreColorChanges(e) {

        if(e.target.className !== "colorPickerInput") return;
    
    
    let fullStringContent = e.target.parentElement.innerHTML;
    
    let matchingIndex = theArray.findIndex(myInnerContent => myInnerContent.includes(fullStringContent));
    
    colorFunction(e); //update the color so you can store the updated fullLI
    
    let fullLI = e.target.parentElement.outerHTML;
    
    //splice. Remove and replace.
    theArray.splice(matchingIndex, 1, fullLI);
    
    //reseal and store locally. 
    localStorage.setItem('LIs', JSON.stringify(theArray));
        
    }
    
    ul.addEventListener("input", localStoreColorChanges);
    
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        }
    
    }
    

function createItem(e) {
    e.preventDefault(); 

    if(inputField.value === "") return;

    let newLI = document.createElement("li");
    let newLIText = document.createTextNode(inputField.value);
    let li = document.querySelectorAll("li");
    let spanXDelete = document.createElement("span");
    spanXDelete.textContent = "X";
    spanXDelete.setAttribute("class", "spanXDelete displayNoneX");
    newLI.appendChild(newLIText);
    newLI.appendChild(spanXDelete);
    

    //it's the "unshift" (of array) for the ul... add in reverse
    ul.insertBefore(ul.appendChild(newLI), li[0]);

    inputField.value = ""; 


    if(isMobile.Android()) {

        let colorPicker = document.createElement('input');
        colorPicker.setAttribute("type", "color");
        colorPicker.className = "colorPickerInput";
        colorPicker.setAttribute("value", "#f4beed");
        newLI.appendChild(colorPicker);
        }

        //outerHTML grabs the li and everything in it. 
    addItemToArrayViaSubmitButton(newLI.outerHTML);

    }

    submitButtonInput.addEventListener("click", createItem);



function removeLI(e) {

    

if(e.target.className !== "spanXDelete") return;

let fullLIAndContent = e.target.parentElement.outerHTML;

theArray.splice(theArray.indexOf(fullLIAndContent), 1);

localStorage.setItem('LIs', JSON.stringify(theArray));

ul.removeChild(e.target.parentElement);
}

           ul.addEventListener("click", removeLI);


function toggleLineThrough(e) {

    if(e.target.tagName !== "LI") return;

let fullStringContent = e.target.outerHTML;

let matchingIndex = theArray.indexOf(fullStringContent);

//It's important that the code remains BEFORE the class is toggled (see below) because once the class is added to the span, it will be not able to find a match in the existing parsed localStorage array. 

e.target.classList.toggle("toggleLineThrough");

e.target.querySelector(".spanXDelete").classList.toggle("displayNoneX");

if( isMobile.Android()) {
    let colorPicker = e.target.querySelector(".colorPickerInput");
    colorPicker.classList.toggle("toggleColorInput");    

    }

let fullLI = e.target.outerHTML;

//using the index found in theArray earlier, we replace that array member with the current outerHTML. Then, we do localStorage setItem stringify to package the replacer and localStore (verb) it. 

theArray.splice(matchingIndex, 1, fullLI);

localStorage.setItem('LIs', JSON.stringify(theArray));


    
}

ul.addEventListener("click", toggleLineThrough);




function gainFocus(e) {
    inputField.focus();
}

let plusButton = document.querySelector(".addShortcut__button");

plusButton.addEventListener("click", gainFocus);

function hidePlusButtonOnFocus() {
    plusButton.classList.toggle("transparentPlusToggle");
    let footer = document.querySelector("footer");
    let linkInFooter = footer.querySelector("a");
    linkInFooter.classList.toggle("transparentPlusToggle");

    footer.classList.toggle("transparentPlusToggle");

}

inputField.addEventListener("focus", hidePlusButtonOnFocus);


inputField.addEventListener("focusout", hidePlusButtonOnFocus);


