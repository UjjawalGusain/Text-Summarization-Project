from nltk.tokenize import WhitespaceTokenizer, sent_tokenize
import re
from spacy.lang.hi import STOP_WORDS as STOP_WORDS_HI


class Model_Rank:
    def __init__(self):
        hindi_pattern = r'[\u0965\u002E\u002C\u0021\u003F\u003B\u003A\u0027\u0022\u2018\u2019\u201C\u201D\u002D\u0028\u0029]'
        self.purna_viram_pattern = r'[\u0964]'
        english_pattern = r'[^\w\s\u0900-\u097F]'
        self.pattern = hindi_pattern + '|' + english_pattern

    def preprocess(self, article):
        article_cleaned = re.sub(self.pattern, ' ', article)
        article_cleaned = re.sub(self.purna_viram_pattern, '.', article_cleaned)
        article_cleaned = article_cleaned.split()
        article_cleaned = [word for word in article_cleaned if word not in STOP_WORDS_HI]
        article_cleaned = ' '.join(article_cleaned)
        return article_cleaned

    def get_score_1(self, article_sentence, headline_sentence):
        if not headline_sentence:
            return 0
        tokenizer = WhitespaceTokenizer()
        article_sentence_tokens = tokenizer.tokenize(article_sentence)
        headline_sentence_tokens = set(tokenizer.tokenize(headline_sentence))
        common_tokens = set([token for token in article_sentence_tokens if token in headline_sentence_tokens])
        if not len(headline_sentence_tokens):
            return 0
        return len(common_tokens) / len(headline_sentence_tokens)

    def get_score_2(self, article_sentence, article):
        tokenizer = WhitespaceTokenizer()
        article_sentence_tokens = tokenizer.tokenize(article_sentence)
        article_tokens = tokenizer.tokenize(article)
        return len(article_sentence_tokens) / len(article_tokens)

    def get_score_3(self, article_sentence):
        tokenizer = WhitespaceTokenizer()
        article_sentence_tokens = tokenizer.tokenize(article_sentence)
        english_pattern = r'\b[a-zA-Z]+\b'
        english_words = re.findall(english_pattern, article_sentence)
        return len(english_words) / len(article_sentence_tokens)

    def get_score_4(self, article_sentence):
        tokenizer = WhitespaceTokenizer()
        article_sentence_tokens = tokenizer.tokenize(article_sentence)
        numbers = set(re.findall(r'\b\d+\b', article_sentence))
        return len(numbers) / len(article_sentence_tokens)

    def get_num_sent_in_summary(self, article_sentence, compression_ratio=0.3):
        sentences = sent_tokenize(article_sentence)
        num_sentences = len(sentences)
        num_sentences = round(num_sentences * compression_ratio)
        if num_sentences:
            return num_sentences
        return 1

    def get_total_score(self, sentence, article, headline):
        s1 = self.get_score_1(sentence, headline)
        s2 = self.get_score_2(sentence, article)
        s3 = self.get_score_3(sentence)
        s4 = self.get_score_4(sentence)
        return s1 + s2 + s3 + s4

    def score_and_sort(self, article, headline):
        article_sentences = sent_tokenize(article)
        sentence_scores = []
        for sentence in article_sentences:
            sentence_score = self.get_total_score(sentence, article, headline)
            sentence_scores.append((sentence, sentence_score))
        sorted_sentences = sorted(sentence_scores, key=lambda x: x[1], reverse=True)
        return sorted_sentences

    def get_summary(self, article, compression_ratio=0.3, headline=""):
        preprocessed_article = self.preprocess(article)
        num_sentences = self.get_num_sent_in_summary(preprocessed_article, compression_ratio)
        article_length = len(preprocessed_article)
        if article_length > 1000:
            compression_ratio = 0.9
        elif article_length > 500:
            compression_ratio = 0.5
        else:
            compression_ratio = 0.4
        # Increase compression ratio by 0.1 for every additional 30 characters
        additional_ratio = (article_length - 500) // 30
        compression_ratio += additional_ratio * 0.1
        sorted_sentences = self.score_and_sort(preprocessed_article, headline)
        summary_sentences = [sentence for sentence, score in sorted_sentences[:num_sentences]]
        summary_paragraph = ' । '.join(summary_sentences)
        return summary_paragraph
