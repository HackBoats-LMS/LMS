'use client';
import React from 'react';

interface VideoEmbedProps {
  videoId: string;
  title: string;
  description: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId, title, description }) => {
  return (
    <div className="video-embed">
      <h4 className="video-title">{title}</h4>
      <p className="video-description">{description}</p>
      <div className="video-container">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoEmbed;
