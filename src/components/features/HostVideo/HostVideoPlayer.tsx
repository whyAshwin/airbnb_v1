import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { HostVideo } from '../../../types';
import Badge from '../../ui/Badge';

interface HostVideoPlayerProps {
  hostVideo: HostVideo;
  autoPlay?: boolean;
}

const HostVideoPlayer: React.FC<HostVideoPlayerProps> = ({ hostVideo, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Play/pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Highlight keywords in captions
  const highlightedCaption = React.useMemo(() => {
    let caption = hostVideo.caption;
    
    hostVideo.keywords.forEach(keyword => {
      // Create a case-insensitive regexp to match the keyword
      const regex = new RegExp(`(${keyword})`, 'gi');
      caption = caption.replace(regex, '<span class="text-primary font-medium">$1</span>');
    });
    
    return caption;
  }, [hostVideo.caption, hostVideo.keywords]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-100 group">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-48 object-cover"
        src={hostVideo.url}
        poster="/host-video-placeholder.jpg"
        muted={isMuted}
        autoPlay={autoPlay}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Play/Pause Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={togglePlay}
          className="p-2 bg-white/80 rounded-full hover:bg-white"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center bg-gradient-to-t from-black/60 to-transparent">
        <div>
          <h3 className="text-white text-sm font-semibold">Get to Know the Property and the Host</h3>
        </div>
        <button 
          onClick={toggleMute}
          className="p-1.5 bg-black/40 rounded-full hover:bg-black/60 text-white"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
      
      {/* Caption */}
      <div className="p-3 bg-white border-t border-gray-100">
        <p 
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: highlightedCaption }}
        ></p>
        
        {/* Host Traits */}
        <div className="mt-2 flex flex-wrap gap-1">
          {hostVideo.hostTraits?.map((trait, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="text-xs"
            >
              {trait}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostVideoPlayer;