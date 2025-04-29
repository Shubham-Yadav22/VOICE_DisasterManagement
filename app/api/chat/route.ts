import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const prompt = messages.map((msg: { role: string; content: string }) =>
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n')

    const systemPrompt = `You are a helpful first aid assistant. Provide clear, concise, and accurate first aid instructions. 
Always emphasize calling emergency services for life-threatening situations. 
Format your responses with clear steps and important warnings.`

    const fullPrompt = `${systemPrompt}\n\n${prompt}\nAssistant:`

    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 1000,
          return_full_text: false,
        }
      })
    })

    const result = await response.json()

    if (result.error) {
      console.error("Hugging Face Error:", result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ content: result[0].generated_text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
