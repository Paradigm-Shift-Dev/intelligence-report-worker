async function getData() {
  // Get the current date
  const currentDate = new Date();
  // Get a date for 7 days ago
  const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  // Format dates to "YYYY-MM-DDTHH:mm:ss.sssZ"
  const formattedCurrentDate = currentDate.toISOString();
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString();

    const query = `
      query {
  listChatbots(filter: {
      createdAt: {
        gt: "${formattedSevenDaysAgo}",
        lt: "${formattedCurrentDate}",
      }
  }) {
      items {
        question,
        answer
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
    let notificationJobs = await jobResponse.body.data.listChatbots.items;
    return notificationJobs;
  }
  const chatbotData = await getData();
  const concatenatedQuestions = chatbotData
  .map(item => item.question)
  .join(' ');
const concatenatedAnswers = chatbotData
  .map(item => item.question)
  .join(' ');

output = [{
  chatbotData: chatbotData, 
  concatenatedQuestions: concatenatedQuestions,
  concatenatedAnswers: concatenatedAnswers
}];
