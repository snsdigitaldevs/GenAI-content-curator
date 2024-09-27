import { model } from '@/app/lib/ai';
import { streamText, convertToCoreMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = await streamText({
    model: model,
    messages: convertToCoreMessages(messages),
  });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error);
    return new Response('Error', { status: 500 });
  }
}
