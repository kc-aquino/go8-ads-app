import * as React from 'react';
import { Image, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '~/app/_layout';
import { useNavigation } from 'expo-router';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

type Props = StackScreenProps<RootStackParamList, 'notificationScreen'>;

export default function NotificationScreen() {
    const navigation = useNavigation();

    return (
        <View className='flex-1 mt-10 justify-between'>
            <Image source={require('../assets/images/logo-adSpace.png')} className='h-30 w-150 self-center mt-40 mb-10' resizeMode='contain' />

            <View className='items-center px-5 '>
                <Text className='text-3xl font-bold mb-2 mt-15 text-center'>Turn on notifications?</Text>
                <Text className='text-center text-gray-400 font-semibold'>Don't miss important announcements and alerts</Text>
            </View>

            <View className='mt-10 px-5 mb-5'>
                <Button variant='default' onPress={() => navigation.navigate('index')} className='w-full py-3'>
                    <Text className='text-white font-semibold'>Enable Notification</Text>
                </Button>

                <Button variant='link' onPress={() => navigation.navigate('index')} className='mt-5 self-center'>
                    <Text className='text-blue-500 font-semibold'>Skip</Text>
                </Button>
            </View>
        </View>
    );
}
