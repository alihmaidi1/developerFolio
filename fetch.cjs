const fs = require("node:fs");
const https = require("node:https");
require("dotenv").config();

const { GITHUB_TOKEN, GITHUB_USERNAME, MEDIUM_USERNAME, USE_GITHUB_DATA } =
  process.env;

const requestJson = (options, body) =>
  new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let responseBody = "";

      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Request failed with status ${response.statusCode}`),
          );
          return;
        }
        resolve(responseBody);
      });
    });

    request.on("error", reject);
    if (body) {
      request.write(body);
    }
    request.end();
  });

async function fetchGithubData() {
  if (USE_GITHUB_DATA !== "true") {
    return;
  }
  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    throw new Error("GITHUB_USERNAME and GITHUB_TOKEN are required");
  }

  const body = JSON.stringify({
    query: `{
      user(login: "${GITHUB_USERNAME}") {
        id name bio avatarUrl location
        pinnedItems(first: 6, types: [REPOSITORY]) {
          edges {
            node {
              ... on Repository {
                id name description forkCount url diskUsage
                stargazers { totalCount }
                primaryLanguage { name color }
              }
            }
          }
        }
      }
    }`,
  });

  const data = await requestJson(
    {
      hostname: "api.github.com",
      path: "/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "developerFolio",
      },
    },
    body,
  );
  await fs.promises.writeFile("./public/profile.json", data);
}

async function fetchMediumData() {
  if (!MEDIUM_USERNAME) {
    return;
  }

  const data = await requestJson({
    hostname: "api.rss2json.com",
    path: `/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
    method: "GET",
  });
  await fs.promises.writeFile("./public/blogs.json", data);
}

Promise.all([fetchGithubData(), fetchMediumData()]).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
