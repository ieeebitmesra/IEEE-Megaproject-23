from PIL import Image
import torch, os
from torchtext.vocab import build_vocab_from_iterator
from torchtext.data.utils import get_tokenizer
from torch.utils.data import Dataset, DataLoader
from torch.nn.utils.rnn import pad_sequence
import torchvision.transforms as transforms
import pandas as pd



# Setting Dataset Path here 
dataset_path_ann = os.path.join(os.path.dirname(__name__), 'dataset\captions.txt')
dataset_path_img = os.path.join(os.path.dirname(__name__), 'dataset\Images')


# build the vocabulary from the captions
# vocab_saved = torch.load('vocabulary.pth')
def build_vocabulary(caption_list):

    # create tokenizer
    tokenizer = get_tokenizer('spacy', language='en_core_web_sm')

    
    # Instead of appending each word individually, use list comprehension
    # if os.path.exists('tokenized_captions.pth'):
    #     tokenized_captions = torch.load('tokenized_captions.pth')
    # else:
    tokenized_captions = [word for caption in caption_list for word in tokenizer(caption.lower())]
        # torch.save(tokenized_captions, 'tokenized_captions.pth')
    
    # return iterator          
    def yield_tokens(tokenized_captions):
        for word in tokenized_captions:
            yield word
    
    # build vocabulary  
    # if os.path.exists('vocabulary.pth'):
    #     vocab = torch.load('vocabulary.pth')
    # else:
    vocab = build_vocab_from_iterator([yield_tokens(tokenized_captions)], specials=["<pad>", "<start>", "<end>", "<unk>"], min_freq=5)
        # torch.save(vocab, 'vocabulary.pth')
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    vocab = vocab.to(device)

    return vocab


def convert_tokens(captions_raw, vocab, tokenizer):
    '''
    Converts raw text captions to indexed tokens using a vocabulary.
    Takes a list of raw text captions, tokenizes each caption using spaCy,
    adds start and end tokens to each caption, and looks up the index of each token in the vocabulary.
    Returns a list of caption token indexes.
    '''
    # Pre-allocate a list for all tokenized captions to avoid growing the list dynamically
    all_tokens = [['<start>'] + tokenizer(caption.lower()) + ['<end>'] for caption in captions_raw]
    
    # Flatten the list of tokens to look up each token index in the vocabulary only once
    flat_tokens = [token for tokens in all_tokens for token in tokens]
    token_indices = [vocab.get_stoi()[token] for token in flat_tokens]
    
    # Reconstruct the list of captions from the flat list of indices
    # Keep track of the current position in the flat list
    current_position = 0
    captions_indexed = []
    for tokens in all_tokens:
        caption_length = len(tokens)
        # Slice the flat list of indices to get the indices for the current caption
        caption_indices = token_indices[current_position:current_position + caption_length]
        captions_indexed.append(caption_indices)
        current_position += caption_length
    
    return captions_indexed


def convert_tokens_old(captions_raw, vocab, tokenizer):
    '''
    Converts raw text captions to indexed tokens using a vocabulary\n
    Takes a list of raw text captions.
    Tokenizes each caption using spaCy.
    Adds start and end tokens to each caption.
    Looks up index of each token in the vocabulary.\n
    Returns a list of caption token indexes and the vocabulary\n
    '''
    captions = []
    # tokenizer = get_tokenizer('spacy', language='en_core_web_sm')
    # convert raw tokens to indexes
    vocabulary = vocab
    for caption in captions_raw:
        temp = []
        tokens = ['<start>'] + tokenizer(caption.lower()) + ['<end>']
        for token in tokens:
            temp.append(vocabulary.get_stoi()[token])
        captions.append(temp)
    return captions, vocabulary



# Create Dataset
class FlickrDataset(Dataset):
    def __init__(self, image_directory, captions_file, transform=None):
        self.image_directory = image_directory
        self.transform = transform
        self.df = pd.read_csv(captions_file)
        self.imgs = self.df["image"].to_list()
        self.tokenizer_eng = get_tokenizer('spacy', language='en_core_web_sm')
        self.captions = self.df["caption"].to_list()
        # if os.path.exists('vocabulary.pth'):
        #     self.vocab = torch.load('vocabulary.pth')
        # else:
        self.vocab = build_vocabulary(self.df.caption.to_list())
        self.stoi = self.vocab.get_stoi()

    
    def convert(self, caption):
        # tokenizer = get_tokenizer('spacy', language='en_core_web_sm')
        # convert raw tokens to indexes
        tokens = ['<start>'] + self.tokenizer_eng(caption.lower()) + ['<end>']
        return [self.stoi['<start>']] + [self.stoi[token] if token in self.stoi else self.stoi["<unk>"] for token in self.tokenizer_eng(caption.lower())] + [self.stoi['<end>']]

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        caption = self.captions[idx]
        img_id = self.imgs[idx]
        img = Image.open(os.path.join(self.image_directory, img_id)).convert("RGB")

        # Apply transformations if specified
        if self.transform is not None:
            img = self.transform(img)

        # Get corresponding captions
        captions = self.convert(caption)
        return img, torch.tensor(captions)

# padding the images to be of the same length
class MyCollate:
    def __init__(self, pad_index):
        self.pad_index = pad_index

    def __call__(self, batch):
        images = [item[0].unsqueeze(0) for item in batch]
        images = torch.cat(images, dim=0)
        targets = [item[1] for item in batch]
        targets = pad_sequence(targets, batch_first=False, padding_value=self.pad_index)

        return images, targets




def get_loader(
        transform,
        image_directory=dataset_path_img,
        annotation_file=dataset_path_ann,
        batch_size=32,
        num_workers=8,
        shuffle=True,
        pin_memory=True,
):
    '''
    Returns a DataLoader for the Flickr image captioning dataset.
        
        Args:
          image_directory: Path to the folder containing the images.
          annotation_file: Path to the CSV file containing the image filenames and captions.  
          captions_dict: Dictionary mapping image filenames to lists of captions.
          transform: Transformations to apply to each image.
          batch_size: Batch size for the DataLoader.
          num_workers: Number of worker processes for DataLoader. 
          shuffle: Whether to shuffle the dataset.
          pin_memory: Whether to pin memory in DataLoader.
          
        Returns:
          loader: DataLoader for the dataset.
          dataset: The FlickrDataset instance.
    '''
    dataset = FlickrDataset(image_directory, annotation_file, transform=transform)

    pad_index = dataset.stoi["<pad>"]

    loader = DataLoader(
        dataset=dataset,
        batch_size=batch_size,
        num_workers=num_workers,
        shuffle=shuffle,
        pin_memory=pin_memory,
        collate_fn=MyCollate(pad_index=pad_index),
    )
    return loader, dataset


# import pandas as pd
# df = pd.read_csv(dataset_path_ann)
# y_train, voc = convert_tokens(["There's a cat on the mat.", "The dog is under the table."])

# for sent in y_train:
#     for word in sent:
#         print(f'{voc.get_itos()[word]} : {word}', end = ', ')
#     print()