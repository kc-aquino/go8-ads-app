import * as React from 'react';
import { Image, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '~/app/_layout';
import { useNavigation } from 'expo-router';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

type Props = StackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen() {
    const navigation = useNavigation();

    return (
        <View className='flex-1 mt-10 justify-between'>
            {/* Top Content with Background */}
            <View className='items-center relative w-full h-fit-content mb-20'>
                <Image
                    source={{
                        uri: 'https://www.newnaia.com.ph/storage/page-assets/9/1/U9zwHbqJdECaRRjbsi5Ena1PDsFuxT0AxyThb2SQGHUOR4PUo8sijUF2ecol/GKPdd3sGbcWWp6zbWXDbyjfiNNcHopMiDF0c9D2l.webp',
                    }}
                    className='absolute top-0 left-0'
                    style={{
                        zIndex: -1,
                        opacity: 0.5,
                        resizeMode: 'cover',
                        width: '150%',
                        height: '150%',
                        transform: [{ translateX: '-25%' }, { translateY: '-30%' }],
                        marginTop: 100,
                    }}
                />
                <Image source={require('../assets/images/logo-adSpace.png')} className='h-40 w-60 self-center mt-40' resizeMode='contain' />
            </View>

            {/* Text Content */}
            <View className='items-center px-5'>
                <Text className='text-3xl font-bold mb-2 mt-15 text-center'>Welcome to Go8 AdSpace</Text>
                <Text className='text-center text-gray-400 font-semibold'>The best place to advertise your products and services</Text>
            </View>

            <View className='px-5 mb-16'>
                <Button variant='default' onPress={() => navigation.navigate('Notification')} className='w-full py-3'>
                    <Text className='text-white font-semibold'>Get Started</Text>
                </Button>
            </View>
        </View>
    );
}
