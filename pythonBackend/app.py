from flask import Flask, request, jsonify
from flask_cors import CORS
from model_extractive import Model_Rank
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
import sys
sys.stdout.reconfigure(encoding='utf-8')
@app.route('/summarize', methods=['POST'])
def summarize_text():
    try:
        data = request.json
        texts = data['texts']
        m = Model_Rank()
        summaries = []
        for text in texts:
            summary = m.get_summary(article=text, compression_ratio=0.1)  # Adjust parameters as needed
            summaries.append(summary)
        
        return jsonify(summaries), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)




'''
    The code below is for abstractive summarization. 
    Warning: Do not run
'''
# from quart import Quart, request, jsonify
# from quart_cors import cors
# import asyncio
# from model_abstractive import summarize, model_ready_event

# app = Quart(__name__)
# cors(app, allow_origin="http://localhost:5173")

# @app.route('/summarize', methods=['POST'])
# async def summarize_text():
#     try:
#         await model_ready_event.wait()
#         data = await request.get_json()
#         texts = data['texts']
        
#         summaries = []
#         for text in texts:
#             summary = await summarize(text)
#             summaries.append(summary)
        
#         return jsonify(summaries), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
