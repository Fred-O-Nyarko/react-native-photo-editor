import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable, View, Text } from 'react-native';

export default function EmojiList({ onSelect, onCloseModal }) {
    const [emoji] = useState([
        '❤️',
        '🚀',
        '🤩',
        '🎉',
        '🎊',
        '🥳',
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
                return (
                    <Pressable
                        onPress={() => {
                            onSelect(item);
                            onCloseModal();
                        }}>
                        <View key={index} style={styles.emoji}>
                            <Text style={{ fontSize: 50 }}>{item}</Text>
                        </View>
                    </Pressable>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emoji: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});
