# Xenoid osu! Portfolio

A modern, responsive portfolio website for osu! player Xenoid, featuring real-time data from the osu! API.

## Features

- 🎮 **Real-time osu! API integration**: Fetches user profile, statistics, and top 100 best scores
- 🎨 **Light/Dark theme toggle**: Switch between light and dark modes
- 🖼️ **Banner background**: Uses the user's osu! profile banner with smooth gradients
- 📊 **Clean statistics display**: Shows global rank, country rank, accuracy, play count, PP, and level
- 🏆 **Top 100 best scores**: Paginated display of top plays with beatmap thumbnails
- 📱 **Responsive design**: Works perfectly on desktop and mobile devices
- 🎯 **BBCode support**: About section with BBCode-style content including images, links, and collapsible boxes
- 💡 **Lightbox for images**: Click images to view them in full size

## Installation

### Prerequisites

- Node.js (v14 or higher)
- osu! API credentials (Client ID and Client Secret)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Xenooid/Osu-Portofolio-WIP-.git
   cd Osu-Portofolio-WIP-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory and add your osu! API credentials:
   ```env
   OSU_CLIENT_ID=your_client_id_here
   OSU_CLIENT_SECRET=your_client_secret_here
   OSU_USER_ID=Xenoid
   ```

   - Get your API credentials from: https://osu.ppy.sh/home/account/edit#oauth
   - Create a new OAuth application with callback URL: `http://localhost:3000`

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open the website**
   
   Visit http://localhost:3000 in your browser

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **API**: osu! API v2
- **Fonts**: Inter, JetBrains Mono
- **Styling**: CSS custom properties, gradients, glass-morphism effects

## Project Structure

```
├── index.html          # Main HTML file
├── server.js           # Express server for API integration
├── package.json        # Project dependencies and scripts
├── .env                # Environment variables (not committed to Git)
└── .gitignore          # Git ignore file
```

## Customization

### Change User

To display a different osu! player, edit the `OSU_USER_ID` in your `.env` file:
```env
OSU_USER_ID=your_favorite_player
```

### Styling

All styling is done with CSS custom properties in `index.html`. You can easily customize:
- Colors (`--accent`, `--accent2`, `--bg`, etc.)
- Border radius (`--radius`, `--radius-sm`)
- Shadows (`--shadow-sm`, `--shadow`, `--shadow-lg`)

## Credits

- **Player**: [Xenoid](https://osu.ppy.sh/users/Xenoid)
- **API**: [osu! API v2](https://osu.ppy.sh/docs/index.html)
- **Design Inspiration**: [example.html](example.html)

## License

This project is open source and available under the MIT License.

## Support

If you have any questions or run into issues, feel free to open an issue in the repository!

---

Made with 💖 for the osu! community
