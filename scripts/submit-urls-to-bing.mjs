import { exit } from 'node:process';
import { parseStringPromise } from 'xml2js';

const BING_API_KEY = 'cb26fe4ed957424d95e442861f616919';
const INDEXNOW_API_ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SITEMAP_URL = 'https://madrid101.xyz/sitemap-index.xml';

async function fetchAndParseSitemap(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
  }
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  return result;
}

(async () => {
  console.log(`Starting URL submission process from sitemap: ${SITEMAP_URL}`);

  try {
    // 1. Get sitemap index
    const sitemapIndex = await fetchAndParseSitemap(SITEMAP_URL);
    const sitemapUrls = sitemapIndex.sitemapindex.sitemap.map(s => s.loc[0].replace('http://', 'https://'));
    console.log(`Found ${sitemapUrls.length} sitemaps in the index.`);

    // 2. Get all page URLs from each sitemap
    let allUrls = [];
    for (const sitemapUrl of sitemapUrls) {
      console.log(`Fetching URLs from ${sitemapUrl}`);
      const sitemap = await fetchAndParseSitemap(sitemapUrl);
      // It's possible a sitemap has no URLs
      if (sitemap.urlset.url) {
        const pageUrls = sitemap.urlset.url.map(u => u.loc[0].replace('http://', 'https://'));
        allUrls = allUrls.concat(pageUrls);
        console.log(`Found ${pageUrls.length} URLs in ${sitemapUrl}.`);
      } else {
        console.log(`No URLs found in ${sitemapUrl}.`);
      }
    }
    console.log(`Total URLs to submit: ${allUrls.length}`);

    if (allUrls.length === 0) {
      console.log('No URLs to submit. Exiting.');
      return;
    }

    // 3. Submit to IndexNow
    const submissionBody = {
      host: 'madrid101.xyz',
      key: BING_API_KEY,
      keyLocation: `https://madrid101.xyz/${BING_API_KEY}.txt`,
      urlList: allUrls
    };

    console.log('Submitting URLs to IndexNow API...');
    const submissionResponse = await fetch(INDEXNOW_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(submissionBody)
    });

    if (submissionResponse.ok) {
      console.log('URL submission process finished successfully.');
    } else {
      const errorText = await submissionResponse.text();
      throw new Error(`IndexNow API submission failed: ${submissionResponse.status} ${submissionResponse.statusText} - ${errorText}`);
    }

  } catch (error) {
    console.error('An error occurred during the submission process:', error);
    exit(1); // Exit with error code
  }
})();
