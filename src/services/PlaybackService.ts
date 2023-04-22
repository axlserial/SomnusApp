import TrackPlayer, {Event} from 'react-native-track-player';

// Este servicio se encarga de escuchar los eventos de reproducción y pausa
const PlaybackService = async () => {
	TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
	TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
};

export default PlaybackService;
