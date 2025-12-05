import { getDevices, toggleDevice } from './data_simulator.js';
import { getSecurityMode, onSecurityModeChanged } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('devices-table-body');
  if (!tbody) return;

  const render = () => {
    const devices = getDevices();
    const securityOn = getSecurityMode();
    tbody.innerHTML = '';

    devices.forEach((d) => {
      const tr = document.createElement('tr');

      const criticalBadge = d.critical
        ? '<span class="badge badge-danger">Critique</span>'
        : '<span class="badge badge-soft">Normal</span>';

      const stateBadge =
        d.state === 'on'
          ? '<span class="badge badge-success">ON</span>'
          : '<span class="badge badge-soft">OFF</span>';

      const disabled = securityOn && d.critical;

      tr.innerHTML = `
        <td>${d.name}</td>
        <td>${d.room}</td>
        <td>${d.type}</td>
        <td>${criticalBadge}</td>
        <td>${stateBadge}</td>
        <td>
          <label class="switch">
            <input 
              type="checkbox" 
              class="device-toggle" 
              data-id="${d.id}" 
              ${d.state === 'on' ? 'checked' : ''} 
              ${disabled ? 'disabled' : ''}
            >
            <span class="switch-track">
              <span class="switch-thumb"></span>
            </span>
          </label>
        </td>
      `;

      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.device-toggle').forEach((input) => {
      input.addEventListener('change', () => {
        const id = input.getAttribute('data-id');
        if (!id) return;
        toggleDevice(id);
        render();
      });
    });
  };

  render();

  onSecurityModeChanged(() => {
    render();
  });
});
