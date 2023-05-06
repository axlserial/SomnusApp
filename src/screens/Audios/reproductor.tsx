import React, {useEffect, useState} from 'react';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import {View, Text, TouchableOpacity, ProgressBar} from 'react-native-ui-lib';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import {ImageBackground} from 'react-native';

type Props = {
	route: RouteProp<any>;
	navigation: NavigationProp<any>;
};

const Reproductor: React.FC<Props> = ({route}) => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState(route.params);
	const progress = useProgress();
	const [cancionActualIndex, setCancionActualIndex] = useState(route.params?.id);

	useEffect(() => {
		const startPlayer = async () => {
			try {
				setIsTrackPlayerInit(true);
			} catch (error) {
				console.log(error);
			}
		};
		startPlayer();
	}, []);

	useEffect(() => {
		const initializeTrack = async () => {
			const {id, url, title, artist, artwork} = currentTrack ?? {
				id: 0,
				url: '',
				title: '',
				artist: '',
				artwork: '',
			};
			if ((await TrackPlayer.getActiveTrackIndex()) != id) {
				await TrackPlayer.skip(id);
			}
			await TrackPlayer.play();
			setIsPlaying(true);
		};
		if (isTrackPlayerInit) {
			initializeTrack();
			setCurrentTrack(currentTrack);
		}
	}, [isTrackPlayerInit]);

	const onPlayPausePress = async () => {
		const state = await TrackPlayer.getState();
		if (state === State.Paused) {
			await TrackPlayer.play();
			setIsPlaying(true);
		} else if (state === State.Playing) {
			await TrackPlayer.pause();
			setIsPlaying(false);
		} else {
			await TrackPlayer.play();
			setIsPlaying(true);
		}
		setCurrentTrack(route.params);
	};
	const skipToPrevius = async () => {
		await TrackPlayer.skipToPrevious();
		setCurrentTrack(route.params);
	};
	const skipToNext = async () => {
		await TrackPlayer.skipToNext();
		setCurrentTrack(route.params);
	};

	const formatTime = (seconds: number): string => {
		const min = Math.floor(seconds / 60);
		const sec = Math.floor(seconds % 60);
		return `${min}:${sec < 10 ? '0' : ''}${sec}`;
	};

	useEffect(() => {
		const updateCurrentTrack = async () => {
			const {id, url, title, artist, artwork} = currentTrack ?? {
				id: 0,
				url: '',
				title: '',
				artist: '',
				artwork: '',
			};
			const activeTrackIndex = await TrackPlayer.getActiveTrackIndex();
			if (activeTrackIndex !== id) {
				await TrackPlayer.skip(id);
				await TrackPlayer.play();
				setIsPlaying(true);
			}
		};

		if (currentTrack) {
			updateCurrentTrack();
		}
	}, [currentTrack]);

	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<ImageBackground
				source={currentTrack?.artwork}
				style={{
					flex: 0.6,
					width: '90%',
					height: '80%',
					marginLeft: 35,
				}}></ImageBackground>
			<Text style={{fontSize: 28}}>{currentTrack?.title}</Text>
			<Text style={{fontSize: 18, marginTop: 10}}>
				{currentTrack?.artist}
			</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: '60%',
					marginTop: 10,
				}}>
				<Text>{formatTime(progress.position)}</Text>
				<Text>{formatTime(progress.duration)}</Text>
			</View>
			<View>
				<ProgressBar
					progress={progress.position}
					buffered={progress.buffered}
					style={{
						width: 250,
						height: 10,
						borderRadius: 10,
						backgroundColor: '#ddd',
					}}
					trackStyle={{backgroundColor: '#333'}}
					thumbStyle={{backgroundColor: '#333'}}
				/>
			</View>
			<View style={{flexDirection: 'row', marginTop: 30}}>
				<TouchableOpacity onPress={skipToPrevius}>
					<Octicons name="triangle-left" size={50} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onPlayPausePress}
					style={{marginRight: 40, marginLeft: 40}}>
					{isPlaying ? (
						<Octicons name="columns" size={50} />
					) : (
						<Octicons name="play" size={50} />
					)}
				</TouchableOpacity>
				<TouchableOpacity onPress={skipToNext}>
					<Octicons name="triangle-right" size={50} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Reproductor;
