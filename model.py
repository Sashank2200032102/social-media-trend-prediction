import re
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

class TrendPredictor:
    def __init__(self):
        # Example training dataset (hashtags + categories)
        self.data = [
            ("#AI is booming", "Tech"),
            ("#Elections2025 updates", "Politics"),
            ("#IPL2025 match highlights", "Sports"),
            ("#Crypto market crash", "Finance"),
            ("#MovieRelease trending", "Entertainment"),
        ]
        
        texts, labels = zip(*self.data)
        
        # Convert text to vectors
        self.vectorizer = CountVectorizer()
        X = self.vectorizer.fit_transform(texts)
        
        # Train Naive Bayes classifier
        self.model = MultinomialNB()
        self.model.fit(X, labels)

    def preprocess(self, text):
        """Clean input text"""
        return re.sub(r'[^a-zA-Z0-9# ]', '', text.lower())

    def predict(self, text):
        """Predict trend category for given text"""
        X = self.vectorizer.transform([self.preprocess(text)])
        return self.model.predict(X)[0]
