import {
  calculateCurrentCaffeineLevel,
  coffeeConsumptionHistory,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils";
function Auth() {
  return (
    <>
      <div className="section-header">
        <i className="fa solid fa-timeline" />
        <h2>History</h2>
      </div>
      <p>
        <i>Hover for more information</i>
      </p>
      <div className="coffee-history">
        {Object.keys(coffeeConsumptionHistory)
          .sort((a, b) => b - a)
          .map((el, index) => {
            const coffe = coffeeConsumptionHistory[el];
            const timeSinceConsume = timeSinceConsumption(el);
            const originalCaffeineAmount = getCaffeineAmount(coffe.name);
            const remainingAmount = calculateCurrentCaffeineLevel({
              [el]: coffe,
            });
            const summary = `Coffee name: ${coffe.name} | Time since consumption: ${timeSinceConsume} | Caffeine originally: ${originalCaffeineAmount} mg | Remaining caffeine: ${remainingAmount} mg`;
            return (
              <div key={index} title={summary}>
                <i className="fa-solid fa-mug-hot" />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Auth;
