const currencyOne = document.querySelector('#currency-one')
const amountOne = document.querySelector('.amount-one')
const currencyTwo = document.querySelector('#currency-two')
const amountTwo = document.querySelector('.amount-two')
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info')

// const requestURL = 'https://api.exchangerate.host/latest';
// const request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//     var response = request.response;
//     console.log(response);
// }

const calculate = () => {
	fetch(`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
		.then(res => res.json())
		.then(data => {
			const currency1 = currencyOne.value
			const currency2 = currencyTwo.value

			const rate = data.rates[currency2]
			rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)}${currency2}`

			amountTwo.value = (amountOne.value * rate).toFixed(2)
		})
}

const swap = () => {
	const oldValue = currencyOne.value
	currencyOne.value = currencyTwo.value 
	currencyTwo.value = oldValue
	calculate()
}

currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
swapBtn.addEventListener('click', swap)

calculate()
