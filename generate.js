import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from 'fs';
import { Buffer } from "buffer";

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const prompt = 'type three civilization based on the Kardashev scale hyperrealistic'

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: 'wheredidwegowrong89'
});

const url = result.data.data[0].url
console.log(url)

// This saves URL to disk
const imgResult = await fetch(url)
const blob = await imgResult.blob()
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync(`./interface/src/img/${Date.now()}.png`, buffer) 
