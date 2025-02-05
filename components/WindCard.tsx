import { View, Text } from "react-native";
import React from "react";
import WindIcon from "@/assets/icons/weatherIcons/WindIcon";

const WindCard = ({ weatherData }: { weatherData: IWeather | undefined }) => {
  return (
    <View className="justify-end items-end self-end">
      <View className="flex-row gap-3 bg-white/20 rounded-3xl items-center py-1 px-3 self-start">
        <WindIcon width={20} height={20} />
        <Text className="font-light text-white text-lg">Wind</Text>
      </View>
      <Text className="font-light text-white text-lg mt-2">
        {weatherData && weatherData.wind.speed} km/h
      </Text>
    </View>
  );
};

export default WindCard;
