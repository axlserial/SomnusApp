import React, {useEffect, useState} from 'react';
import TrackPlayer, {State} from 'react-native-track-player';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import { ImageBackground } from 'react-native';

type Props = {
	route: RouteProp<any>;
	navigation: NavigationProp<any>;
};

const Reproductor: React.FC<Props> = ({route}) => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

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
			const {title, desc, url, image} = route.params || {
				title: '',
				desc: '',
				url: '',
				image: '',
			};
			await TrackPlayer.add({
				id: 'trackId',
				url: url,
				title: title,
				artist: desc,
				artwork: image,
			});
		};
		if (isTrackPlayerInit) {
			initializeTrack();
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
	};

	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<ImageBackground
					source={route.params?.image}
					style={{
						flex: 0.6,
						width: '90%',
						height: '80%',
						marginLeft: 35
					}}>
				</ImageBackground>
			<Text style={{fontSize: 28}}>{route.params?.title}</Text>
			<Text style={{fontSize: 18, marginTop: 10}}>
				{route.params?.desc}
			</Text>
			<TouchableOpacity
				onPress={onPlayPausePress}
				style={{marginTop: 30}}>
				<Text style={{fontSize: 24}}>
					{isPlaying ? <Octicons name='columns' size={50}/> : <Octicons name='play' size={50}/>}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Reproductor;
