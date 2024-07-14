const summarizeText = async (texts) => {
  try {
    const response = await fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ texts })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error summarizing text:', error);
    return null;
  }
};

export default summarizeText;
