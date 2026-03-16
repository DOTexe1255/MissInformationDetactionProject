import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from torch.utils.data import Dataset
import torch

# 1. Load dataset

df_true = pd.read_csv('/content/True.csv')
df_fake = pd.read_csv('/content/Fake.csv')

df_true["label"] = 1   # REAL
df_fake["label"] = 0   # FAKE

df = pd.concat([df_true, df_fake]).sample(frac=1, random_state=42).reset_index(drop=True)

# Remove missing values
df = df.dropna(subset=["title", "text"])
# 2. Create 3 versions of training data

title_only = pd.DataFrame({
    "content": df["title"].astype(str),
    "label": df["label"]
})

text_only = pd.DataFrame({
    "content": df["text"].astype(str),
    "label": df["label"]
})

combined = pd.DataFrame({
    "content": df["title"].astype(str) + " [SEP] " + df["text"].astype(str),
    "label": df["label"]
})

# Merge all three datasets
df_aug = pd.concat([title_only, text_only, combined]).sample(frac=1).reset_index(drop=True)

print("Total Samples After Augmentation:", len(df_aug))
# 3. Train-test split

train_texts, val_texts, train_labels, val_labels = train_test_split(
    df_aug["content"].tolist(),
    df_aug["label"].tolist(),
    test_size=0.2,
    random_state=42,
    stratify=df_aug["label"]
)
# 4. Dataset Class

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

class NewsDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=256):
        self.encodings = tokenizer(texts, truncation=True, padding=True, max_length=max_len)
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        item = {k: torch.tensor(v[idx]) for k, v in self.encodings.items()}
        item["labels"] = torch.tensor(self.labels[idx])
        return item

train_dataset = NewsDataset(train_texts, train_labels, tokenizer)
val_dataset = NewsDataset(val_texts, val_labels, tokenizer)
# 5. Model setup

model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=2,
    id2label={0: "FAKE", 1: "REAL"},
    label2id={"FAKE": 0, "REAL": 1}
)
# 6. Training Arguments

training_args = TrainingArguments(
    output_dir='./results',
    eval_strategy='epoch',
    save_strategy='epoch',
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=2,
    weight_decay=0.01,
    logging_steps=50,
    report_to="none",  # Disable W&B unless needed
    load_best_model_at_end=True
)

# 7. Trainer

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    tokenizer=tokenizer
)

trainer.train()
# 8. Save final model

model.save_pretrained("./bert_title_text_model")
tokenizer.save_pretrained("./bert_title_text_model")

print("\n🎉 MODEL TRAINED ON TITLE + TEXT + BOTH")
print("Saved at: ./bert_title_text_model")

# !zip -r bert_title_text_model.zip /content/bert_title_text_model
# from google.colab import files
# files.download("bert_title_text_model.zip")