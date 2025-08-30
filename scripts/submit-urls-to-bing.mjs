import { exit } from "node:process";
import { parseStringPromise } from "xml2js";

const API_KEY = "cb26fe4ed957424d95e442861f616919";
const SITEMAP_URL = "https://madrid101.xyz/sitemap-index.xml";
const HOST = "madrid101.xyz";

async function fetchAndParseSitemap(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
  }
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  return result;
}

async function submitToIndexNow(urls) {
  const submissionBody = {
    host: HOST,
    key: API_KEY,
    keyLocation: `https://${HOST}/${API_KEY}.txt`,
    urlList: urls,
  };

  const indexnowHosts = ["api.indexnow.org", "yandex.com"];

  for (const host of indexnowHosts) {
    const endpoint = `https://${host}/indexnow`;
    console.log(`Submitting URLs to ${host}...`);

    const submissionResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(submissionBody),
    });

    if (submissionResponse.ok) {
      console.log(`✓ Successfully submitted to ${host}`);
    } else {
      const errorText = await submissionResponse.text();
      console.error(
        `✗ Failed to submit to ${host}: ${submissionResponse.status} ${submissionResponse.statusText} - ${errorText}`,
      );
    }
  }
}

(async () => {
  console.log(`Starting URL submission process from sitemap: ${SITEMAP_URL}`);

  try {
    // 1. Get sitemap index
    const sitemapIndex = await fetchAndParseSitemap(SITEMAP_URL);
    const sitemapUrls = sitemapIndex.sitemapindex.sitemap.map((s) =>
      s.loc[0].replace("http://", "https://"),
    );
    console.log(`Found ${sitemapUrls.length} sitemaps in the index.`);

    // 2. Get all page URLs from each sitemap
    let allUrls = [];
    for (const sitemapUrl of sitemapUrls) {
      console.log(`Fetching URLs from ${sitemapUrl}`);
      const sitemap = await fetchAndParseSitemap(sitemapUrl);
      // It's possible a sitemap has no URLs
      if (sitemap.urlset.url) {
        const pageUrls = sitemap.urlset.url.map((u) =>
          u.loc[0].replace("http://", "https://"),
        );
        allUrls = allUrls.concat(pageUrls);
        console.log(`Found ${pageUrls.length} URLs in ${sitemapUrl}.`);
      } else {
        console.log(`No URLs found in ${sitemapUrl}.`);
      }
    }
    console.log(`Total URLs to submit: ${allUrls.length}`);

    if (allUrls.length === 0) {
      console.log("No URLs to submit. Exiting.");
      return;
    }

    // 3. Submit to both IndexNow APIs
    await submitToIndexNow(allUrls);
  } catch (error) {
    console.error("An error occurred during the submission process:", error);
    exit(1); // Exit with error code
  }
})();
