import buildTable from "./middlewares/buildTable.js";
import buildCards from "./middlewares/buildCards.js";
import getContributions from "./graphQlApi/getContributions.js";
import token from "../assets/token.js";

let newToken = token.substring(0, 1) + token.substring(2, token.length);

let userDisplayArray;
let form = document.getElementById("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const userId = document.getElementById("userId").value;

  let userQueryResponse = await fetch(
    `https://api.github.com/search/users?q=${userId}&per_page=10`
  );
  let userQueryResult = await userQueryResponse.json();

  const userQueryArray = await userQueryResult?.items;

  userDisplayArray = new Array(userQueryArray.length);
  console.log("Start of promise");
  await Promise.all(
    userQueryArray.map(async (userData, index) => {
      const contents = await fetch(userData?.url);
      const newContents = await contents.json();

      const contributionData = await getContributions(
        newToken,
        newContents?.login
      );

      const userDisplayObject = {
        html_url: newContents?.html_url,
        name: newContents?.name,
        followers: newContents?.followers,
        public_repos: newContents?.public_repos,
        contribution:
          contributionData?.data.user.contributionsCollection
            .contributionCalendar.totalContributions,
      };

      userDisplayArray[index] = userDisplayObject;
    })
  );
  console.log("Promise ends");
  console.log(userDisplayArray);

  buildTable(userDisplayArray);
  buildCards(userDisplayArray);
});

const mapper = {
  name: "Name",
  contribution: "Contribution",
  followers: "Followers",
  public_repos: "Repo Count"
};

$("th").on("click", function () {
  let column = $(this).data("column");
  let order = $(this).data("order");
  let text = $(this).html();

  if (order == "desc") {
    $(this).data("order", "asc");
    userDisplayArray = userDisplayArray.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
    text = mapper[column] + " &#9660";
  } else {
    $(this).data("order", "desc");
    userDisplayArray = userDisplayArray.sort((a, b) =>
      a[column] < b[column] ? 1 : -1
    );
    text = mapper[column] + " &#9650";
  }
  $(this).html(text);
  buildTable(userDisplayArray);
  buildCards(userDisplayArray);
});
