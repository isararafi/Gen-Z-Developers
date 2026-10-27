# Gen Z Developers website

A responsive, single-page construction company website built with plain HTML, CSS and JavaScript. No framework, build step or package installation is needed.

## Run the site

Open `index.html` in a modern browser. Google Fonts and the embedded map need an internet connection. Local pages and images work offline.

## Featured 5 Marla project gallery

The Projects section now focuses on one 5 Marla home in Bahria Town Phase 8. Its nine supplied photos cover the exterior, kitchen, bathroom, ceiling designs, TV lounge and car porch wall. The gallery supports around 30 or more photos, category filters and a full-size lightbox with next and previous controls.

### Add another project photo

1. Copy an optimized JPG, PNG or WebP photo into the `images/` folder. For example: `images/5-marla-bedroom-01.jpg`.
2. Open `js/main.js` and find the `projectPhotos` array.
3. Add one photo object before the closing bracket (the array already allows a trailing comma):

```js
{
  src: 'images/5-marla-bedroom-01.jpg',
  category: 'Bedroom',
  title: 'Upstairs bedroom',
  alt: 'Bright upstairs bedroom with a built-in wardrobe and a large window.',
  description: 'A calm bedroom with built-in storage and daylight.'
},
```

4. Use a clear, descriptive `alt` value for accessibility. Use an existing category (`Exterior`, `Kitchen`, `Bathroom`, `Ceiling`, `TV Lounge`, or `Car Porch`) or create a new one such as `Bedroom`, `Living room`, or `Details`. The filter button and photo count are generated automatically from the list.

Photos use lazy loading and `object-fit: cover`. Keep originals in the `images/` folder and reference them with relative paths such as `images/5-marla-bedroom-01.jpg`. Do not use a local computer path.

## Interior videos

The video section shows the featured 5 Marla home's full walkthrough and a separate kitchen tour. The players use `videos/video1.mp4` and `videos/video2.mp4`, respectively; see [`videos/README.md`](videos/README.md) to replace them. Players use `preload="none"` so they wait until a visitor presses play.

## Edit company details

- Company name and tagline: update the text in `index.html` and the page title / description in the `<head>`.
- WhatsApp: both business and property inquiries go to `+92 336 556 3274`. Update the `wa.me` links in `index.html` if the number changes.
- Address and map: update `Bahria Town Phase 8, Rawalpindi` in `index.html` and set the map iframe URL to the office location.
- Services and design feedback: edit the corresponding sections in `index.html`.
- Colors and typography: edit the CSS variables near the top of `css/style.css`.

The gallery photos and company details should be confirmed before publishing.
