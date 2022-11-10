export default function buildTable(data) {
    let table = document.getElementById("myTable");
    table.innerHTML = null;
    for (let i = 0; i < data.length; i++) {
      let row = `<tr class="odd:bg-white even:bg-slate-50">
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <a href=${data[i].html_url} class="font-bold text-blue-500 hover:underline" target="_blank">${data[i].name}</a>
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                              class="p-1.5 text-xs font-medium tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">${data[i].contribution}</span>
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                              class="p-1.5 text-xs font-medium tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">${data[i].followers}</span>
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                              class="p-1.5 text-xs font-medium tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">${data[i].public_repos}</span>
                      </td>
                   
                    </tr>`;
      table.innerHTML += row;
    }
  }