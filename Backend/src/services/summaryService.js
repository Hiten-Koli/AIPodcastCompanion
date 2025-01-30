const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function summarizeText(text) {
  try {
    const response = await hf.request({
      model: 'google/pegasus-xsum',
      inputs: text,
    });

    // Clean and return the summary
    return response[0].summary_text;
  } catch (error) {
    console.error('Error generating summary:', error);
    return 'Error generating summary';
  }
}

module.exports = { summarizeText };
