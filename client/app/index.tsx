import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import MyFlightCard from '~/components/MyFlightCard';
import TableArrival_Departure from '~/components/TableArrival_Departure';
import { flightSchedule } from '~/sampleData';
import { useColorScheme } from '~/lib/useColorScheme';
import { AnnouncementComponent } from '~/components/AnnouncementComponent';

export default function Screen() {
    const colorScheme = useColorScheme().colorScheme;
    const { width } = Dimensions.get('window');

    return (
        
        <View className='flex-1 w-full bg-secondary/30 '>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View className='w-full max-w-screen'>
                    <AnnouncementComponent />
                    <MyFlightCard flightSchedule={flightSchedule} />
                    <TableArrival_Departure flightSchedule={flightSchedule} />
                </View>
            </ScrollView>

            {/* Sticky Banner */}
            <View className='absolute bottom-0 w-full'>
                <Image
                    source={require('~/assets/images/ads/pluswidth_banner_ad_1.png')}
                    style={{ width: width, height: width * 0.3, resizeMode: 'stretch' }}
                />
            </View>
        </View>
    );
}
