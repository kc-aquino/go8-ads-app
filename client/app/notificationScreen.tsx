import * as React from 'react';
import { View } from 'react-native';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

export default function NotificationScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Notification Screen</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            This is the notification screen.
          </CardDescription>
          <Progress value={0.5} />
        </CardContent>
        <CardFooter>
          <Tooltip>
            <TooltipTrigger>
              <Text>What's this?</Text>
            </TooltipTrigger>
            <TooltipContent>
              This is a tooltip.
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </View>
  );
}
