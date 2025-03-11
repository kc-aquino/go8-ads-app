import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import MyFlightCard from '~/components/MyFlightCard';
import TableArrival_Departure from '~/components/TableArrival_Departure';
import { flightSchedule } from '~/sampleData';

const { width } = Dimensions.get('window');

export default function Screen() {
    return (
        <View className='flex-1 w-full bg-secondary/30 '>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 65 }} showsVerticalScrollIndicator={false}>
                <View className='w-full max-w-screen'>
                    <MyFlightCard flightSchedule={flightSchedule} />
                    <TableArrival_Departure flightSchedule={flightSchedule} />
                </View>
            </ScrollView>

            {/* Sticky Banner */}
            <View className='absolute bottom-0 w-full'>
                <Image
                    source={require('~/assets/images/ads/pluswidth_banner_ad_1.png')}
                    style={{ width: width, height: width * 0.2 }}
                    resizeMode='cover'
                />
            </View>
        </View>
    );
}
