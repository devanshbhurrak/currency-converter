const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const bnt = document.querySelector('form button');
const dropdowns = document.querySelectorAll('.dropdown select');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

const updateFlag = (element) => {
    let code = element.value;
    let img = element.parentElement.querySelector('img');
    img.src =  `https://flagsapi.com/${countryList[code]}/flat/64.png`
}

for (let select of dropdowns) {
    for (code in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === 'from' && code === 'USD') {
            newOption.selected = 'selected';
        } else if(select.name === 'to' && code === 'INR') {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    })
}

bnt.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal == '' || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let responce = await fetch(URL);
    let data = await responce.json();
    let rate = data[fromCurr.value.toLowerCase()].inr;
    let result = `${amtVal} ${fromCurr.value} = ${Math.round(amtVal * rate * 100) / 100} ${toCurr.value}`;
    msg.innerText = result;
}) 