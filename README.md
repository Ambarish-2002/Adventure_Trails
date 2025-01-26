# Adventure Trails

Adventure Trails is a dynamic and interactive website designed to help users discover, review, and share their favorite places of interest, including hiking trails, sunset points, and more. The project integrates cutting-edge technologies, including interactive maps and deep learning, to provide an intuitive and engaging user experience.

## Features

- **Add and Review Places of Interest**: Users can contribute to the platform by adding new locations and sharing their experiences through reviews.
- **Interactive Map**: Powered by [Mapbox](https://www.mapbox.com/), users can visually explore and locate various trails and points of interest with ease.
- **Toxic Review Detection**: A custom Deep Learning model based on Bi-directional LSTM networks filters out toxic comments in real-time, ensuring a positive and constructive feedback environment.
- **Image Hosting**: Images uploaded by users are stored using the free tier of [Cloudinary](https://cloudinary.com/), offering reliable and efficient media storage.

## Technologies Used

- **Frontend**: JavaScript, HTML, CSS
- **Backend**: Python (for integrating the Deep Learning model)
- **Deep Learning**: Bi-directional LSTM networks for toxic review detection
- **Map Integration**: Mapbox API
- **Image Storage**: Cloudinary free tier

## Getting Started

### Prerequisites
To run the project locally, ensure you have the following:
- A modern web browser
- Python installed for backend functionality
- API keys for Mapbox and Cloudinary

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/adventure-trails.git
   cd adventure-trails
