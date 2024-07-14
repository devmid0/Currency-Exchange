const dropList = document.querySelectorAll("form select"),
      fromCurrency = document.querySelector(".from select"),
      toCurrency = document.querySelector(".to select"),
      getButton = document.querySelector("form button"),
      exchangeIcon = document.querySelector("form .icon");

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        let selected = (i === 0 && currency_code === "USD") ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => loadFlag(e.target));
}

window.addEventListener("load", getExchangeRate);
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    [fromCurrency, toCurrency].forEach(loadFlag);
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value || "";

    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/69ebe5e5126b21b6465508f8/latest/${fromCurrency.value}`;
    
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        })
}