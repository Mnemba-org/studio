MYSTUDIO — CLICK TO SHOW CONTROLS

Click yourself or an object in the preview to show the editing controls. Click an empty area in the scene to hide them. Drag the corner to resize, and drag the top handle to rotate. The controls do not appear in recorded video.

MYSTUDIO — DIRECT CONTROLS

WHAT IT DOES
The camera cutout is smoothed over time to reduce flickering or waves in the virtual background. Keep more of me starts at zero. Raise it slowly if ears or hair disappear; too much can bring the room back into view. Use bright, even light and avoid backgrounds close to your clothing or skin tone. Quick movement can cause a short trail.

Click an object or yourself in the preview. Drag inside the selection to move, drag its bottom-right purple handle to resize, and drag the purple handle above it to rotate. The selection handles are an overlay and are not included in recorded videos. To select yourself beneath an object, click Move my image. The frame around your image is a control guide, not an exact outline of your body.

Upload your own image or recorded video as a flat movable object using Add your own image or video. Video objects loop and are muted. For a cutout object use a transparent PNG. Drag yourself directly on the preview (click away from objects), and use the size control. Drag objects to reposition them, and use the sliders to rotate or resize. Uploaded media is used locally.

The settings panel on the right has its own scroll bar. Move the mouse over the settings panel and use the mouse wheel, or drag its scroll bar, while watching the preview. On narrower screens the settings panel is below the preview and scrolls independently.

Move your image: start camera, click Move my image, then drag your image in the preview. Use Your size to resize and Reset to restore. Click Move my image again to select objects. Select an object and use Object rotation to rotate it. Edge softness defaults to zero to keep detail; try increasing Keep more of me if parts disappear. This can also reveal background around you. Good light, a plain background and a clear view of the body are important. The camera cannot show parts outside its frame and AI background removal is imperfect.

Add lamp, plant, microphone and frame stickers from the side panel. Drag one on the preview, use the size slider, move it in front of or behind yourself, or remove it. Start the camera to see and move objects. Objects appear in recordings and OBS. These are flat emoji-style stickers, not realistic 3D models.

Choose a background, appear in front of it using your webcam, record a video with your microphone, and download the recording. This is a 2D background replacement prototype; it does not create a navigable 3D room or place you behind furniture.

START ON WINDOWS
1. Extract the ZIP to a normal folder.
2. Install Node.js if you don't have it: https://nodejs.org/ (choose the LTS version).
3. Double-click START-WINDOWS.bat. Keep its command window open.
4. Open http://localhost:3000 in Chrome or Edge if it does not open automatically.
5. Click Start camera and allow camera and microphone permissions. Select a scene and click Start recording. Stop recording and click Download video.

An internet connection is needed for the background-removal model and the sample background photos. Your camera frames are processed locally in your browser; sample photos and model files are downloaded from third-party servers. You can upload your own background image too.

RECORDING AND SOCIAL MEDIA
The recording is saved as a WebM video. Some social apps may require MP4; convert the downloaded file using a video editor if necessary. Record a short sample first and check its sound and edges. The preview is landscape (16:9); vertical output is not yet supported. If the microphone is unavailable, the app may record without sound.

LIVE STREAMING WITH OBS
1. Open MyStudio in Chrome or Edge, start the camera, and select a scene.
2. Open OBS Studio. Add a Window Capture source and select the browser window. Crop the source to the video preview (hold Alt while dragging the edges in OBS on Windows).
3. Add your microphone as an Audio Input Capture source in OBS. MyStudio's preview is muted, so the browser window capture does not supply microphone audio.
4. Start streaming from OBS. For video calls, use OBS Start Virtual Camera, then select OBS Virtual Camera in the meeting app. Select your microphone separately in that app.
5. If OBS shows a black window, try another Window Capture method in its source properties, or use Display Capture.

You cannot select MyStudio directly as a camera in Google Meet or streaming apps. OBS Virtual Camera is a separate application and may need to be installed. Avoid opening the same physical webcam separately in both OBS and MyStudio if your device allows only one app to use it.

TIPS AND TROUBLESHOOTING
- Use good lighting and avoid clothes close to the background color. Hair and hands may have rough edges.
- The first start can take a little while as the model downloads. Keep internet on.
- Camera permissions require localhost; do not double-click index.html.
- If camera access fails, close other apps using it and check Windows/browser permissions. Reload after changing permissions.
- If pictures do not load, check internet or upload your own. You are responsible for rights to any images and videos you publish.
- If a localhost port is already in use, close the other application using port 3000.
- This early prototype does not yet have accounts, editable 3D scenes, vertical recording, an integrated streaming service, or an installer/virtual camera.

MAC/LINUX: install Node.js, open a terminal in this folder, run `node server.js`, and visit http://localhost:3000.
