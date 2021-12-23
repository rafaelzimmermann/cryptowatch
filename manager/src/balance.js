var getSimpleBalance = function() {
    return fetch("/v1/balance")
      .then(response => response.json())
      .then(function(balance) {
          var result = {};
          for (var wallet in balance) {
              for (var ticker in balance[wallet]) {
                  if (Object.prototype.hasOwnProperty.call(result, ticker)) {
                      if (Object.prototype.hasOwnProperty.call(balance[wallet][ticker], "EUR")) {
                        result[ticker] += balance[wallet][ticker]["EUR"];
                        result[ticker] = {
                            "value": result[ticker]["value"] + balance[wallet][ticker]["EUR"],
                            "amount": result[ticker]["amount"] + balance[wallet][ticker]["amount"]
                        };
                      }
                  } else if (Object.prototype.hasOwnProperty.call(balance[wallet][ticker], "EUR")) {
                      result[ticker] = {
                          "value": balance[wallet][ticker]["EUR"],
                          "amount": balance[wallet][ticker]["amount"]
                      };
                  }
              }
          }
          balance = []
          for (var t in result) {
            var b = result[t];
            b["ticker"] = t;
            balance.push(b);
          }
          balance.sort((a, b) => { return b.value - a.value});
          return balance;
      });
}

export { getSimpleBalance };