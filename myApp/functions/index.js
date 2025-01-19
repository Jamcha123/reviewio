import * as functions from 'firebase-functions';
import openai from 'openai'

const ai = new openai({apiKey: ""}); 

export const func1 = functions.https.onRequest({cors: true}, async (req, res) => {
    const about = req.query.about; 
    res.writeHead(200, {"content-type": "text/html"});

    const response = await ai.chat.completions.create({
        model: "gpt-4o", 
        messages: [{
            role: "user", 
            content: [
                {type: "text", text: "write one random review about " + about + " in 20 words"},
            ]
        }]
    }); 
    const texts = response.choices[0].message["content"].toString(); 
    res.write(texts); 
    res.end(); 
})