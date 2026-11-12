import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function readSchemas(path) {
  const html = readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
  return [
    ...html.matchAll(/<script\b[^>]*type=["']?application\/ld\+json["']?[^>]*>(.*?)<\/script>/gs),
  ].flatMap((match) => JSON.parse(match[1]));
}

for (const [path, expectedPaths] of [
  ["transport/taxi/index.html", ["/", "/transport/taxi/"]],
  [
    "transport/auto/driver-license/index.html",
    ["/", "/transport/auto/", "/transport/auto/driver-license/"],
  ],
  ["services/index.html", ["/", "/services/"]],
]) {
  const schemas = readSchemas(path);
  for (const article of schemas.filter((schema) => schema["@type"] === "Article")) {
    for (const field of ["datePublished", "dateModified"]) {
      assert.match(
        article[field],
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
        `${path}: ${field}`,
      );
    }
  }
  const breadcrumbs = schemas.filter((schema) => schema["@type"] === "BreadcrumbList");
  assert.equal(breadcrumbs.length, 1, `${path}: one breadcrumb list`);
  assert.ok(schemas.some((schema) => schema["@type"] === "Article"));
  const [breadcrumb] = breadcrumbs;
  assert.equal(breadcrumb["@context"], "https://schema.org");
  assert.deepEqual(
    breadcrumb.itemListElement.map((item) => item.item),
    expectedPaths.map((path) => `https://madrid101.xyz${path}`),
  );
  breadcrumb.itemListElement.forEach((item, index) => {
    assert.equal(item["@type"], "ListItem");
    assert.equal(item.position, index + 1);
    assert.ok(item.name.trim());
    readFileSync(new URL(`../dist/${expectedPaths[index].slice(1)}index.html`, import.meta.url));
  });
  if (path === "transport/taxi/index.html") {
    assert.equal(breadcrumb.itemListElement.at(-1).name, "Такси в Мадриде: тарифы и приложения");
  }
}

for (const path of ["index.html", "404.html"]) {
  assert.ok(!readSchemas(path).some((schema) => schema["@type"] === "BreadcrumbList"), path);
}

console.log("Breadcrumb JSON-LD checks passed.");
