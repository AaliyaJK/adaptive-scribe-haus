
/**
 * Utility for working with the Gemini API
 * Note: In a production environment, this API key should be stored securely
 * on a backend server and not exposed in the frontend code.
 */

// This is only for development purposes - in production, use server-side API calls
const GEMINI_API_KEY = "AIzaSyCdtNnPhqGIayERVQ9_2Dwn2TrCrmUPQCg";
// Updated API URL with the correct model name based on the error message
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent";

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
  generationConfig: {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
}

export interface TextCorrection {
  original: string;
  corrected: string;
  explanation: string;
}

export async function processTextWithGemini(text: string): Promise<{
  corrections: TextCorrection[];
  simplifiedText: string;
  error?: string;
}> {
  try {
    const prompt = `
      Please analyze the following text for spelling and grammar errors.
      For each error, provide:
      1. The original incorrect text
      2. The corrected version
      3. A brief explanation of the correction

      Then, provide a simplified, improved version of the entire text.

      Text to analyze: "${text}"

      Format your response as a JSON object with two properties:
      1. "corrections": An array of objects with "original", "corrected", and "explanation" properties
      2. "simplifiedText": A string with the improved version

      Return only the JSON object, no other text.
    `;

    const requestData: GeminiRequest = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048
      }
    };

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return {
        corrections: [],
        simplifiedText: "",
        error: `API error: ${errorData.error?.message || response.statusText}`
      };
    }

    const data: GeminiResponse = await response.json();

    // Check if content was blocked
    if (data.promptFeedback?.blockReason) {
      return {
        corrections: [],
        simplifiedText: "",
        error: `Content blocked: ${data.promptFeedback.blockReason}`
      };
    }

    // Check if we have a valid response
    if (!data.candidates || data.candidates.length === 0) {
      return {
        corrections: [],
        simplifiedText: "",
        error: "No response generated"
      };
    }

    const responseText = data.candidates[0].content.parts[0].text;
    
    // Try to parse the JSON response
    try {
      // Remove any markdown code block indicators if present
      const cleanedResponse = responseText.replace(/```json|```/g, '').trim();
      const parsedResponse = JSON.parse(cleanedResponse);
      
      return {
        corrections: parsedResponse.corrections || [],
        simplifiedText: parsedResponse.simplifiedText || ""
      };
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return {
        corrections: [],
        simplifiedText: responseText, // Return the raw text as a fallback
        error: "Could not parse structured response"
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      corrections: [],
      simplifiedText: "",
      error: `Error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
