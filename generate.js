import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from 'fs';
import { Buffer } from "buffer";

const configuration = new Configuration({
    apiKey: 'input-here',
});

const openai = new OpenAIApi(configuration);

const prompt = 'pirate ship going warp speed through space'

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: 'wheredidwegowrong89'
});

const url = result.data.data[0].url
console.log(url)

// window.location.replace(url)
// This saves URL to disk
const imgResult = await fetch(url)
const blob = await imgResult.blob()
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync(`./img/${Date.now()}.png`, buffer) 

