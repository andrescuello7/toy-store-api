import axios from "axios";

export const OpenAI = async (message: string) => {
    try {
        let object = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": message
                }
            ],
            "temperature": 0.7
        });

        let config = {
            method: 'POST',
            url: process.env.OPENAI_URL,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
            },
            data: object
        };
        const { data } = await axios.request(config);
        const response = data.choices[0].message;
        return response;
    } catch (error) {
        console.log({ error: error });
    }
}