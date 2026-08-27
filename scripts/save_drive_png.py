"""Save Google Drive download_file_content JSON to a PNG path."""
import base64
import json
import sys
from pathlib import Path

out = Path(sys.argv[1])
data = json.load(sys.stdin)
raw = base64.b64decode(data["content"])
out.write_bytes(raw)
print(out, len(raw), data.get("title"))
