const NOISY_TITLES = new Set([
  "company",
  "connect",
  "data",
  "documentation",
  "linkedin",
  "list",
  "pdf",
]);

const NON_TECHNICAL_TYPES = /\b(country|city|region|state|month|year|company|person|people|place)\b/i;
const TECHNICAL_TYPES = /\b(programming|software|technology|computer|developer|data structure|algorithm|framework|library|database|operating system)\b/i;

function getTopicDetails(item) {
  const topic = item?.topic || item;
  return {
    title: typeof topic?.title === "string" ? topic.title.trim() : "",
    type: typeof topic?.type === "string" ? topic.type : "",
  };
}

function normalizeTokens(value) {
  return value.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
}

function isRelevantTopic(title, type, queryTokens) {
  const normalizedTitle = title.toLowerCase().trim();
  const tokens = normalizeTokens(title);
  if (!normalizedTitle || NOISY_TITLES.has(normalizedTitle)) return false;
  if (/^(19|20)\d{2}$/.test(normalizedTitle)) return false;
  if (NON_TECHNICAL_TYPES.test(type)) return false;
  if (tokens.some((token) => queryTokens.has(token))) return true;
  return TECHNICAL_TYPES.test(type);
}

export function filterRelatedTopics(keyword, relatedTopics = {}) {
  const queryTokens = new Set(normalizeTokens(keyword));
  const filterList = (items) => (Array.isArray(items) ? items : []).filter((item) => {
    const { title, type } = getTopicDetails(item);
    return isRelevantTopic(title, type, queryTokens);
  });

  return {
    ...relatedTopics,
    rising: filterList(relatedTopics.rising),
    top: filterList(relatedTopics.top),
  };
}
