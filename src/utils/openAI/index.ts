import axios from "axios";

export const OpenAI = async (message: string) => {
    const headers = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
    }
    try {
        const { data } = await axios.request({
            method: 'POST',
            url: process.env.OPENAI_URL,
            headers,
            data: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                        "role": "user",
                        "content": message
                }],
                "temperature": 0.7
            })
        });
        const response = data.choices[0].message.content;
        return response;
    } catch (error) {
        console.log({ error: error });
    }
}