import * as React from 'react';
import { Image, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { RootStackParamList } from '~/app/_layout';
import { useNavigation } from 'expo-router';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Separator } from '~/components/ui/separator';
import { Eye, EyeOff, Apple, Facebook } from 'lucide-react-native';
import { login } from '~/lib/controllers/login_controller';

type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation();
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async () => {
        try {
          await login(emailAddress, password);
          navigation.navigate('landingScreen');
        } catch (error) {
          Alert.alert('Login Error', error.message.toString());
          console.error('Login error:', error);
        }
      };

    return (
        <View className='p-5'>
            <Image source={require('../assets/images/logo-adSpace.png')} className='w-full h-40 self-center mt-20 mb-10 ' />
            <Text className='text-4xl font-bold mb-2'>Welcome!</Text>
            <View className='flex flex-col gap-5 mt-5 '>
                <Input
                    placeholder='Email Address'
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                />
                <View className='relative flex flex-row items-center gap-2'>
                    <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        aria-labelledby='inputLabel'
                        aria-errormessage='inputError'
                        className='flex-1 pr-10 h-10'
                        secureTextEntry={!showPassword}
                    />
                    <Button
                        variant='ghost'
                        size='icon'
                        style={{ position: 'absolute', right: 8, top: '50%', transform: [{ translateY: '-50%' }] }}
                        className='z-15'
                        onPress={togglePasswordVisibility}
                    >
                        {showPassword ? <Eye size={20} strokeWidth={2} color='black' /> : <EyeOff size={20} strokeWidth={2} color='black' />}
                    </Button>
                </View>
                <Button
                    variant='link'
                    size='default'
                    onPress={() => navigation.navigate('forgotPasswordScreen')}
                    className='m-[-15] mb-2 items-start'
                >
                    <Text className='text-sm text-left text-blue-400 font-semibold'>Forgot Password?</Text>
                </Button>

                <Button variant='default' size='default' onPress={handleLogin}>
                    <Text>Login</Text>
                </Button>
                <Separator className='mt-10' />

                <Text className='text-sm text-center color-gray-400 font-semibold '>Or continue with</Text>
                <View className='flex flex-row gap-5 justify-center '>
                    <Button variant='default' size='icon' className='rounded-full bg-red-600' onPress={() => navigation.navigate('landingScreen')}>
                        <Text>G</Text>
                    </Button>
                    <Button variant='default' size='icon' className='rounded-full bg-black ' onPress={() => navigation.navigate('landingScreen')}>
                        <Apple size={15} color='white' />
                    </Button>
                    <Button variant='default' size='icon' className='rounded-full' onPress={() => navigation.navigate('landingScreen')}>
                        <Facebook size={16} color='white' />
                    </Button>
                </View>
            </View>
        </View>
    );
}
