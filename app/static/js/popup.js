/*
    NAME:          popup.js
    AUTHOR:        Alan Davies (Lecturer Health Data Science)
    EMAIL:         alan.davies-2@manchester.ac.uk
    DATE:          18/12/2019
    INSTITUTION:   University of Manchester (FBMH)
    DESCRIPTION:   JavaScript file for managing display of popup dialoges
*/

function Popup()
{
    var popup = new Object();
    popup.mask = document.getElementById("page-mask");
    popup.entryFormPopup = document.getElementById("creat-calc");
    popup.aboutPopup = document.getElementById("about-box");

    // display the popup mask
    popup.showMask = function()
    {
        this.mask.style.display = "block";
        $('#page-mask').height($(document).height());
    }

    //hide the popup mask
    popup.hideMask = function()
    {
        this.mask.style.display = "none";
    }

    //show the creatinine clearance calculator form dialog
    popup.showCeatCalcFormPopup = function()
    {
        this.showMask();
        this.entryFormPopup.style.display = "block";
        this.positionDialogue(this.entryFormPopup);
        //this.entryFormPopup.style.left = (($(document).width() / 2) - (this.entryFormPopup.offsetWidth / 2)) + "px";
    }

    // hide the creatinine clearance calculator form dialog
    popup.hideCeatCalcFormPopup = function()
    {
        this.hideMask();
        this.entryFormPopup.style.display = "none";
    }

    // show the about popup
    popup.showAboutPopup = function()
    {
        this.showMask();
        this.aboutPopup.style.display = "block";
        this.positionDialogue(this.aboutPopup);
    }

    // hide about popup
    popup.hideAboutPopup = function()
    {
        this.hideMask();
        this.aboutPopup.style.display = "none";
    }

    // position dialogue center screen
    popup.positionDialogue = function(popupBox)
    {
        popupBox.style.left = (($(document).width() / 2) - (popupBox.offsetWidth / 2)) + "px";
    }

    return popup;
}

//calculate creatinine clearance
function calculateClearance()
{
   //Validation for sex
   var gender = document.querySelectorAll('input[name="patients-sex"]:checked');
   if (!gender.length){
       alert("Please select male or female.");
       return false;
   }

   //Retrieve inputs
   var pSex = document.querySelector('input[name="patients-sex"]:checked').value;   //retrieve sex
   var pAge = document.getElementById("p-age").value;                              //retrieve age
   var pWeight = document.getElementById("p-weight").value;                        //retrieve weight
   var pSerum = document.getElementById("p-serum").value;                          //retrieve serum

    //Validation for age
   if (pAge == ""){
       alert("Please enter a number for age.");
       return false;
   }
   if (pAge < 1 || pAge > 120) {
       alert("Please enter a valid number(1 - 120) for age.");
       return false;
   }
   //Validation for weight
   if (pWeight == "") {
       alert("Please enter a number for weight.");
       return false;
   }
   if (pWeight < 1 || pWeight > 400) {
       alert("Please enter a valid number(1 - 400) for weight.");
       return false;
   }
   //Validation for serum
   if (pSerum == "") {
       alert("Please enter a number for serum.");
       return false;
   }
   if (pSerum < 1 || pSerum > 250) {
       alert("Please enter a valid number(1 - 250) for serum.");
       return false;
   }

    var cResult = ((140 - pAge) * pWeight * pSex) / pSerum                                   //Cockcroft-Gault Equation
    var decimalResult = twoDecimals(cResult, 2)                                         //Rounded to two decimal places
    document.getElementById("p-clearance").innerHTML = decimalResult+" ml/min"            //Creatinine Clearance returned
}

//function to return a number to a set decimal place - (value, number of decimal places)
function twoDecimals(val, decimals){
    val = parseFloat(val);
    return val.toFixed(decimals);
}