// Fetching Manipulation

//I want to use this data in more functions so I made a global EMPTY variable
let currentShip = "";
let starshipObject = [];
let pageCount = 4;

async function fetchData(currentPageNumber)
{
    let url = `https://swapi.dev/api/starships/?page=${currentPageNumber}`;

    await fetch(url)

        .then(response => response.json())
        .then(data => 
        {
            for (let i = 0; i < data.results.length; i++)
            {
                let newObject = 
                { 
                    model: data.results[i].model, 
                    length: parseFloat(data.results[i].length)
                };

                starshipObject.push(newObject);
            }

            console.log(starshipObject);
        })
        .catch(error =>
        {
            console.log(error);
        })
}

async function pasteDataToPage()
{
    for (let i = 1; i <= pageCount; i++)
    {
        await fetchData(i);
    }
    
    sortObject(starshipObject);

    let paragraph = document.createElement("p");
    let shipDivBox = document.querySelector(".ship-list");

    for (let i = 0; i < starshipObject.length; i++)
    {
        paragraph.innerHTML += `<h1>${starshipObject[i].model}:</h1> 
                                <h3>Length: ${starshipObject[i].length}</h3>`;

        shipDivBox.append(paragraph);
    }
}

pasteDataToPage();

function sortObject(starshipObject)
{
    starshipObject.sort((a, b) => a.length - b.length);
    console.log(starshipObject);
}