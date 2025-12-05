const SECURITY_KEY = 'sh-security-mode';
const listeners = [];

/**
 * Lit le mode sécurité dans localStorage.
 */
export function getSecurityMode() {
  return localStorage.getItem(SECURITY_KEY) === 'on';
}

/**
 * Met à jour le mode sécurité (true = ON, false = OFF).
 */
export function setSecurityMode(on) {
  localStorage.setItem(SECURITY_KEY, on ? 'on' : 'off');
  document.body.classList.toggle('security-on', on);
  updateSecurityToggleUI(on);
  listeners.forEach((fn) => fn(on));
}

/**
 * Permet aux autres modules de réagir au changement de mode sécurité.
 */
export function onSecurityModeChanged(callback) {
  listeners.push(callback);
}

/**
 * Met à jour l’UI du bouton dans le header.
 */
function updateSecurityToggleUI(on) {
  const label = document.getElementById('security-toggle-label');
  if (label) {
    label.textContent = `Mode sécurité : ${on ? 'ON' : 'OFF'}`;
  }
}

/**
 * Initialisation du bouton dans le header.
 */
function initSecurityToggleButton() {
  const btn = document.getElementById('security-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = getSecurityMode();
    setSecurityMode(!current);
  });

  // première synchro
  const initial = getSecurityMode();
  document.body.classList.toggle('security-on', initial);
  updateSecurityToggleUI(initial);
}

document.addEventListener('DOMContentLoaded', () => {
  const initial = getSecurityMode();
  document.body.classList.toggle('security-on', initial);
  updateSecurityToggleUI(initial);
  initSecurityToggleButton();
});
