import React, { useState } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { Search } from 'lucide-react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';

interface Flight {
    destination: string;
    flight: number;
    airlineName: string;
    departureDate: string;
    departureTime: string;
    ETA_date: string;
    ETA_time: string;
}

interface MyFlightCardProps {
    flightSchedule: Flight[];
}

const MyFlightCard: React.FC<MyFlightCardProps> = ({ flightSchedule }) => {
    const [flightNumber, setFlightNumber] = useState<string>('');
    const [flightInfo, setFlightInfo] = useState<Flight | null>(null);

    const handleSearch = () => {
        Keyboard.dismiss();
        const foundFlight = flightSchedule.find(flight => flight.flight === parseInt(flightNumber, 10));
        setFlightInfo(foundFlight || null);
    };

    const FlightInfoItem: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => (
        <View className='w-1/3 py-1'>
            <Text className='text-xs font-bold text-white'>{label}</Text>
            <Text className='text-sm text-white'>{value || 'N/A'}</Text>
        </View>
    );

    return (
        <Card className='max-w-full mt-2 bg-[#007AFF] text-white rounded-xl w-full'>
            {!flightInfo ? (
                <CardHeader className='items-center'>
                    <CardTitle className='text-3xl font-bold text-white'>Good day, Maloi!</CardTitle>
                    <CardDescription className='mt-2 text-sm text-white text-center w-full' numberOfLines={1}>
                        Search your flight number to show your flight information.
                    </CardDescription>
                    <View className='mt-4 flex-row items-center bg-white rounded-lg px-3'>
                        <Search size={16} color='gray' />
                        <TextInput
                            className='ml-3 text-black text-sm flex-1'
                            placeholder='Search flight number'
                            placeholderTextColor='gray'
                            value={flightNumber}
                            onChangeText={setFlightNumber}
                            returnKeyType='done'
                            blurOnSubmit={false}
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                </CardHeader>
            ) : (
                <CardContent>
                    <View className='flex-row items-center justify-between mt-5'>
                        <CardTitle className='text-2xl font-bold text-white'>My Flight</CardTitle>
                        <View className='flex-row items-center bg-white rounded-lg px-2 pr-4'>
                            <Search size={12} color='gray' />
                            <TextInput
                                className='ml-2 text-black text-xs'
                                placeholder='Flight #'
                                placeholderTextColor='gray'
                                value={flightNumber}
                                onChangeText={setFlightNumber}
                                returnKeyType='done'
                                blurOnSubmit={false}
                                onSubmitEditing={handleSearch}
                            />
                        </View>
                    </View>

                    <View className='mt-2 flex-wrap flex-row justify-between'>
                        <FlightInfoItem label='Destination' value={flightInfo?.destination} />
                        <FlightInfoItem label='Flight' value={flightInfo?.flight} />
                        <FlightInfoItem label='Airline' value={flightInfo?.airlineName} />
                        <FlightInfoItem
                            label='Departure Date'
                            value={
                                flightInfo?.departureDate
                                    ? new Date(flightInfo.departureDate).toLocaleDateString('en-US', {
                                          month: 'long',
                                          day: 'numeric',
                                          year: 'numeric',
                                      })
                                    : 'N/A'
                            }
                        />
                        <FlightInfoItem label='Departure Time' value={flightInfo?.departureTime} />
                        <FlightInfoItem
                            label='ETA'
                            value={
                                flightInfo?.ETA_date
                                    ? `${new Date(flightInfo.ETA_date).toLocaleDateString('en-US', {
                                          month: 'long',
                                          day: 'numeric',
                                          year: 'numeric',
                                      })} | ${flightInfo?.ETA_time}`
                                    : 'N/A'
                            }
                        />
                    </View>

                    <View className='mt-2'>
                        <Text className='text-xs text-gray-200 self-end'>Last updated: 6:03 PM, May 1, 2025</Text>
                    </View>
                </CardContent>
            )}
        </Card>
    );
};

// Ensure displayName is set
MyFlightCard.displayName = 'MyFlightCard';

export default MyFlightCard;
