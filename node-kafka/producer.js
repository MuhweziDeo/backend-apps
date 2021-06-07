const { Kafka } = require("kafkajs");

run().then(() => console.log("Done"), err => console.log(err));

async function run() {
  const kafka = new Kafka({ brokers: ["localhost:9092"] });

  const producer = kafka.producer();
  await producer.connect();

    // Wait 1 second before sending a new message
    await new Promise(resolve => setTimeout(resolve, 2000));
  await producer.send({
    topic: "quickstart-events",
    messages: [
      { value: "event 3" },
    ]
  });
}