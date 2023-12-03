async function getData() {
  const query = `
      query {
  listIntelligenceSubscribers(filter: {
      subscriber_email: 
    {
      contains: "@",
      }
  }) {
      items {
        subscriber_name,
        subscriber_email,
        faq_interest,
        trend_interest,
        seo_interest,
        strain_interest,
        stories_interest
      }
  }  
}
    `;

    let results = await fetch('GRAPHQL', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "[KEY]"
      },
      body: JSON.stringify({ query }),
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(data => {
      return data
    });
    let jobResponse = await results;
    let subscribers = await jobResponse.body.data.listIntelligenceSubscribers.items;
    return subscribers;
  }
  const subscribers = await getData();

output = [{
  subscribers
}];
