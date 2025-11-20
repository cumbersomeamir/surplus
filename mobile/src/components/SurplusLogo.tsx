import React from 'react';
import { Image, ImageStyle } from 'react-native';

type SurplusLogoProps = {
  size?: number;
  style?: ImageStyle;
};

const logoSource = require('../assets/images/surplus-logo.png');

export const SurplusLogo: React.FC<SurplusLogoProps> = ({ size = 120, style }) => (
  <Image
    source={logoSource}
    style={[
      {
        width: size,
        height: size,
        resizeMode: 'contain',
      },
      style,
    ]}
  />
);

