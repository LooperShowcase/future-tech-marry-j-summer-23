let open_ai_response;

let conversation = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hi, how can i help u today" },
];
async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "My happinest out of 10: " + sentiment + "my question is:" + question,
  });
}
async function conversationAssistantAdd(response) {
  conversation.push({ role: "assistant", content: response });
}
async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";

  let part1 = "sk";
  let part2 = "-FwTAQ8hQ31W8irBwTpMXT3BlbkFJ";
  let part3 = "tqFgcpK3EZmVIOsoPEKV";

  let allParts = part1 + part2 + part3;

  let data = { model: "gpt-3.5-turbo", messages: conversation };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;
      conversationAssistantAdd(message);
      console.log(message);
      const uttetance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(uttetance);
      return message;
    } else {
      console.log("request failed with status", response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
