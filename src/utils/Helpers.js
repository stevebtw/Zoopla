export const Helpers = { 
    formatNumber  : (num) => num ? "£"+parseFloat(num).toLocaleString() : num,
    getPublicURL   : () => process.env.PUBLIC_URL,
    setUrlAsPublic : (url) => Helpers.getPublicURL() + url
};