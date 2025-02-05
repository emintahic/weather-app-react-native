import { View, Text } from "react-native";
import React from "react";
import CloudIcon from "@/assets/icons/weatherIcons/CloudIcon";
import RainIcon from "@/assets/icons/weatherIcons/RainIcon";
import SnowIcon from "@/assets/icons/weatherIcons/SnowIcon";
import StormIcon from "@/assets/icons/weatherIcons/StormIcon";
import SunIcon from "@/assets/icons/weatherIcons/SunIcon";

const WeatherConditionHeader = ({
  weatherData,
}: {
  weatherData: IWeather | undefined;
}) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return null;
  }

  const weatherCondition = weatherData.weather[0].main;

  const weatherIcons = {
    Clear: <SunIcon width={22} height={22} />,
    Clouds: <CloudIcon width={22} height={22} />,
    Rain: <RainIcon width={22} height={22} />,
    Drizzle: <RainIcon width={22} height={22} />,
    Thunderstorm: <StormIcon width={22} height={22} />,
    Snow: <SnowIcon width={22} height={22} />,
  };

  return (
    <View className="flex flex-row items-center ">
      <View className="rounded-full  border-white/30 border">
        <View className=" p-1 flex items-center justify-center">
          {weatherIcons[weatherCondition as keyof WeatherIcons] || (
            <CloudIcon />
          )}
        </View>
      </View>
      <Text className="text-xl font-light text-white ml-2">
        {weatherCondition}
      </Text>
    </View>
  );
};

export default WeatherConditionHeader;
