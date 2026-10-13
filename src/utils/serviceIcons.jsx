import React from 'react';
import {
  IconCode,
  IconMobile,
  IconAI,
  IconCloud,
  IconDesign,
  IconSoftware,
} from '../components/UI/Icons';

export function getServiceIcon(iconName, size = 20) {
  switch (iconName) {
    case 'code':
    case 'web':
      return <IconCode size={size} />;
    case 'mobile':
      return <IconMobile size={size} />;
    case 'ai':
    case 'chat':
    case 'resume':
    case 'document':
    case 'voice':
    case 'vision':
      return <IconAI size={size} />;
    case 'cloud':
      return <IconCloud size={size} />;
    case 'design':
      return <IconDesign size={size} />;
    case 'software':
    case 'workflow':
    default:
      return <IconSoftware size={size} />;
  }
}
