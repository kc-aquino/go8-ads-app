import * as React from 'react';
import { Image, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '~/app/_layout';
import { useNavigation } from 'expo-router';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';

type Props = StackScreenProps<RootStackParamList, 'notificationScreen'>;

export default function NotificationScreen() {
    const navigation = useNavigation();

    return (
        <View className='flex-1 mt-6 justify-between'>
             <Image source = {useColorScheme().colorScheme === 'dark'
                 ? require('../assets/images/logo-adSpaceLight.png') : require('../assets/images/logo-adSpaceDark.png')
              }
             className='self-center w-full h-40 mt-20 mb-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20'
        />
        <View className='items-center px-5 -mt-28'>
             <Image source = {useColorScheme().colorScheme === 'dark'
                  ? require('../assets/images/NotificationLight.png') : require('../assets/images/Notification.png')
              } 
            className='self-center sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 '/>
        </View>

            <View className='items-center px-5 -mt-32' >
            <Text className='text-3xl font-bold mb-2 text-center'>Turn on notifications?</Text>
            <Text className='text-center text-gray-400 font-semibold'>Don't miss important announcements and alerts</Text>
            </View>

            <View className='mt-10 px-5 mb-5'>
            <Button variant='default' onPress={() => navigation.navigate('Main')} className='w-full py-3 sm:py-2 md:py-3 lg:py-4 xl:py-5'
                >
                <Text className='text-white font-semibold sm:text-sm md:text-base lg:text-lg xl:text-xl'>Enable Notification</Text>
            </Button>
           

            <Button variant='link' onPress={() => navigation.navigate('Main')} 
                 className='self-center mb-14 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16'>
                 <Text className='text-blue-500 font-semibold sm:text-sm md:text-base lg:text-lg xl:text-xl'>Skip</Text>
            </Button>
            </View>
        </View>
    );
}
