import { containerStyles } from "@/assets/styles/GlobalStyles";
import React from "react";
import { TouchableOpacity, Text, Linking } from "react-native";

const PayLahComponent: React.FC = () => {
    const url = "https://www.dbs.com.sg/personal/mobile/paylink/index.html?tranRef=xEhaZBzqPd"; // 5th jan 2025

    const handlePress = async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error("PayLahComponent.tsx: error opening url")
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={containerStyles.button}
        >
            <Text style={containerStyles.globalTextMessage}>Donate via PayLah</Text>
        </TouchableOpacity>
    )
};

export default PayLahComponent;
