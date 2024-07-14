# Hindi Text Summarization

## Project Overview

As data continues to grow, the demand for effective text summarization becomes increasingly important. In this project, I explored several text summarization techniques specifically implemented for Hindi text and evaluate their performance on daily news articles.
Additionally, I developed a web application utilizing React, Flask (Python), and Express to provide a comprehensive front-end and backend for the project.



## Features

- **Hindi Text Summarization**: Apply various summarization algorithms to generate concise summaries of Hindi text.
- **Real-time News Summarization**: Fetch and summarize the latest news articles.
- **Web Interface**: User-friendly interface to input text and view summarized results.
- **Multilingual Support**: Future enhancement to support multiple languages(Current version works on hindi language ONLY).

## Project Structure

- **Backend**: Flask application to handle text summarization using various techniques.
- **Frontend**: React application to provide a user-friendly interface for inputting text and displaying summaries.
- **Jupyter Notebooks**: Notebooks where the abstractive model (mt5) was fine-tuned and the extractive model was developed.
- **Python Backend**: Utilizes Flask to serve a Python API, implementing the model functionalities.

## Installation

### Cloning Repository

1. Clone the repository:
    ```bash
    git clone https://github.com/UjjawalGusain/Text-Summarization-Project.git
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
    ```
### Project Root Setup

1. Install the combined Node packages:
    ```bash
    npm install
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ./frontend
    ```

2. Install the required Node packages:
    ```bash
    npm install
    ```

### Backend Setup
    
1. Navigate to the backend directory:
    ```bash
    cd ../backend
    ```

2. Install the required Node packages:
    ```bash
    npm install
    ```
    
### Python Backend Setup
    
3. Install the required Python packages:

    ```bash
    cd ../pythonBackend
    ```
   
    ```bash
    pip install -r requirements.txt
    ```

### Project Start
1. In the root folder:
   
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Use the `SummarizerBlock` to input Hindi text and get a summarized output.
3. Navigate to `/news` to view the summarized news articles.

## Future Work

- Integrate multilingual models to support summarization in various languages.
- Improve the accuracy and efficiency of the summarization algorithms.
- Enhance the UI/UX of the web interface.
- Add more customization options for users to control the summarization process.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/UjjawalGusain/Text-Summarization-Project/blob/main/LICENSE) file for details.
