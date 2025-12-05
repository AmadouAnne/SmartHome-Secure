import { getAlerts, addAlert } from './data_simulator.js';
import { formatTime } from './ui.js';
import { getSecurityMode, onSecurityModeChanged } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('alert-list');
  const simulateBtn = document.getElementById('simulate-alert-btn');
  const summaryEl = document.getElementById('security-summary');

  if (!listEl || !simulateBtn || !summaryEl) return;

  function severityBadge(severity) {
    if (severity === 'high') {
      return '<span class="badge badge-danger">Critique</span>';
    }
    if (severity === 'medium') {
      return '<span class="badge badge-warning">Moyen</span>';
    }
    return '<span class="badge badge-soft">Faible</span>';
  }

  const renderAlerts = () => {
    const alerts = getAlerts();
    listEl.innerHTML = '';

    if (alerts.length === 0) {
      listEl.innerHTML = `
        <div class="alert-item">
          <div class="alert-main">
            <div class="alert-title">Aucune alerte pour le moment</div>
            <div class="alert-meta">Le système est calme.</div>
          </div>
        </div>
      `;
      return;
    }

    alerts.forEach((a) => {
      const el = document.createElement('div');
      el.className = 'alert-item';
      el.innerHTML = `
        <div class="alert-main">
          <div class="alert-title">${a.type}</div>
          <div class="alert-meta">
            ${severityBadge(a.severity)} • ${a.location} • ${formatTime(a.timestamp)}
          </div>
        </div>
      `;
      listEl.appendChild(el);
    });
  };

  const updateSummary = () => {
    const alerts = getAlerts();
    const count = alerts.length;
    const secOn = getSecurityMode();

    if (count === 0) {
      summaryEl.textContent =
        secOn
          ? 'Aucune alerte récente. Le mode sécurité est activé, la maison est en surveillance renforcée.'
          : 'Aucune alerte récente. Le mode sécurité est désactivé, mais aucune anomalie n’a été détectée.';
      return;
    }

    const last = alerts[0];
    summaryEl.textContent =
      `Dernière alerte : ${last.type} (${last.location}, niveau ${last.severity.toUpperCase()}). ` +
      (secOn
        ? 'Le mode sécurité est ON : les éléments critiques sont verrouillés.'
        : 'Le mode sécurité est OFF : pensez à l’activer lors de vos absences.');
  };

  simulateBtn.addEventListener('click', () => {
    addAlert('Alerte manuelle', 'Simulation', 'medium');
    renderAlerts();
    updateSummary();
  });

  renderAlerts();
  updateSummary();

  setInterval(() => {
    renderAlerts();
    updateSummary();
  }, 8000);

  onSecurityModeChanged(() => {
    updateSummary();
  });
});
