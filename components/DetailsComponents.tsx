import { View, Text } from "react-native";
import React from "react";
import DetailsCard from "./DetailsCard";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import ArrowUpIcon from "@/assets/icons/weatherIcons/ArrowUpIcon";
import CloudIcon from "@/assets/icons/weatherIcons/CloudIcon";
import PressureIcon from "@/assets/icons/PressureIcon";

interface IWeather {
  clouds: { all: number };
  main: {
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
}

const DetailsComponents = ({
  weatherData,
}: {
  weatherData: IWeather | undefined;
}) => {
  return (
    <View>
      <Text className="text-xl font-semibold mb-2 text-white">Details:</Text>
      <View className="h-[0.5px] bg-white w-auto rounded-full"></View>
      <View className="gap-7 py-7">
        <View className="flex-row justify-between items-center">
          <DetailsCard
            icon={<CloudIcon width={24} height={24} testID="cloud-icon" />}
            title="Cloud Cover"
            unit="%"
            value={weatherData?.clouds?.all ?? 0}
          />
          <DetailsCard
            icon={
              <PressureIcon width={20} height={20} testID="pressure-icon" />
            }
            title="Pressure"
            unit="hpa"
            value={weatherData?.main?.pressure ?? 0}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <DetailsCard
            icon={
              <ArrowDownIcon
                white
                width={24}
                height={24}
                testID="arrow-down-icon"
              />
            }
            title="Min. Temp."
            unit="°C"
            value={Math.round(weatherData?.main?.temp_min ?? 0)}
          />
          <DetailsCard
            icon={
              <ArrowUpIcon
                white
                width={24}
                height={24}
                testID="arrow-up-icon"
              />
            }
            title="Max. Temp."
            unit="°C"
            value={Math.round(weatherData?.main?.temp_max ?? 0)}
          />
        </View>
      </View>
      <View className="h-[0.5px] bg-white w-auto rounded-full"></View>
    </View>
  );
};

export default DetailsComponents;
