const hasBrowserContext = !!(
    (typeof window !== 'undefined' && window.document && window.document.createElement)
);


export default hasBrowserContext;
