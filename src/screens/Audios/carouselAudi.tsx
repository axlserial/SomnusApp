import {View, Text, Carousel, Spacings} from 'react-native-ui-lib';

// Información de cada fase del sueño
const caroAu = [
	{
		title: 'Reduce estrés',
		description:
        'La música relajante y los sonidos de la naturaleza pueden reducir los niveles de estrés, lo que puede ayudar a las personas a conciliar el sueño más fácilmente.',
	},
	{
		title: 'Mejora el sueño con música',
		description:
			' Escuchar música relajante y sonidos de la naturaleza puede mejorar la calidad del sueño y reducir los despertares nocturnos.',
	},
	{
		title: 'Reducción de ansiedad',
		description:
			'Escuchar música relajante y sonidos de la naturaleza antes de dormir puede ayudar a reducir los síntomas de ansiedad, lo que puede facilitar el sueño.',
	},
	{
		title: 'Establece una rutina de sueño'+
		' con audios relajantes',
		description:
			' Escuchar audios relajantes antes de dormir puede ayudar a establecer una rutina de sueño, lo que puede mejorar la calidad y la cantidad del sueño a largo plazo.',
	},
	{
		title: 'Calma tu mente y cuerpo con cuentos',
		description:
			'Los cuentos y la música relajante pueden ayudar a calmar la mente y el cuerpo, lo que puede fomentar la relajación y ayudar a las personas a dormirse más fácilmente.',
	},
];

const CarouselAudi = () => {
	return (
		<Carousel autoplay loop showCounter>
			{caroAu.map((item, i) => (
				<View
					key={i}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#004B6F',
						borderRadius: 10,
						borderWidth: 2,
						height: '90%',
						width: '100%',
					}}>
					<Text
						text70
						style={{
							marginTop: 15,
							fontWeight: 'bold',
						}}>
						{item.title}
					</Text>
					<Text text70 margin-15 style={{marginTop: 10}}>
						{item.description}
					</Text>
				</View>
			))}
		</Carousel>
	);
};
export default CarouselAudi;
