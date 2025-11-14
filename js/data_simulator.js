// Objets connectés simulés
const devices = [
  {
    id: 'light-living',
    name: 'Lumière salon',
    room: 'Salon',
    type: 'Lumière',
    state: 'off',
    critical: false,
  },
  {
    id: 'light-bedroom',
    name: 'Lumière chambre',
    room: 'Chambre',
    type: 'Lumière',
    state: 'off',
    critical: false,
  },
  {
    id: 'door-front',
    name: 'Porte d’entrée',
    room: 'Entrée',
    type: 'Verrou',
    state: 'on',
    critical: true,
  },
  {
    id: 'cam-entrance',
    name: 'Caméra entrée',
    room: 'Entrée',
    type: 'Caméra',
    state: 'on',
    critical: true,
  },
  {
    id: 'sensor-motion',
    name: 'Capteur mouvement',
    room: 'Salon',
    type: 'Capteur',
    state: 'on',
    critical: true,
  },
  {
    id: 'sensor-temp',
    name: 'Capteur température',
    room: 'Salon',
    type: 'Capteur',
    state: 'on',
    critical: false,
  },
];

const temperatureHistory = [];
const alerts = [];

function initTemperatureSimulation() {
  const now = Date.now();
  let currentTemp = 21 + Math.random() * 2;

  for (let i = 20; i > 0; i--) {
    currentTemp += (Math.random() - 0.5) * 0.4;
    temperatureHistory.push({
      timestamp: now - i * 60000,
      value: Number(currentTemp.toFixed(2)),
    });
  }

  setInterval(() => {
    const last = temperatureHistory[temperatureHistory.length - 1];
    let newTemp = last ? last.value : 22;
    newTemp += (Math.random() - 0.5) * 0.4;
    const entry = {
      timestamp: Date.now(),
      value: Number(newTemp.toFixed(2)),
    };
    temperatureHistory.push(entry);
    if (temperatureHistory.length > 60) {
      temperatureHistory.shift();
    }
  }, 5000);
}

function initAlertSimulation() {
  const types = [
    'Mouvement détecté',
    'Porte ouverte',
    'Anomalie de température',
    'Caméra déconnectée',
  ];
  const locations = ['Salon', 'Entrée', 'Chambre', 'Garage'];
  const severities = ['low', 'medium', 'high'];

  const pushRandomAlert = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    addAlert(type, location, severity);
  };

  setTimeout(pushRandomAlert, 7000);

  setInterval(() => {
    if (Math.random() < 0.5) {
      pushRandomAlert();
    }
  }, 15000);
}

export function addAlert(type, location, severity = 'medium') {
  alerts.unshift({
    id: `alert-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    location,
    severity,
    timestamp: Date.now(),
  });

  if (alerts.length > 50) {
    alerts.pop();
  }
}

export function getDevices() {
  return devices;
}

export function toggleDevice(id) {
  const dev = devices.find((d) => d.id === id);
  if (!dev) return;
  dev.state = dev.state === 'on' ? 'off' : 'on';
}

export function getTemperatureHistory() {
  return temperatureHistory;
}

export function getAlerts() {
  return alerts;
}

initTemperatureSimulation();
initAlertSimulation();
