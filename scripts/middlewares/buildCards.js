export default function buildCards(data) {
    let cardContainer = document.getElementById("myCardContainer");
    cardContainer.innerHTML = null;
    for (let i = 0; i < data.length; i++) {
      let card = `<div class="bg-white space-y-3 p-4 rounded-lg shadow">
  
              <div>
                 <span class="font-semibold mr-14">Name: </span> <a href=${data[i].html_url} target="_blank" class="text-blue-500 font-bold hover:underline">${data[i].name}</a>
              </div>
              <div><span class="font-semibold mr-2">Contribution: </span>
                  <span
                      class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">${data[i].contribution}</span>
              </div>
              <div><span class="mr-7 font-semibold">Followers: </span>
                  <span
                      class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">${data[i].followers}</span>
              </div>
              <div><span class="font-semibold mr-4">Repo Count: </span>
                  <span
                      class="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">${data[i].public_repos}</span>
              </div>
  
  
  
      </div>`;
  
      cardContainer.innerHTML += card;
    }
  }