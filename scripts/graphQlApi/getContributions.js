export default async function getContributions(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };

  let startTime =
    document.getElementById("startDate") === null
      ? ""
      : document.getElementById("startDate").value.toString();

  let endTime =
    document.getElementById("endDate") === null
      ? ""
      : document.getElementById("endDate").value.toString();

  console.log(startTime);
  console.log(endTime);

  let upcomingQuery;
  if (startTime.length > 0 && endTime.length > 0) {
    upcomingQuery = `query {
        user(login: "${username}") {
          
          contributionsCollection(from: "${startTime}T00:00:01", to: "${endTime}T23:59:59") {
            contributionCalendar {
              
              totalContributions
             
            }
          }
        }
      }`;
  } else {
    upcomingQuery = `query {
        user(login: "${username}") {
          
          contributionsCollection {
            contributionCalendar {
              
              totalContributions
             
            }
          }
        }
      }`;
  }

  const body = {
    query: upcomingQuery,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  console.log("Response Received", data);
  return data;
}
