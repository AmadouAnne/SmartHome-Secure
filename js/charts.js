import { getTemperatureHistory, getAlerts } from './data_simulator.js';

document.addEventListener('DOMContentLoaded', () => {
  const tempCanvas = document.getElementById('temperatureChart');
  const alertsCanvas = document.getElementById('alertsChart');

  if (!tempCanvas || !alertsCanvas || typeof Chart === 'undefined') return;

  const buildTempData = () => {
    const history = getTemperatureHistory();
    return {
      labels: history.map((p) =>
        new Date(p.timestamp).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      ),
      values: history.map((p) => p.value),
    };
  };

  const buildAlertsData = () => {
    const alerts = getAlerts();
    const labels = [];
    const values = [];
    let cumul = 0;
    alerts
      .slice()
      .reverse()
      .forEach((a, idx) => {
        cumul += 1;
        labels.push(`#${idx + 1}`);
        values.push(cumul);
      });

    return {
      labels,
      values,
    };
  };

  const tempData = buildTempData();
  const alertsData = buildAlertsData();

  const tempChart = new Chart(tempCanvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: tempData.labels,
      datasets: [
        {
          label: 'Température (°C)',
          data: tempData.values,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 6,
          },
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });

  const alertsChart = new Chart(alertsCanvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: alertsData.labels,
      datasets: [
        {
          label: 'Nombre d’alertes cumulées',
          data: alertsData.values,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 6,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  setInterval(() => {
    const tData = buildTempData();
    tempChart.data.labels = tData.labels;
    tempChart.data.datasets[0].data = tData.values;
    tempChart.update();

    const aData = buildAlertsData();
    alertsChart.data.labels = aData.labels;
    alertsChart.data.datasets[0].data = aData.values;
    alertsChart.update();
  }, 7000);
});
