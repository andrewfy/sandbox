import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: Request) {
  const { prompt, startDate, endDate } = await request.json();

  if (!prompt || !startDate || !endDate) {
    return new Response("Missing required fields", { status: 400 });
  }

  const userMessage = `I'm planning a trip from ${startDate} to ${endDate}. Here's what I'm looking for:\n\n${prompt}`;

  const stream = client.messages.stream({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system:
      "You are an expert travel agent with deep knowledge of destinations worldwide. " +
      "Help the user plan their perfect trip based on their dates and preferences. " +
      "Provide specific, actionable recommendations including destinations, activities, " +
      "accommodation suggestions, travel tips, and a rough itinerary. " +
      "Be enthusiastic but concise.",
    messages: [{ role: "user", content: userMessage }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
