import { useAuth } from "../context/AuthContext";
import {
  calculateCurrentCaffeineLevel,
  statusLevels,
  calculateCoffeeStats,
  getTopThreeCoffees,
} from "../utils";

function StatCard(props) {
  const { lg, title, children } = props;
  return (
    <div className={"card stat-card " + (lg ? "col-span-2" : "")}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function Stats() {
  const { globalData } = useAuth();
  const stats = calculateCoffeeStats(globalData);
  const caffeineLevel = calculateCurrentCaffeineLevel(globalData);
  const warningLevel =
    caffeineLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeineLevel > statusLevels["moderate"].maxLevel
      ? "high"
      : "moderate";
  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-chart-simple" />
        <h2>Stats</h2>
      </div>
      <div className="stats-grid">
        <StatCard lg={true} title="Active caffeine level">
          <div className="status">
            <p>
              <span className="stat-text">{caffeineLevel} </span> mg
            </p>
            <h5
              className=""
              style={{
                color: statusLevels[warningLevel].color,
                background: statusLevels[warningLevel].background,
              }}
            >
              {warningLevel}
            </h5>
          </div>
          <p>{statusLevels[warningLevel].description}</p>
        </StatCard>
        <StatCard title="Daily caffeine">
          <p>
            <span className="stat-text">{stats.daily_caffeine}</span> mg
          </p>
        </StatCard>
        <StatCard title="Avg # of cofees">
          {" "}
          <p>
            <span className="stat-text">{stats.average_coffees}</span>
          </p>
        </StatCard>
        <StatCard title="Daily cost ($)">
          {" "}
          <p>
            <span className="stat-text">{stats.daily_cost}</span>
          </p>
        </StatCard>
        <StatCard title="Total cost ($)">
          {" "}
          <p>
            <span className="stat-text">{stats.total_cost}</span>
          </p>
        </StatCard>
        <table className="stat-table">
          <thead>
            <tr>
              <th>Coffee name</th>
              <th>Number of purchase</th>
              <th>Percentage of total</th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeCoffees(globalData).map((el, i) => {
              return (
                <tr key={i}>
                  <td>{el.coffeeName}</td>
                  <td>{el.count}</td>
                  <td>{el.percentage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Stats;
