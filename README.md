# ⭐ Pokémon Card Generator

A dynamic, animated Pokémon card app powered by the PokéAPI

-

## 📌 Project Overview

The Pokémon Card Generator is a web application that creates fully dynamic Pokémon cards using data fetched directly from the PokéAPI.
Each Pokémon card includes:
- Official artwork
- Type-based color theming
- Habitat background images
- Height, weight, genus, and basic info
- Ability names + English descriptions
- Random Pokémon generator via a Pokéball button
- Dropdown selector with animated “blind roll”
- Responsive layout for mobile and desktop

This project blends HTML, CSS, and JavaScript with API data to create a smooth, interactive experience.

---

## 🧩 Features

### 🎴 Dynamic Pokémon Card

- Fetches Pokémon data (/pokemon/:id)
- Fetches species info (/pokemon-species/:id)
- Displays:
    - Name
    - HP
    - Type icon
    - Height & weight
    - Genus
    - Official artwork
    - Habitat background
    - First two abilities with full English descriptions

### 🎲 Random Pokémon Generator

Click the Pokéball to instantly load a random Pokémon (ID 1–1025).

### 🧭 Dropdown Pokémon Selector

- Pick a Pokémon manually using the dropdown menu.
- Each item triggers a full card reload.
- Dropdown has a smooth blind-roll animation.
- On desktop: dropdown overlays the card.
- On mobile: dropdown pushes content down like an accordion.

### 🖼️ Habitat-Based Backgrounds

Each Pokémon displays a contextual background image based on its habitat:

- Forest
- Cave
- Sea
- Grassland
- Mountain
- Urban
- Rough terrain
- Water’s edge
- Fallback default

### 🎨 Type-Based Theming

The entire card background color adapts to the Pokémon’s primary type (Fire, Water, Grass, etc.) via CSS variables.

### 📱 Responsive Design

- Mobile: dropdown expands downward and shifts content

- Desktop: dropdown overlays in front

- Layout rearranges cleanly across breakpoints

---

### 🛠️ Tech Stack

- HTML5 — structure for the card & UI
- CSS3 — theming, responsive design, animations
- JavaScript (ES6+) — data fetching, DOM updates, animations
- PokéAPI — all Pokémon data: https://pokeapi.co
- Local assets — icons + habitat backgrounds

## 🔧 How It Works
### 1. Fetch Pokémon Data
```js
const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
const pokemon = await pokemonRes.json();
```

### 2. Fetch Species Data
```js
const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
const species = await speciesRes.json();
```

### 3. Fetch Ability Descriptions
```JS
const abilityRes = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
```

### 4. Render Everything Dynamically

The DOM updates sections for:

- Top info
- Image area
- Middle stats
- Ability list
- Background images
- Type visual theme

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 2. Open in a Browser

Since this project uses only client-side JS:
```bash
open index.html
```
or drag the file into Chrome/Firefox/Edge.

### 3. No Build Tools Required

No npm, bundlers, or frameworks — pure vanilla JS.

## 📁 Project Structure

```go
.
├── components/
│   ├── images/
│   │   ├── habitats/
│   │   ├── type-icons/
│   │   └── other-images...
│   └── styles.css
├── scripts/
│   └── app.js
├── index.html
└── README.md
```

## 🌟 Future Improvements

- Add shiny Pokémon mode
- Add stat bars (Attack, Defense, Speed, etc.)
- Add evolution chain display
- Add search bar with autocomplete
- Add animated transitions between Pokémon

## 📜 License

This project is open source and available under the MIT License.

