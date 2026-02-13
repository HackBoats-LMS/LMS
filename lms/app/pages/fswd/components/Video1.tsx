import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, Maximize, Minimize } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const Video1 = ({ videoId, onComplete }: { videoId: string; onComplete?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  const watchedSecondsRef = useRef(0);
  const lastTimeRef = useRef(0);
  const watchTimerRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopWatchTimer = useCallback(() => {
    if (watchTimerRef.current !== null) {
      clearInterval(watchTimerRef.current);
      watchTimerRef.current = null;
    }
  }, []);

  const startWatchTimer = useCallback(() => {
    stopWatchTimer();

    lastTimeRef.current = playerRef.current?.getCurrentTime?.() ?? 0;

    watchTimerRef.current = window.setInterval(() => {
      if (!playerRef.current) return;

      const current = playerRef.current.getCurrentTime();

      // only count forward playback
      if (current > lastTimeRef.current) {
        watchedSecondsRef.current += current - lastTimeRef.current;
      }

      lastTimeRef.current = current;
    }, 1000);
  }, [stopWatchTimer]);

  const onPlayerReady = (event: any) => {
    event.target.setPlaybackQuality('hd1080');
  };

  const onPlayerStateChange = useCallback((event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setPlaying(true);
      event.target.setPlaybackQuality('hd1080');
      startWatchTimer();
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setPlaying(false);
      stopWatchTimer();
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setPlaying(false);
      stopWatchTimer();
      console.log("Total watched seconds:", watchedSecondsRef.current);
      if (onComplete) onComplete();
    } else if (event.data === window.YT.PlayerState.BUFFERING) {
      event.target.setPlaybackQuality('hd1080');
    }
  }, [startWatchTimer, stopWatchTimer]);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (playerRef.current) return;
      if (!iframeRef.current) return;

      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };
    }

    return () => {
      stopWatchTimer();
    };
  }, [onPlayerStateChange, stopWatchTimer]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || typeof playerRef.current.getPlayerState !== 'function') return;

    const playerState = playerRef.current.getPlayerState();

    if (playerState === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, []);

  const rewind10Seconds = useCallback(() => {
    if (!playerRef.current || typeof playerRef.current.getCurrentTime !== 'function') return;
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(0, currentTime - 10), true);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
      });
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        rewind10Seconds();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, rewind10Seconds, toggleFullscreen]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Controls visibility
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2000);
  };

  const handleMouseLeave = () => {
    if (playing) setShowControls(false);
  };

  // const url = "dza65WX0qU8"
  // const encoded = encodeURIComponent(url)
  // const videoId = encoded;
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: isFullscreen ? "100%" : 900,
        aspectRatio: isFullscreen ? "unset" : "16 / 9",
        height: isFullscreen ? "100vh" : "auto",
        backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <iframe
        ref={iframeRef}
        id="unit-video-iframe"
        title="video"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3`}
        allow="autoplay; encrypted-media; fullscreen"
        style={{
          width: isFullscreen ? "100%" : "100%",
          height: isFullscreen ? "100%" : "100%",
          display: "block",
          pointerEvents: "none",
        }}
      />

      <div
        onClick={togglePlay}
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          zIndex: 10,
          cursor: showControls ? "default" : "none",
        }}
      />

      {!playing && (
        <div
          style={{
            position: "absolute",
            zIndex: 15,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            inset: 0
          }}
        >
          <div style={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            padding: "20px",
            color: "white",
            backdropFilter: "blur(4px)"
          }}>
            <Play size={48} fill="white" />
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          padding: "20px 20px 25px 20px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: showControls ? "auto" : "none"
        }}
      >
        <div style={{ display: "flex", items: "center", gap: "16px" }}>
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="text-white hover:text-blue-400 transition-colors focus:outline-none"
            title={playing ? "Pause (Space)" : "Play (Space)"}
          >
            {playing ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); rewind10Seconds(); }}
            className="text-white hover:text-blue-400 transition-colors focus:outline-none flex items-center gap-1 group"
            title="Rewind 10 seconds"
          >
            <RotateCcw size={20} />
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-1">10s</span>
          </button>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
          className="text-white hover:text-blue-400 transition-colors focus:outline-none"
          title="Fullscreen"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Video1;
