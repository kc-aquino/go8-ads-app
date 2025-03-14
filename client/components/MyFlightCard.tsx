import React, { useState } from 'react';
import { View, TextInput, Modal, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Search, XCircle } from 'lucide-react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { Input } from '~/components/ui/input';

interface Flight {
    destination: string;
    flight: number;
    airlineName: string;
    departureDate: string;
    departureTime: string;
    ETA_date: string;
    ETA_time: string;
}

interface UserData {
    name: string;
    email: string;
    role: string;
}

interface AdsData {
    mediaUrl: string;
    slot: string;
    title: string;
}

interface MyFlightCardProps {
    flightSchedule: Flight[];
    userData: UserData;
    adsData: AdsData[];
}

const MyFlightCard: React.FC<MyFlightCardProps> = ({ flightSchedule, userData, adsData }) => {
    const { isDarkColorScheme } = useColorScheme();
    const [flightNumber, setFlightNumber] = useState<string>('');
    const [flightInfo, setFlightInfo] = useState<Flight | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleSearchFlight = () => {
        if (flightNumber.trim() !== '') {
            const foundFlight = flightSchedule.find(flight => flight.flight === parseInt(flightNumber.trim(), 10));
            setFlightInfo(foundFlight || null);
            setIsModalVisible(true);
        } else {
            setFlightInfo(null);
        }
    };

    const FlightInfoItem: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => (
        <View className='w-1/3 py-1'>
            <Text className={`text-xs font-bold text-white`}>{label}</Text>
            <Text className={`text-sm text-white`}>{value || 'N/A'}</Text>
        </View>
    );

    const { width, height } = Dimensions.get('window');
    const isPortrait = height > width;

    // Find the ad with the slot equal to 'Bottom'
    const SideAd = adsData?.find((ad: any) => ad.slot === 'Side');

    // Construct the full URL for the GIF
    const gifUrl = SideAd ? 'http://152.42.176.184' + SideAd.mediaUrl : null;
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <Card className={`max-w-full mt-2 rounded-xl w-full ${isDarkColorScheme ? 'bg-gray-800' : 'bg-[#007AFF]'}`}>
            {!flightInfo ? (
                <CardHeader className='items-center'>
                    <CardTitle className={`text-3xl font-bold ${isDarkColorScheme ? 'text-white' : 'text-gray-100'} text-center`}>
                        Good day, {userData?.name || 'User'}!
                    </CardTitle>
                    <CardDescription className={`mt-2 text-sm text-center w-full ${isDarkColorScheme ? 'text-gray-400' : 'text-white'}`}>
                        Search your flight number to show your flight information.
                    </CardDescription>
                    <View className={`mt-4 flex-row items-center rounded-lg px-3 ${isDarkColorScheme ? 'bg-slate-700' : 'bg-white'}`}>
                        <Search size={16} color={isDarkColorScheme ? 'lightgray' : 'gray'} />
                        <Input
                            className={`ml-3 text-sm flex-1 ${isDarkColorScheme ? 'text-white' : 'text-black'}`}
                            placeholder='Search flight number'
                            placeholderTextColor={isDarkColorScheme ? 'lightgray' : 'gray'}
                            value={flightNumber}
                            onChangeText={setFlightNumber}
                            returnKeyType='done'
                            blurOnSubmit={false}
                            onSubmitEditing={handleSearchFlight}
                            accessible
                            accessibilityLabel='Enter your flight number'
                        />
                    </View>
                </CardHeader>
            ) : (
                <CardContent>
                    <View className='flex-row items-center justify-between mt-5'>
                        <CardTitle className={`text-2xl font-bold ${isDarkColorScheme ? 'text-white' : 'text-gray-100'}`}>My Flight</CardTitle>
                        <View className={`flex-row items-center rounded-lg px-2 pr-4 ${isDarkColorScheme ? 'bg-gray-800' : 'bg-white'}`}>
                            <Search size={12} color={isDarkColorScheme ? 'lightgray' : 'gray'} />
                            <Input
                                className={`ml-2 text-xs ${isDarkColorScheme ? 'text-white' : 'text-black'}`}
                                placeholder='Flight #'
                                placeholderTextColor={isDarkColorScheme ? 'lightgray' : 'gray'}
                                value={flightNumber}
                                onChangeText={setFlightNumber}
                                returnKeyType='done'
                                blurOnSubmit={false}
                                onSubmitEditing={handleSearchFlight}
                                accessible
                                accessibilityLabel='Enter flight number'
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
                        <Text className={`text-xs self-end ${isDarkColorScheme ? 'text-gray-500' : 'text-gray-200'}`}>
                            Last updated: 6:03 PM, May 1, 2025
                        </Text>
                    </View>
                </CardContent>
            )}

            {/* Modal for Ad */}
            <Modal visible={isModalVisible} transparent={true} animationType='slide' onRequestClose={() => setIsModalVisible(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View
                        style={{
                            width: isPortrait ? width : height,
                            height: isPortrait ? height : width,
                            position: 'relative',
                        }}
                    >
                        {/* Close Button */}

                        {/* Full-Size Image */}
                        <View>
                            {isLoading && <ActivityIndicator size='small' color='#0000ff' />}
                            <Image
                                source={{ uri: gifUrl }}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                onLoad={() => setIsLoading(false)}
                                onError={e => {
                                    console.log('Failed to load image:', e);
                                    setIsLoading(false);
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                                style={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }}
                            >
                                <XCircle size={24} color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Card>
    );
};

MyFlightCard.displayName = 'MyFlightCard';

export default MyFlightCard;
