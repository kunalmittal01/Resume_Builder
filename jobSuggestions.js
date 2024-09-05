let results = [];
const API_KEY = 'AIzaSyDFE6EIe_A0pmLDAni7hqCMVeYGk0mb_QM';
import { GoogleGenerativeAI } from "@google/generative-ai";
export async function fetchResults(query) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(query);
    return result;
}
export async function getAndFetch(skillArr,btn) {
    const results = await Promise.all(skillArr.map(async (skill) => {
        let query = (btn == 'suggestionbtn')?`Give me Job suggestion for ${skill}`:`Give me project suggestion for ${skill}`;
        let result = await fetchResults(query);
        return result; 
    }));
    return results;      
}