async function getData() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;
  console.log("today ", formattedDate);
  const test = "01.12.2023"

  const query = `
      query {
  listIntelligenceNews(filter: {
      publishDate: {
        eq: "${test}",
      }
  }) {
      items {
        payload,
      }
  }  
}
    `;

    let results = await fetch('https://fpzurbf4rzew3aod2faq7xkpla.appsync-api.eu-central-1.amazonaws.com/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "da2-kgkbycmsandt7a3qfwvx76wj7e"
      },
      body: JSON.stringify({ query }),
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(data => {
      return data
    });
    let jobResponse = await results;
    let newsPayload = await jobResponse.body.data.listIntelligenceNews.items;
    return newsPayload;
  }
  const payload = await getData();

output = [{
  news: payload
}];
