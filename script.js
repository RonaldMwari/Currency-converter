document.getElementById('converter-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
  
    const apiKey = '1c1ea3f29115fe6dc0842e6d8c2c406d';  // Replace with your real API key
    const apiUrl = `https://api.exchangeratesapi.io/latest?access_key=${apiKey}&base=EUR`;
  
    // Fetch exchange rates
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const fromRate = data.rates[fromCurrency];
        const toRate = data.rates[toCurrency];
  
        let result;
        if (fromCurrency === 'EUR') {
          // Direct conversion if base currency is EUR
          result = amount * toRate;
        } else {
          // Convert to EUR first, then to the target currency
          result = (amount / fromRate) * toRate;
        }
  
        // Display the result
        document.getElementById('result').innerHTML = `
          <p>${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}</p>
        `;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>There was an error. Please try again. (${error.message})</p>`;
      });
  });
  