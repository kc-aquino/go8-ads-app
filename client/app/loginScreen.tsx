import * as React from 'react';
import { Image, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Separator } from '~/components/ui/separator';
import { Eye, EyeOff, Apple, Facebook } from 'lucide-react-native';
import { login } from '~/lib/controllers/login_controller';
import { getUserRole, getUserData } from '~/lib/controllers/fetchers';
import { useColorScheme } from '~/lib/useColorScheme';

const ErrorMessage = ({ message }: { message: string }) => (
    <Text className={`text-start mb-2 ${message.includes('required') ? 'text-red-500' : 'text-green-500'}`}>
        {message}
    </Text>
);
const PasswordInput = ({ value, onChange, showPassword, togglePassword, colorScheme }: { value: string, onChange: (text: string) => void, showPassword: boolean, togglePassword: () => void, colorScheme: string }) => (
    <View className="relative flex flex-row items-center gap-2">
        <Input
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry={!showPassword}
            className="flex-1 pr-10 h-10"
        />
        <Button
            variant="ghost"
            size="icon"
            style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: [{ translateY: '-50%' }],
            }}
            onPress={togglePassword}
        >
            {showPassword ? (
            <Eye size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
            ) : (
            <EyeOff size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
            )}
        </Button>
    </View>
);

export default function Login() {
    const navigation = useNavigation();
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [emailMessage, setEmailMessage] = React.useState<string | null>(null);
    const [passwordMessage, setPasswordMessage] = React.useState<string | null>(null);
    const [loginError, setLoginError] = React.useState<string | null>(null);

    const resetMessages = () => {
        setEmailMessage(null);
        setPasswordMessage(null);
        setLoginError(null);
    };

    const togglePasswordVisibility = () => setShowPassword((prevState) => !prevState);

    const handleLogin = async () => {
        resetMessages();

        let isValid = true;
        if (!emailAddress) {
            setEmailMessage('Email is required');
            isValid = false;
        }
        if (!password) {
            setPasswordMessage('Password is required');
            isValid = false;
        }

        if (!isValid) return;

        try {
            await login(emailAddress, password);
            setEmailAddress('');
            setPassword('');
            const role = await getUserRole();
            if (role === 'admin') {
                setEmailMessage('This app is for users only. Please use the web app for admin access.');
            } else {
                navigation.navigate('Landing');
            }
        } catch (error) {
            setLoginError('Your username or password is incorrect');
            console.error('Login error:', error);
        }
    };

    const colorScheme = useColorScheme().colorScheme;
    const logoImage = colorScheme === 'dark' ? require('../assets/images/logo-adSpaceLight.png') : require('../assets/images/logo-adSpaceDark.png');

    return (
        <View className="p-5">
            <StatusBar hidden style="auto" />
            <Image
                source={logoImage}
                className="w-full h-40 self-center mt-20 mb-10 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16"
            />
            <View className="flex flex-col gap-5 mt-5">
                {emailMessage && <ErrorMessage message={emailMessage} />}
                <Input
                    placeholder="Email Address"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {passwordMessage && <ErrorMessage message={passwordMessage} />}

                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    showPassword={showPassword}
                    togglePassword={togglePasswordVisibility}
                    colorScheme={colorScheme}
                />
                {loginError && <Text className="text-start mt-4 text-red-500">{loginError}</Text>}

                <Button variant="default" size="default" onPress={handleLogin}>
                    <Text>Login</Text>
                </Button>

                <Separator className="mt-10" />
                <Text className="text-sm text-center text-gray-400 font-semibold">Or continue with</Text>
                <View className="flex flex-row gap-5 justify-center">
                    <Button variant="default" size="icon" className="rounded-full bg-red-600">
                        <Text>G</Text>
                    </Button>
                    <Button variant="default" size="icon" className="rounded-full bg-black">
                        <Apple size={15} color="white" />
                    </Button>
                    <Button variant="default" size="icon" className="rounded-full">
                        <Facebook size={16} color="white" />
                    </Button>
                </View>
            </View>
        </View>
    );
}
