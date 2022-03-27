import { useState } from 'react';

const pageWidth = '420px'; //iphone 11 is 414px, we use a 410

export function BackgroundColors() {
  const [backgroundColorBody, setBackgroundColorBody] = useState('#3f55b6');
  const [backgroundColorHeader, setBackgroundColorHeader] = useState('#aaaaaa');
  const [backgroundColorWrapper, setBackgroundColorWrapper] =
    useState('#3f55b6');
  const [backgroundColorFooter, setBackgroundColorFooter] = useState('#3f55b6');
}
