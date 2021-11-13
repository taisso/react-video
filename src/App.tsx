import {
  PlayArrow,
  Replay10,
  Forward10,
  Fullscreen,
  Pause,
} from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import "./style.scss";

function App() {
  const [fullscreen, setFullscreen] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const inputEl = useRef<any>(null);

  const config = {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
  };

  const [mediaPlayer, setMediaPlayer] = useState(config);

  function handleClickPlayer() {
    const playing = !mediaPlayer.playing;
    setMediaPlayer({ ...mediaPlayer, playing });
  }

  function handleDuration(duration: number) {
    setMediaPlayer({ ...mediaPlayer, duration });
  }

  function handleProgress(progress: any) {
    const played = progress.playedSeconds / mediaPlayer.duration;
    setMediaPlayer({ ...mediaPlayer, played });
    setPlayedSeconds(progress.playedSeconds);
    console.log(progress);
  }

  function handleVolumeChange(e) {
    setMediaPlayer({ ...mediaPlayer, volume: parseFloat(e.target.value) });
  }

  function handleSeekMouseUp(e) {
    //this.setState({ seeking: true });

    //@ts-ignore
    inputEl.current.seekTo(parseFloat(e.target.value));
  }

  function handleClickFullscreen() {
    setFullscreen((current) => !current);
  }

  function handleBack10Seconds() {
   inputEl.current.seekTo(inputEl.current.getCurrentTime() - 10);
  }
  
  function handleforward10Seconds() {
    inputEl.current.seekTo(inputEl.current.getCurrentTime() + 10);
  }

  function handleChangeSeek(e) {
    console.log(e)
  }

  useEffect(() => {
    if (fullscreen && inputEl.current) {
      const videoElem = inputEl.current.getInternalPlayer();
      screenfull.request(videoElem);
    }
  }, [fullscreen]);

  return (
    <div className="app">
      <header className="header">
        <h1>PlayTube</h1>
      </header>
      <main className="cotainer">
        <div className="content-video">
          <ReactPlayer
            ref={inputEl}
            onSeek={handleChangeSeek}
            className="video-element"
            onDuration={handleDuration}
            onProgress={handleProgress}
            onReady={() => console.log("Ready")}
            {...mediaPlayer}
          />
          <div className="controls">
            <div className="controlrs-left">
              <button
                className="play-button control-button"
                onClick={handleBack10Seconds}
              >
                <Replay10 className="play-icon" fontSize={"large"} />
              </button>
              <button
                className="play-button control-button"
                onClick={handleClickPlayer}
              >
                {!mediaPlayer.playing ? (
                  <PlayArrow className="play-icon" fontSize={"large"} />
                ) : (
                  <Pause className="play-icon" fontSize={"large"} />
                )}
              </button>
              <button
                className="play-button control-button"
                onClick={handleforward10Seconds}
              >
                <Forward10 className="play-icon" fontSize={"large"} />
              </button>
              <button className="play-button control-button button-volume">
                <input
                  className="range cursor"
                  type="range"
                  min={0}
                  max={1}
                  value={mediaPlayer.volume}
                  onChange={handleVolumeChange}
                  step="any"
                />
              </button>
            </div>
            <button className="play-button control-button button-range">
              <input
                className="range"
                type="range"
                min={0}
                max={1}
                readOnly
                onMouseUp={handleSeekMouseUp}
                value={mediaPlayer.played}
                step="any"
              />
            </button>
            <div className="controlrs-right">
              <button
                className="play-button control-button"
                onClick={handleClickFullscreen}
              >
                <Fullscreen className="play-icon" fontSize={"large"} />
              </button>
            </div>
          </div>
        </div>
        <div className="cotent-more-video">
          <p>Mais vídeos</p>
          <div className="item-video">
            <img
              src="https://www.smarteyeapps.com/demo/video-streaming-website-templates-free-download-987/assets/images/video/b1.jpg"
              alt="Imagem 1"
            />
            <div className="detail">
              <p>Picture, abstract symbols the igredients with</p>
              <p>Posted on: 2018</p>
            </div>
          </div>
          <div className="item-video">
            <img
              src="https://www.smarteyeapps.com/demo/video-streaming-website-templates-free-download-987/assets/images/video/b1.jpg"
              alt="Imagem 2"
            />
            <div className="detail">
              <p>Picture, abstract symbols the igredients with</p>
              <p>Posted on: 2018</p>
            </div>
          </div>
          <div className="item-video">
            <img
              src="https://www.smarteyeapps.com/demo/video-streaming-website-templates-free-download-987/assets/images/video/b1.jpg"
              alt="Imagem 3"
            />
            <div className="detail">
              <p>Picture, abstract symbols the igredients with</p>
              <p>Posted on: 2018</p>
            </div>
          </div>
          <div className="item-video">
            <img
              src="https://www.smarteyeapps.com/demo/video-streaming-website-templates-free-download-987/assets/images/video/b1.jpg"
              alt="Imagem 4"
            />
            <div className="detail">
              <p>Picture, abstract symbols the igredients with</p>
              <p>Posted on: 2018</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
