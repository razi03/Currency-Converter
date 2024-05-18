const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
let msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCode === "PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal= amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/currencies/${fromCurrency}.json`;
    try {
        let response = await fetch(URL);
        if (response.ok) {
            let data = await response.json();
            // Calculate the exchange rate
            const rate = data[fromCurrency][toCurrency];
            console.log(rate); // Display the exchange rate
            let finalAmount = amtVal * rate;
            msg.innerHTML =`    <font size="5"> <b>${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}</b></font>`;

        } else {
            console.error("Error fetching data:", response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const updateFlag= (element)=>{
    console.log(element);
    let currCode=element.value;
    console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});