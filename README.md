# MyStudio — 3D Podcast Room (Flask + Three.js)
Inspired by the supplied peach-colored podcast studio photo. This is a procedural 3D scene, **not** a photogrammetric reconstruction or downloaded GLB model.

## Run
```bash
pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000 in Chrome or Edge with internet access (Three.js loads from CDN).

## Included
- Real Three.js 3D geometry: peach acoustic wall, desk, two armchairs, microphone boom arms, shelf, plants, rug, studio sign, lights
- Orbit, zoom, studio object position and rotation editing
- Wall and lighting color, custom studio title
- Local save/load of design
- Camera preview and video recording (captures studio canvas and microphone audio; webcam preview is NOT composited into the saved 3D video yet)
- PNG export
- Flask server and health API

## Current limitations
The people/background-removal compositing and depth occlusion (person behind desk) are not implemented in this version. No payments, accounts, backend database or 3D model import yet.
