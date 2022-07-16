# this file is windows OS only
import glob;
import os;
import sys;
import time;
import json;

BASE_DIR = os.path.dirname(os.path.abspath(__file__));
BASE_CARDS = os.path.join(BASE_DIR, "BASE");
cardsArr = glob.glob(BASE_CARDS + "/*");

# reading cards from png files also making sence with solidity cards array
# string[52] cards = [
#     "S-2", "H-2", "C-2", "D-2",
#     "S-3", "H-3", "C-3", "D-3",
#     "S-4", "H-4", "C-4", "D-4",
#     "S-5", "H-5", "C-5", "D-5",
#     "S-6", "H-6", "C-6", "D-6",
#     "S-7", "H-7", "C-7", "D-7",
#     "S-8", "H-8", "C-8", "D-8",
#     "S-9", "H-9", "C-9", "D-9",
#     "S-10", "H-10", "C-10", "D-10",
#     "S-J", "H-J", "C-J", "D-J",
#     "S-Q", "H-Q", "C-Q", "D-Q",
#     "S-K", "H-K", "C-K", "D-K",
#     "S-A", "H-A", "C-A", "D-A"
# ];
IPFS_URL = "https://gateway.pinata.cloud/ipfs/";
IPFS_LOC = "https://gateway.pinata.cloud/ipfs/QmUDdbnhnbYp1ycNg2skWGFZvMbYsCdQNQ1pe36MULWfXu/";
_metadata = []
for card in cardsArr:
    _dict = {}
    name = card.split("\\")[-1];
    image = IPFS_LOC + name;
    name = name.split(".")[0];
    _dict["name"] = name;
    _dict["image"] = image;
    _dict["creator"] = "card3";
    _dict["discord"] = "DISCORD_URL";
    _dict["website"] = "https://card3.org";
    _dict["github"] = "GITHUB_URL";
    _dict["date"] = time.time();
    _metadata.append(_dict);
    with open(f"./_metadata/{name}.json", "w") as f:
        json.dump(_dict, f, indent=4);

with open(f"./_metadata/_metadata.json", "w") as f:
    json.dump(_metadata, f, indent=4);


