/*eine Wartezeite, damit Ladezustände sichtbar wird. promis ist ein versprechen auf ein Ergebnis später
setTimeout ruft resolved nach miliseconden auf */

export const delay = (ms = 400) => new Promise<void>((resolve) => setTimeout(resolve, ms));
