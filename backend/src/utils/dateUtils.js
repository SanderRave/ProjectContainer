/**
 * Bereken een tijdsinterval van de laatste drie uur in ISO 8601
 * @returns {string} Tijdsinterval in het formaat 'YYYY-MM-DDTHH:mm:ssZ/YYYY-MM-DDTHH:mm:ssZ'
 */
export function getLastThreeHoursInterval() {
  // Huidige tijd in UTC
  const now = new Date();

  // Drie uur terug in UTC
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

  // Formatteer beide naar ISO 8601
  const nowISO = now.toISOString();
  const threeHoursAgoISO = threeHoursAgo.toISOString();

  // Retourneer als interval
  return `${threeHoursAgoISO}/${nowISO}`;
}
