import asyncio
import re
from spacy.lang.hi import STOP_WORDS as STOP_WORDS_HI
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM

tokenizer = None
model = None
model_ready_event = asyncio.Event()

async def load_model():
    global tokenizer, model
    try:
        tokenizer = AutoTokenizer.from_pretrained("./../fine_tuned_model_epoch_5_final")
        model = TFAutoModelForSeq2SeqLM.from_pretrained("./../fine_tuned_model_epoch_5_final")
        model_ready_event.set()
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        model_ready_event.set()

# Start loading the model asynchronously
asyncio.ensure_future(load_model())

def preprocess_text(article):
    hindi_pattern = r'[\u0965\u002E\u002C\u0021\u003F\u003B\u003A\u0027\u0022\u2018\u2019\u201C\u201D\u002D\u0028\u0029]'
    purna_viram_pattern = r'[\u0964]'
    english_pattern = r'[^\w\s\u0900-\u097F]'
    pattern = hindi_pattern + '|' + english_pattern

    sentence = re.sub(pattern, ' ', article)
    sentence = re.sub(purna_viram_pattern, '.', sentence)
    sentence = sentence.split()
    sentence = [word for word in sentence if not word in STOP_WORDS_HI]
    sentence = ' '.join(sentence)
    return sentence

async def summarize_text(text, max_length=150, min_length=40, num_beams=4):
    await model_ready_event.wait()
    input_text = "summarize: " + text
    input_ids = tokenizer.encode(input_text, return_tensors="tf", max_length=512, truncation=True)
    summary_ids = model.generate(input_ids, max_length=max_length, min_length=min_length, num_beams=num_beams, length_penalty=2.0, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

async def summarize(article):
    preprocessed_article = preprocess_text(article)
    summarized_text = await summarize_text(preprocessed_article)
    return "This is a summary of the text.: " + summarized_text
