# Video Setup Instructions

## Hero Section Video Background

The hero section now supports a video background that plays automatically when the portfolio loads.

### How to Add Video:

1. **Video Requirements:**
   - Format: MP4 (H.264 codec recommended for best compatibility)
   - Recommended duration: 10-30 seconds (will loop)
   - Recommended resolution: 1920x1080 (Full HD) or 1280x720 (HD)
   - File size: Keep it under 10MB for fast loading (compress if needed)
   - Content: Something tech-related, abstract, or professional

2. **File Placement:**
   - Save your video file as `hero-video.mp4`
   - Place it in the `public` folder
   - Path: `public/hero-video.mp4`

3. **If No Video:**
   - The hero section will automatically hide the video container if the file doesn't exist
   - A beautiful gradient background with particles will be used as fallback
   - No changes needed - the code handles this gracefully

### Video Ideas:
- Abstract tech animations
- Code typing animations
- Geometric patterns
- Particles/fluid effects
- Subtle background motion
- Digital workspace timelapse

### Tools for Creating/Compressing Video:
- **Online:** CloudConvert, Handbrake
- **Compression:** Use Handbrake to reduce file size while maintaining quality
- **Creation:** After Effects, Premiere Pro, or free tools like DaVinci Resolve

### Video Settings (Recommended):
- Codec: H.264
- Bitrate: 2-5 Mbps
- Frame rate: 30fps
- Audio: None (video will be muted automatically)

---

**Note:** The video is optional. The portfolio works perfectly fine without it, using the beautiful gradient and particle effects as fallback.
