import { View, Text } from "react-native";
import React from "react";
import SunIcon from "@/assets/icons/weatherIcons/SunIcon";
import CloudIcon from "@/assets/icons/weatherIcons/CloudIcon";
import RainIcon from "@/assets/icons/weatherIcons/RainIcon";
import StormIcon from "@/assets/icons/weatherIcons/StormIcon";
import SnowIcon from "@/assets/icons/weatherIcons/SnowIcon";

const RealFeelComponent = ({
  weatherData,
}: {
  weatherData: IWeather | undefined;
}) => {
  if (!weatherData) {
    return null;
  }
  const weatherIcons = {
    Clear: <SunIcon width={150} height={150} testID="sun-icon" />,
    Clouds: <CloudIcon width={150} height={150} testID="cloud-icon" />,
    Rain: <RainIcon width={150} height={150} testID="rain-icon" />,
    Drizzle: <RainIcon width={150} height={150} testID="rain-icon" />,
    Thunderstorm: <StormIcon width={150} height={150} testID="storm-icon" />,
    Snow: <SnowIcon width={150} height={150} testID="snow-icon" />,
  };
  return (
    <View className="flex-row  items-center pt-8 pb-5 gap-10">
      <View className="shadow-lg shadow-white blur-sm pl-3">
        {weatherData &&
          weatherIcons[weatherData.weather[0].main as keyof WeatherIcons]}
      </View>
      <View className="flex-col items-end justify-center max-h-[110px]">
        <Text
          className="font-extrabold text-[90px] text-white"
          testID="temperature"
        >
          {weatherData && Math.round(weatherData.main.feels_like)}°
        </Text>
        <Text className="font-normal text-xl text-white/60">/ Real Feel</Text>
      </View>
    </View>
  );
};

export default RealFeelComponent;
