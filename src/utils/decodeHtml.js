export function decodeHtmlEntities(str) {
  if (!str) return "";
  
  const entities = {
    "&amp;": "&",
    "&quot;": '"',
    "&#039;": "'",
    "&apos;": "'",
    "&lt;": "<",
    "&gt;": ">",
    "&eacute;": "é",
    "&Eacute;": "É",
  };
  
  return str.replace(
    /&amp;|&quot;|&#039;|&apos;|&lt;|&gt;|&eacute;|&Eacute;/g,
    (match) => entities[match] || match
  );
}