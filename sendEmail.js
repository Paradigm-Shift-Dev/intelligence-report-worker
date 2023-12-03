const payloadFaq = inputData.payloadFaq;
const payloadTrend = inputData.payloadTrend;
const payloadSEO = inputData.payloadSEO;
const payloadStrain = inputData.payloadStrain;
const payloadNews = inputData.payloadNews;

let query = '';
// Send reminders
const sendEmail = async function(subscriber) {
    // EMAIL CONFIG
    const emailSubject = "Personalized Cannabis Intelligence Report for " + subscriber.name;
    query = `
       {
        "TemplateId": [ID],
        "InlineCss": true,
        "TemplateModel": {
           "emailSubject": "${emailSubject}",
           "recipient_name": "${subscriber.name}",
           "showFaq": ${subscriber.showFaq}, 
           "payloadFaq": "${payloadFaq}", 
           "showTrend": ${subscriber.showTrend}, 
           "payloadTrend": "${payloadTrend}", 
           "showSEO": ${subscriber.showSEO}, 
           "payloadSEO": "${payloadSEO}", 
           "showStrain": ${subscriber.showStrain}, 
           "payloadStrain": "${payloadStrain}", 
           "showNews": ${subscriber.showNews},
           "payloadNews": "${payloadNews}",
           "invite_sender_name": "[NAME]",
           "product_name": "[WEBSITE]"
        },
        "From": "[YOUR EMAIL]",
        "To": "${subscriber.email}",
        "TrackOpens": true,
        "TrackLinks": "None",
        "MessageStream": "outbound"
      }
    `;
    let results = await fetch('https://api.postmarkapp.com/email/withTemplate', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": "[KEY]"
      },
      body: query,
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(data => {
      return data
    });
    let jobResponse = await results;
    console.log(jobResponse);
    let jobStatus = await jobResponse.status;
    let sendErrors = await jobResponse.body.errors;
    if (sendErrors !== undefined) {
      console.log("sendErrors ", sendErrors);
    }
    return jobStatus;
  }

// Function to iterate over the array of subscribers and make sequential fetch requests
const processSubscribers = async (subscribers) => {
  for (const subscriber of subscribers) {
    await sendEmail(subscriber);
  }
};

// Example array of subscribers
const subscribers = [
  { 
  name: "Martin", 
  email: "hello@meinstrain.com",
  showFaq: true, 
  showTrend: true, 
  showSEO: true, 
  showStrain: true, 
  showNews: true
},
  // Add more subscribers as needed
];

// Run the program
const runProgram = async function () {
    await processSubscribers(subscribers);
} 
const result = runProgram();

output = [{query}];
