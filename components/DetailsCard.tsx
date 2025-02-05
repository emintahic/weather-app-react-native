import { View, Text } from "react-native";
import React from "react";

interface TProps {
  icon: React.JSX.Element;
  title: string;
  value: string | number;
  unit: string;
}

const DetailsCard = ({ icon, title, value, unit }: TProps) => {
  return (
    <View className="justify-end items-center self-end">
      <View className="flex-row gap-1 bg-white/20 rounded-3xl items-center py-1 px-3 self-start">
        {icon}
        <Text className="font-light text-white text-2xl">{title}</Text>
      </View>
      <View className="flex-row gap-1">
        <Text className="font-light text-white text-4xl mt-2">{value}</Text>
        <Text className="font-light text-white/50 text-4xl mt-2">{unit}</Text>
      </View>
    </View>
  );
};

export default DetailsCard;
