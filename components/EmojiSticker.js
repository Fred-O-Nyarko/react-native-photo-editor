import { View, Text } from 'react-native';
import { TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';

const stickerSize = 50;
const AnimatedSticker = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({ sticker }) {

    const scaleSticker = useSharedValue(stickerSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
    });

    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
            if (scaleSticker.value !== stickerSize * 2) {
                scaleSticker.value = scaleSticker.value * 2;
            }
        },
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    })

    const stickerStyle = useAnimatedStyle(() => {
        return {
            fontSize: withSpring(scaleSticker.value),
        };
    });

    return (
        <PanGestureHandler onGestureEvent={onDrag}>
            <AnimatedView style={[containerStyle, { top: -350 }]}>
                <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
                    <AnimatedSticker style={[stickerStyle, { fontSize: stickerSize }]}>{sticker}</AnimatedSticker>
                </TapGestureHandler>
            </AnimatedView>
        </PanGestureHandler>
    );
}
